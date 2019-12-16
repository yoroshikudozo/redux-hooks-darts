import { AppState } from 'modules/reducers';
import { createSelector } from 'reselect';

export const getAuth = (state: AppState) => state.auth;

export const getIsAuthenticated = createSelector(
  getAuth,
  auth => auth.isAuthenticated,
);
