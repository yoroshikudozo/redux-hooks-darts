import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

import { AppState } from 'modules/reducers';

import { getEntities } from 'modules/common/selectors';

export const getGameIdFromUsers = (_state_: AppState, gameId: string) => gameId;

export const getUserEntities = createSelector(
  getEntities,
  entities => entities.users.byId,
);

export const getUserAllIds = createSelector(
  getEntities,
  entities => entities.users.allIds,
);

export const getAllUsers = createSelector(
  getUserEntities,
  getUserAllIds,
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const getPlayers = createSelector(
  getUserEntities,
  getUserAllIds,
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const getUserById = createCachedSelector(
  getUserEntities,
  (_state_: AppState, id: string) => id,
  (byId, id) => byId[id],
)((_state_, id) => id);
