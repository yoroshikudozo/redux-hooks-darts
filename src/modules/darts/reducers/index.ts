import { combineReducers } from 'redux';

import byId from 'modules/darts/reducers/byId';
import byGame from 'modules/darts/reducers/games';
import allIds from 'modules/darts/reducers/allIds';

export const dartsReducer = combineReducers({ allIds, byId, byGame });
