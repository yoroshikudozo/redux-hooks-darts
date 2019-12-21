import API from 'consts/endpoints';

import http, { handleErrors } from 'modules/common/utils/wretch';

import {
  FetchUserParams,
  User,
  CreateUserData,
  UserList,
} from 'modules/users/types';

const endpoint = `${API.USERS}`;

export const fetchUserRequest = ({ id }: FetchUserParams) =>
  http(`${endpoint}/${id}`)
    .get()
    .json<User>()
    .catch(handleErrors);

export const fetchPlayersRequest = () =>
  http(`${endpoint}`)
    .get()
    .json<UserList>()
    .catch(handleErrors);

export const createUserRequest = (data: CreateUserData) =>
  http(`${endpoint}`, {
    body: JSON.stringify(data),
  })
    .post()
    .json<User>()
    .catch(handleErrors);
