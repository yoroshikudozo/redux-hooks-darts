import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

import { getEntities } from 'modules/common/selectors';
import { AppState } from 'modules/reducers';

export const getGameIdFromDarts = (_state_: AppState, gameId: string) => gameId;

export const getDartEntities = createSelector(
  getEntities,
  entities => entities.darts.byId,
);

export const getDartAllIds = createSelector(
  getEntities,
  entities => entities.darts.allIds,
);

export const getDartGameIds = createSelector(
  getEntities,
  entities => entities.darts.byGame,
);

export const getDartIdsFromGameId = createCachedSelector(
  getDartGameIds,
  getGameIdFromDarts,
  (byGame, gameId) => byGame[gameId],
)((_state_, gameId) => gameId);

export const getDartById = createCachedSelector(
  getDartEntities,
  (_state_: AppState, id: string) => id,
  (byId, id) => byId[id],
)((_state_, id) => id);

export const getDartsByGameId = createCachedSelector(
  getDartEntities,
  getDartIdsFromGameId,
  (byId, gameIds) => gameIds.map(id => byId[id]),
)((_state_, gameId) => gameId);
