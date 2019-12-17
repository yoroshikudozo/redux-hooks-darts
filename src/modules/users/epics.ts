import * as R from 'ramda';

import API from 'consts/endpoints';
import http from 'modules/common/utils/request-first';
import {
  FetchUserParams,
  FetchUsersResponse,
  User,
  CreateUserData,
} from 'modules/users/types';
import { epicFactory } from 'modules/common/utils/rx';
import actions from 'modules/users/actions';
import {
  NormalizedUsers,
  usersNormalize,
  userNormalize,
} from 'modules/users/schemas';
import { combineEpics, Epic } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { AppState } from 'modules/reducers';
import { ofAction } from 'typescript-fsa-redux-observable';
import { mergeMap, takeUntil, filter } from 'rxjs/operators';
import { NormalizedEntities } from 'modules/common/schemas';
import { dartsNormalize } from 'modules/darts/schemas';
import { Dart, FetchDartParams } from 'modules/darts/types';

const fetchUsersRequest = ({ id }: FetchUserParams) =>
  http<FetchUsersResponse>(`${API.USERS}/${id}`);

const fetchUserRequest = ({ id }: FetchUserParams) =>
  http<User>(`${API.USERS}/${id}`);

const fetchPlayersRequest = async () => {
  const a = await http<FetchUsersResponse>(`${API.USERS}`);
  console.log(a);
  return a;
};

const createUserRequest = (data: CreateUserData) =>
  http<User>(API.USERS, { method: 'post', body: JSON.stringify(data) });

export const fetchUserEpic = epicFactory<
  FetchUserParams,
  User,
  NormalizedUsers
>({
  asyncActions: actions.fetchUserAsync,
  request: fetchUserRequest,
  normalizer: userNormalize,
  cancelAction: actions.fetchUserCancel,
});

export const fetchPlayersEpic = epicFactory<
  void,
  FetchUsersResponse,
  NormalizedUsers
>({
  asyncActions: actions.fetchPlayersAsync,
  request: fetchPlayersRequest,
  normalizer: usersNormalize,
  cancelAction: actions.fetchPlayersCancel,
});

export const createUserEpic = epicFactory<
  CreateUserData,
  User,
  NormalizedUsers
>({
  asyncActions: actions.createUserAsync,
  request: createUserRequest,
  normalizer: userNormalize,
  cancelAction: actions.createUserCancel,
});

// export const createUserDataEpic = actionTransformEpicFactory(
//   actions.createUser,
//   actions.createUserAsync.started,
//   initCreateUserRequestData,
// );

const usersEpic = combineEpics(
  fetchUserEpic,
  fetchPlayersEpic,
  createUserEpic,
  // createUserDataEpic,
);

export default usersEpic;

export const fetchDartRequest = ({ id }: FetchDartParams, state: AppState) =>
  http<Dart>(`${API.DARTS}/${id}`);

const createEndpoint = (domain: string) => <Entity>(
  normalizer: (data: any) => NormalizedEntities<Entity>,
) => (type: string) => <Params extends any>(
  request: (params: Params, state: AppState) => Promise<Entity>,
) => {
  const actionCreator = actionCreatorFactory(R.toUpper(domain));

  const asyncActions = actionCreator.async<
    Params,
    NormalizedEntities<Entity>,
    Error
  >(R.toUpper(type));

  const cancelAction = actionCreator<Params>(`${R.toUpper(type)}_CANCEL`);

  const epic: Epic = (action$, state$) =>
    action$.pipe(
      ofAction(asyncActions.started),
      mergeMap(action =>
        request(action.payload, state$.value)
          .then(data =>
            R.isEmpty(data) ? { entities: {}, result: [] } : normalizer(data),
          )
          .then(result =>
            asyncActions.done({
              result: result,
              params: action.payload,
            }),
          )
          .catch(error =>
            asyncActions.failed({
              params: action.payload,
              error,
            }),
          ),
      ),
      takeUntil(action$.pipe(ofAction(cancelAction))),
    );

  return Object.assign(asyncActions.started, {
    actions: {
      started: asyncActions.started,
      done: asyncActions.done,
      failed: asyncActions.failed,
      cancel: cancelAction,
    },
    epic,
  });
};

const dartsEndpoint = createEndpoint('darts');
const dartsDomain = dartsEndpoint(dartsNormalize);

const fetchDartsType = dartsDomain('fetch');
const createDartsType = dartsDomain('create');

const fetchDarts = fetchDartsType(fetchDartRequest);
