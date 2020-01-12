import { combineReducers } from 'redux';

import allIds from 'modules/users/reducers/allIds';
import byId from 'modules/users/reducers/byId';
import playerIds from 'modules/users/reducers/playerIds';

export const usersReducer = combineReducers({ allIds, byId, playerIds });
