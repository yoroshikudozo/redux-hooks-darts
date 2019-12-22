import { combineEpics } from 'redux-observable';

import { epicFactory } from 'modules/common/utils/rx';
import { NormalizedEntities } from 'modules/common/schemas';

import {
  FetchUserParams,
  User,
  CreateUserData,
  UserList,
} from 'modules/users/types';
import * as actions from 'modules/users/actions';
import { usersNormalize } from 'modules/users/schemas';
import {
  fetchUserRequest,
  fetchUsersRequest,
  fetchPlayersRequest,
  createUserRequest,
} from 'modules/users/api';

export const fetchUserEpic = epicFactory<
  FetchUserParams,
  User,
  NormalizedEntities<User, { users: string[] }>
>({
  asyncActions: actions.fetchUserAsync,
  request: fetchUserRequest,
  normalizer: usersNormalize,
  cancelAction: actions.fetchUserCancel,
});

export const fetchUsersEpic = epicFactory<
  void,
  UserList,
  NormalizedEntities<User, { users: string[] }>
>({
  asyncActions: actions.fetchUsersAsync,
  request: fetchUsersRequest,
  normalizer: usersNormalize,
  cancelAction: actions.fetchUsersCancel,
});

export const createUserEpic = epicFactory<
  CreateUserData,
  User,
  NormalizedEntities<User, { users: string[] }>
>({
  asyncActions: actions.createUserAsync,
  request: createUserRequest,
  normalizer: usersNormalize,
  cancelAction: actions.createUserCancel,
});

export const fetchPlayersEpic = epicFactory<
  void,
  UserList,
  NormalizedEntities<User, { users: string[] }>
>({
  asyncActions: actions.fetchPlayersAsync,
  request: fetchPlayersRequest,
  normalizer: usersNormalize,
  cancelAction: actions.fetchPlayersCancel,
});

const usersEpic = combineEpics(
  fetchUserEpic,
  fetchUsersEpic,
  fetchPlayersEpic,
  createUserEpic,
  // createUserDataEpic,
);

export default usersEpic;
