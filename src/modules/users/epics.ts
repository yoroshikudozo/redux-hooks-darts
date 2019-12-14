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
import {
  NormalizedUsers,
  usersNormalize,
  userNormalize,
} from 'modules/users/schemas';
import { combineEpics } from 'redux-observable';

const fetchUsersRequest = ({ id }: FetchUserParams) =>
  http<FetchUsersResponse>(`${API.USERS}/${id}`);

const fetchUserRequest = ({ id }: FetchUserParams) =>
  http<User>(`${API.USERS}/${id}`);

const fetchPlayersRequest = async () => {
  const a = await http<FetchUsersResponse>(`${API.USERS}`);
  console.log(a);
  return a;
};

const createUsersRequest = (data: CreateUserData) =>
  http<User>(API.USERS, { method: 'post', body: JSON.stringify(data) });

export const fetchUserEpic = epicFactory<
  FetchUserParams,
  User,
  NormalizedUsers
>({
  asyncActions: actions.fetchUserAsync,
  request: fetchUserRequest,
  operator: userNormalize,
  cancelAction: actions.fetchUserCancel,
});

export const fetchPlayersEpic = epicFactory<
  undefined,
  FetchUsersResponse,
  NormalizedUsers
>({
  asyncActions: actions.fetchPlayersAsync,
  request: fetchPlayersRequest,
  operator: usersNormalize,
  cancelAction: actions.fetchPlayersCancel,
});

export const createUserEpic = epicFactory<
  CreateUserData,
  User,
  NormalizedUsers
>({
  asyncActions: actions.createUserAsync,
  request: createUsersRequest,
  operator: userNormalize,
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
