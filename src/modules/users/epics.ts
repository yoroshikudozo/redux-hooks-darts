import { combineEpics } from 'redux-observable';

import * as actions from 'modules/users/actions';
import {
  createUserRequest,
  fetchPlayersRequest,
  fetchUserRequest,
  fetchUsersRequest,
} from 'modules/users/api';
import { NormalizedUsers, usersNormalize } from 'modules/users/schemas';
import {
  CreateUserData,
  FetchUserParams,
  User,
  UserList,
} from 'modules/users/types';

import { epicFactory } from 'modules/common/utils/rx';

export const fetchUserEpic = epicFactory<
  FetchUserParams,
  User,
  NormalizedUsers
>({
  asyncActions: actions.fetchUserAsync,
  request: fetchUserRequest,
  normalizer: usersNormalize,
  cancelAction: actions.fetchUserCancel,
});

export const fetchUsersEpic = epicFactory<void, UserList, NormalizedUsers>({
  asyncActions: actions.fetchUsersAsync,
  request: fetchUsersRequest,
  normalizer: usersNormalize,
  cancelAction: actions.fetchUsersCancel,
});

export const createUserEpic = epicFactory<
  CreateUserData,
  User,
  NormalizedUsers
>({
  asyncActions: actions.createUserAsync,
  request: createUserRequest,
  normalizer: usersNormalize,
  cancelAction: actions.createUserCancel,
});

export const fetchPlayersEpic = epicFactory<void, UserList, NormalizedUsers>({
  asyncActions: actions.fetchPlayersAsync,
  request: fetchPlayersRequest,
  normalizer: usersNormalize,
  cancelAction: actions.fetchPlayersCancel,
});

const usersEpic = combineEpics(
  // fetchUserEpic,
  fetchUsersEpic,
  // fetchPlayersEpic,
  createUserEpic,
  // createUserDataEpic,
);

export default usersEpic;
