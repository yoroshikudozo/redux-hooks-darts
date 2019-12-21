import { combineEpics } from 'redux-observable';

import { epicFactory } from 'modules/common/utils/rx';
import { NormalizedEntities } from 'modules/common/schemas';

import {
  FetchUserParams,
  User,
  CreateUserData,
  UserList,
} from 'modules/users/types';
import actions from 'modules/users/actions';
import { usersNormalize } from 'modules/users/schemas';
import {
  fetchUserRequest,
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

const usersEpic = combineEpics(
  fetchUserEpic,
  fetchPlayersEpic,
  createUserEpic,
  // createUserDataEpic,
);

export default usersEpic;
