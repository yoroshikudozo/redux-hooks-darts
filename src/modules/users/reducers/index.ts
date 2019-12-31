import { combineReducers } from 'redux';

import allIds from 'modules/users/reducers/allIds';
import byId from 'modules/users/reducers/byId';

export const usersReducer = combineReducers({ allIds, byId });
