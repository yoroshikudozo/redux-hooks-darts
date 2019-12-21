import { combineReducers } from 'redux';

import byId from 'modules/users/reducers/byId';
import allIds from 'modules/users/reducers/allIds';

export const usersReducer = combineReducers({ allIds, byId });
