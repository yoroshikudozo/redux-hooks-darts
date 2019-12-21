import actionCreatorFactory from 'typescript-fsa';

import { FetchUserParams, CreateUserData, User } from 'modules/users/types';
import { NormalizedEntities } from 'modules/common/schemas';

const usersActionCreator = actionCreatorFactory('USERS');

export const fetchUserAsync = usersActionCreator.async<
  FetchUserParams,
  NormalizedEntities<User, { users: string[] }>,
  Error
>('FETCH');

export const fetchPlayersAsync = usersActionCreator.async<
  void,
  NormalizedEntities<User, { users: string[] }>,
  Error
>('PLAYERS/FETCH');

export const fetchUserCancel = usersActionCreator<FetchUserParams>(
  'FETCH_CANCEL',
);

export const fetchUsersCancel = usersActionCreator<FetchUserParams>(
  'FETCH_LIST_CANCEL',
);

export const fetchPlayersCancel = usersActionCreator('PLAYERS/FETCH_CANCEL');

export const createUserAsync = usersActionCreator.async<
  CreateUserData,
  NormalizedEntities<User, { users: string[] }>,
  Error
>('CREATE');

export const createUserAction = usersActionCreator<number>('CREATE');
export const createUserCancel = usersActionCreator<CreateUserData>(
  'CREATE_CANCEL',
);

const actions = {
  fetchUserAsync,
  fetchUserCancel,
  fetchPlayersAsync,
  fetchPlayersCancel,
  createUserAsync,
  createUserCancel,
};

export default actions;
