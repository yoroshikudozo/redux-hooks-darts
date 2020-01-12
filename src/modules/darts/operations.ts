import { ThunkAction } from 'redux-thunk';

import cuid from 'cuid';
import { makeDart } from 'logics';
import { AnyAction } from 'typescript-fsa';

import { AppState } from 'modules/reducers';

import actions from 'modules/darts/actions';
import { DartsBoardData } from 'modules/darts/types';

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
  data: DartsBoardData,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const createDartData = makeDart(data, getState());
  dispatch(actions.createDartAsync.started(createDartData));
};
