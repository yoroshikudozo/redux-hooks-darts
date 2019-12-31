import { createSelector } from 'reselect';

import { getEntities } from 'modules/common/selectors';

export const getUsers = createSelector(
  [getEntities],
  entities => entities.users || {},
);

export const getUserEntities = createSelector(
  [getUsers],
  entities => entities.byId || {},
);

export const getUserIds = createSelector(getUsers, result => result.allIds);

export const getPlayers = createSelector(
  [getUserEntities, getUserIds],
  (users, ids) => ids.map(id => users[id]),
);
