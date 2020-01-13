import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

import { AppState } from 'modules/reducers';

import { getEntities } from 'modules/common/selectors';

export const getGameIdFromGames = (_state_: AppState, gameId: string) => gameId;

export const getGameEntities = createSelector(
  getEntities,
  entities => entities.games.byId,
);

export const getGameAllIds = createSelector(
  getEntities,
  entities => entities.games.allIds,
);

export const getGameById = createCachedSelector(
  getGameEntities,
  (_state_: AppState, id: string) => id,
  (byId, id) => byId[id],
)((_state_, id) => id);

export const getScoreIdsByGame = createCachedSelector(
  getGameById,
  game => game.scores,
)((_state_, id) => id);

export const getGameBySlug = createCachedSelector(
  getGameEntities,
  (_state_: AppState, slug: string) => slug,
  (byId, slug) => {
    const key = Object.keys(byId).find(key => byId[key].url === slug);
    return key && byId[key];
  },
)((_state_, slug) => slug);
