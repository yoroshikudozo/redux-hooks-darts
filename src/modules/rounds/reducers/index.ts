import { combineReducers } from 'redux';

import allIds from 'modules/rounds/reducers/allIds';
import byId from 'modules/rounds/reducers/byId';

export const roundsReducer = combineReducers({ allIds, byId });
