import { ThunkAction } from 'redux-thunk';

import { makeDart } from 'logics';
import { AnyAction } from 'typescript-fsa';

import { AppState } from 'modules/reducers';

import actions from 'modules/darts/actions';
import { dartsNormalize } from 'modules/darts/schemas';
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
  dispatch(actions.createDartAction.started(data));
  const dartData = makeDart(data, getState());
  console.log(dartData);
  dispatch(
    actions.createDartAction.done({
      result: dartsNormalize(dartData),
      params: data,
    }),
  );
};
