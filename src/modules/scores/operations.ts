import { ThunkAction } from 'redux-thunk';

import { AnyAction } from 'typescript-fsa';

import { makeScore } from 'logics/countUp';
import { AppState } from 'modules/reducers';

import actions from 'modules/scores/actions';

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
  gameId: string,
  playerId: string,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const score = makeScore(gameId, playerId);
  dispatch(actions.createScoreAsync.started(score));
};
