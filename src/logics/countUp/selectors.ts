import { createSelector } from 'reselect';

import { AppState } from 'modules/reducers';

const getUi = (state: AppState) => state.ui;

export const getCountUp = createSelector(getUi, ui => ui['countUp']);

export const getCurrentGameId = createSelector(
  getCountUp,
  countUp => countUp['currentGame'],
);

export const getCurrentScoreId = createSelector(
  getCountUp,
  countUp => countUp['currentScore'],
);

export const getCurrentRoundId = createSelector(
  getCountUp,
  countUp => countUp['currentRound'],
);
