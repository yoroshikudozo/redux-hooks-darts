import actionCreatorFactory from 'typescript-fsa';

import { NormalizedEntities } from 'modules/common/schemas';
import { CreateUserData, FetchUserParams, User } from 'modules/users/types';

const usersActionCreator = actionCreatorFactory('USERS');

export const fetchUserAsync = usersActionCreator.async<
  FetchUserParams,
  NormalizedEntities<User, { users: string[] }>,
  Error
>('FETCH');
export const fetchUserCancel = usersActionCreator<FetchUserParams>(
  'FETCH_CANCEL',
);

export const fetchUsersAsync = usersActionCreator.async<
  void,
  NormalizedEntities<User, { users: string[] }>,
  Error
>('FETCH_LIST');
export const fetchUsersCancel = usersActionCreator<void>('FETCH_LIST_CANCEL');

export const fetchPlayersAsync = usersActionCreator.async<
  void,
  NormalizedEntities<User, { users: string[] }>,
  Error
>('PLAYERS/FETCH');
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
