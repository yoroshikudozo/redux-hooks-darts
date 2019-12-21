import { combineReducers } from 'redux';

import byId from 'modules/darts/reducer/byId';
import byGame from 'modules/darts/reducer/games';
import allIds from 'modules/darts/reducer/allIds';

export const dartsReducer = combineReducers({ allIds, byId, byGame });
