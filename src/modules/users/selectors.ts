import { createSelector } from 'reselect';
import { getEntities } from 'modules/common/selectors';

export const getUserEntities = createSelector(
  [getEntities],
  entities => entities.users || {},
);

export const getUserIds = createSelector([getResult], result => result.users);

export const getAllUserIds = createSelector([getUserIds], users =>
  users ? users.players : [],
);

export const getPlayers = createSelector(
  [getUserEntities, getAllUserIds],
  (users, ids) => ids.map(id => users[id]),
);
