import API from 'consts/endpoints';

import http, { handleErrors } from 'modules/common/utils/wretch';

import {
  FetchUserParams,
  User,
  CreateUserData,
  UserList,
} from 'modules/users/types';
import { usersNormalize } from 'modules/users/schemas';

const endpoint = `${API.USERS}`;

export const fetchUserRequest = ({ id }: FetchUserParams) =>
  http(`${endpoint}/${id}`)
    .get()
    .json<User>()
    .catch(handleErrors);

export const fetchUsersRequest = () =>
  http(`${endpoint}`)
    .get()
    .json<UserList>()
    .catch(handleErrors);

export const fetchPlayersRequest = () =>
  http(`${endpoint}`)
    .get()
    .json<UserList>()
    .catch(handleErrors);

export const fetchPlayersRequest2 = (controller: AbortController) =>
  http(`${endpoint}`)
    .signal(controller)
    .get()
    .json<UserList>()
    .catch(handleErrors)
    .then(data => usersNormalize<{ users: string[] }>(data));

export const createUserRequest = (data: CreateUserData) =>
  http(`${endpoint}`, {
    body: JSON.stringify(data),
  })
    .post()
    .json<User>()
    .catch(handleErrors);
