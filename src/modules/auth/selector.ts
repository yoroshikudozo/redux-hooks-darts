import { createSelector } from 'reselect';

import { AppState } from 'modules/reducers';

export const getAuth = (state: AppState) => state.auth;

export const getIsAuthenticated = createSelector(
  getAuth,
  auth => auth.isAuthenticated,
);
