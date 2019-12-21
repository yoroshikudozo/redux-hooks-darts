import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'typescript-fsa';
import cuid from 'cuid';

import { AppState } from 'modules/reducers';

import { CreateUserData, CreateUserFormData } from 'modules/users/types';
import actions from 'modules/users/actions';

export const initCreateUserRequestData = (
  { name, nickname }: CreateUserFormData,
  id: string,
  state: AppState,
): CreateUserData => ({
  id,
  name,
  nickname: nickname || '',
  flight: 0,
});

export const fetchUser = (
  id: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(actions.fetchUserAsync.started({ id }));
};

export const fetchPlayers = (): ThunkAction<
  void,
  AppState,
  undefined,
  AnyAction
> => dispatch => {
  dispatch(actions.fetchPlayersAsync.started());
};

export const createUser = (
  data: CreateUserFormData,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const id = cuid();
  const createUserData = initCreateUserRequestData(data, id, getState());
  dispatch(actions.createUserAsync.started(createUserData));
};
