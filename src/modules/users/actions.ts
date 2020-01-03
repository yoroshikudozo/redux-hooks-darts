import actionCreatorFactory from 'typescript-fsa';

import { NormalizedUsers } from 'modules/users/schemas';
import { CreateUserData, FetchUserParams } from 'modules/users/types';

const usersActionCreator = actionCreatorFactory('USERS');

export const fetchUserAsync = usersActionCreator.async<
  FetchUserParams,
  NormalizedUsers,
  Error
>('FETCH');
export const fetchUserCancel = usersActionCreator<FetchUserParams>(
  'FETCH_CANCEL',
);

export const fetchUsersAsync = usersActionCreator.async<
  void,
  NormalizedUsers,
  Error
>('FETCH_LIST');
export const fetchUsersCancel = usersActionCreator<void>('FETCH_LIST_CANCEL');

export const fetchPlayersAsync = usersActionCreator.async<
  void,
  NormalizedUsers,
  Error
>('PLAYERS/FETCH');
export const fetchPlayersCancel = usersActionCreator('PLAYERS/FETCH_CANCEL');

export const createUserAsync = usersActionCreator.async<
  CreateUserData,
  NormalizedUsers,
  Error
>('CREATE');

export const createUserAction = usersActionCreator<number>('CREATE');
export const createUserCancel = usersActionCreator<CreateUserData>(
  'CREATE_CANCEL',
);
