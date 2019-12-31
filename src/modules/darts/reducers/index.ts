import { combineReducers } from 'redux';

import allIds from 'modules/darts/reducers/allIds';
import byId from 'modules/darts/reducers/byId';
import byGame from 'modules/darts/reducers/games';

export const dartsReducer = combineReducers({ allIds, byId, byGame });
