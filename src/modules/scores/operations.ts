import { ThunkAction } from 'redux-thunk';

import cuid from 'cuid';
import { AnyAction } from 'typescript-fsa';

import { AppState } from 'modules/reducers';

import actions from 'modules/scores/actions';
import { CreateScoreData } from 'modules/scores/types';
import { getPlayers } from 'modules/users/selectors';

export const initCreateScoreRequestData = (
  id: string,
  value: number,
  state: AppState,
): CreateScoreData => {
  const players = getPlayers(state);
  return { players };
};

export const fetchScore = (
  id: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(actions.fetchScoreAsync.started({ id }));
};

export const fetchScores = (
  gameId: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(actions.fetchScoresByGameAsync.started({ gameId }));
};

export const createScore = (
  value: number,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const id = cuid();
  const createScoreData = initCreateScoreRequestData(id, value, getState());
  dispatch(actions.createScoreAsync.started(createScoreData));
};
