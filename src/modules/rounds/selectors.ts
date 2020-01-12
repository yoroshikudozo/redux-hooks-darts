import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

import { AppState } from 'modules/reducers';

import { getEntities } from 'modules/common/selectors';

export const getRoundEntities = createSelector(
  getEntities,
  entities => entities.rounds.byId,
);

export const getRoundAllIds = createSelector(
  getEntities,
  entities => entities.rounds.allIds,
);

export const getRoundById = createCachedSelector(
  getRoundEntities,
  (_state_: AppState, id: string) => id,
  (byId, id) => byId[id],
)((_state_, id) => id);
