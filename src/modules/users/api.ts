import CONSTS from 'consts';

import { usersNormalize } from 'modules/users/schemas';
import {
  CreateUserData,
  FetchUserParams,
  User,
  UserList,
} from 'modules/users/types';

import http, { handleErrors } from 'modules/common/utils/wretch';

const endpoint = `${CONSTS.API.ROOT}${CONSTS.API.USERS}`;

export const fetchUserRequest = ({ id }: FetchUserParams) =>
  http(`${endpoint}/${id}`)
    .get()
    .json<User>()
    .catch(handleErrors);

export const fetchUserRequest2 = (
  { id }: FetchUserParams,
  controller: AbortController,
) =>
  http(`${endpoint}/${id}`)
    .signal(controller)
    .get()
    .onAbort(err => {
      console.log('Aborted !');
      throw err;
    })
    .json<User>()
    .catch(handleErrors)
    .then(data => usersNormalize(data));

export const fetchUsersRequest = () =>
  http(`${endpoint}`)
    .get()
    .json<UserList>()
    .catch(handleErrors);

export const fetchPlayersRequest = () =>
  http(`${endpoint}`)
    .get()
    .onAbort(err => {
      console.log('Aborted !');
      throw err;
    })
    .json<UserList>()
    .catch(handleErrors);

export const fetchPlayersRequest2 = (controller: AbortController) =>
  http(`${endpoint}`)
    .signal(controller)
    .get()
    .onAbort(err => {
      console.log('Aborted !');
      throw err;
    })
    .json<UserList>()
    .catch(handleErrors)
    .then(data => usersNormalize(data));

export const createUserRequest = (data: CreateUserData) =>
  http(`${endpoint}`, {
    body: JSON.stringify(data),
  })
    .post()
    .json<User>()
    .catch(handleErrors);
