import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

import { AppState } from 'modules/reducers';

import { getEntities } from 'modules/common/selectors';

export const getGameIdFromGames = (_state_: AppState, roundId: string) =>
  roundId;

export const getGameEntities = createSelector(
  getEntities,
  entities => entities.rounds.byId,
);

export const getGameAllIds = createSelector(
  getEntities,
  entities => entities.rounds.allIds,
);

export const getGameById = createCachedSelector(
  getGameEntities,
  (_state_: AppState, id: string) => id,
  (byId, id) => byId[id],
)((_state_, id) => id);
