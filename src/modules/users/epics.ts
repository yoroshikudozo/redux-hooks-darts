import { combineEpics } from 'redux-observable';

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
import { usersNormalize, userNormalize } from 'modules/users/schemas';
import { NormalizedEntities } from 'modules/common/schemas';

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
  NormalizedEntities<User, { users: string[] }>
>({
  asyncActions: actions.fetchUserAsync,
  request: fetchUserRequest,
  normalizer: userNormalize,
  cancelAction: actions.fetchUserCancel,
});

export const fetchPlayersEpic = epicFactory<
  void,
  FetchUsersResponse,
  NormalizedEntities<User, { users: string[] }>
>({
  asyncActions: actions.fetchPlayersAsync,
  request: fetchPlayersRequest,
  normalizer: usersNormalize,
  cancelAction: actions.fetchPlayersCancel,
});

export const createUserEpic = epicFactory<
  CreateUserData,
  User,
  NormalizedEntities<User, { users: string[] }>
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
