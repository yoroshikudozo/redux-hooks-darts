import { AnyAction } from 'typescript-fsa';
import cuid from 'cuid';
import { ThunkAction } from 'redux-thunk';

import actions from 'modules/darts/actions';
import { CreateDartData } from 'modules/darts/types';
import { AppState } from 'modules/reducers';

export const initCreateDartRequestData = (
  id: string,
  value: number,
  state: AppState,
): CreateDartData => ({
  area: 'inner',
  dartType: 'single',
  id,
  index: 1,
  value,
});

export const fetchDart = (
  id: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(actions.fetchDartAsync.started({ id }));
};

export const fetchDarts = (
  gameId: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(actions.fetchDartsByGameAsync.started({ gameId }));
};

export const createDart = (
  value: number,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const id = cuid();
  const createDartData = initCreateDartRequestData(id, value, getState());
  dispatch(actions.createDartAsync.started(createDartData));
};
