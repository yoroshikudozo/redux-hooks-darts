import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

import { AppState } from 'modules/reducers';

import { getEntities } from 'modules/common/selectors';

export const getGameIdFromScores = (_state_: AppState, gameId: string) =>
  gameId;

export const getScoreEntities = createSelector(
  getEntities,
  entities => entities.scores.byId,
);

export const getScoreAllIds = createSelector(
  getEntities,
  entities => entities.scores.allIds,
);

export const getScoreGameIds = createSelector(
  getEntities,
  entities => entities.scores.byGame,
);

export const getScoreIdsFromGameId = createCachedSelector(
  getScoreGameIds,
  getGameIdFromScores,
  (byGame, gameId) => byGame[gameId],
)((_state_, gameId) => gameId);

export const getScoreById = createCachedSelector(
  getScoreEntities,
  (_state_: AppState, id: string) => id,
  (byId, id) => byId[id],
)((_state_, id) => id);

export const getScoresByGameId = createCachedSelector(
  getScoreEntities,
  getScoreIdsFromGameId,
  (byId, gameIds) => gameIds.map(id => byId[id]),
)((_state_, gameId) => gameId);
