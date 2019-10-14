import { ThunkAction } from 'redux-thunk';
import { NormalizedSchema } from 'normalizr';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import cuid from 'cuid';

import {
  User,
  FetchUserParams,
  CreateUserData,
  CreateUserFormData,
} from 'modules/users/types';
import { AppState } from 'modules/reducers';

const usersActionCreator = actionCreatorFactory('USERS');

export const fetchUserAsync = usersActionCreator.async<
  FetchUserParams,
  NormalizedSchema<{ [key: string]: User }, string>,
  Error
>('FETCH');

export const fetchPlayersAsync = usersActionCreator.async<
  undefined,
  NormalizedSchema<{ [key: string]: User }, string[]>,
  Error
>('PLAYERS/FETCH');

export const fetchUserCancel = usersActionCreator<FetchUserParams>(
  'FETCH_CANCEL',
);

export const fetchUsersCancel = usersActionCreator<FetchUserParams>(
  'FETCH_LIST_CANCEL',
);

export const fetchPlayersCancel = usersActionCreator<undefined>(
  'PLAYERS/FETCH_CANCEL',
);

export const createUserAsync = usersActionCreator.async<
  CreateUserData,
  NormalizedSchema<{ [key: string]: User }, string>,
  Error
>('CREATE');

export const createUserAction = usersActionCreator<number>('CREATE');
export const createUserCancel = usersActionCreator<CreateUserData>(
  'CREATE_CANCEL',
);

export const initCreateUserRequestData = (
  { name, nickname }: CreateUserFormData,
  id: string,
  state: AppState,
): CreateUserData => ({
  id,
  name,
  nickname: nickname || '',
  flight: 0,
});

export const fetchUser = (
  id: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(fetchUserAsync.started({ id }));
};

export const fetchPlayers = (): ThunkAction<
  void,
  AppState,
  undefined,
  AnyAction
> => dispatch => {
  dispatch(fetchPlayersAsync.started());
};

export const createUser = (
  data: CreateUserFormData,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const id = cuid();
  const createUserData = initCreateUserRequestData(data, id, getState());
  dispatch(createUserAsync.started(createUserData));
};

const actions = {
  fetchUserAsync,
  fetchUserCancel,
  createUser,
  createUserAsync,
  createUserCancel,
};

export default actions;
