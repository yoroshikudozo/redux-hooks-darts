import { combineReducers } from 'redux';

import allIds from 'modules/scores/reducers/allIds';
import byGame from 'modules/scores/reducers/byGame';
import byId from 'modules/scores/reducers/byId';

export const scoresReducer = combineReducers({ allIds, byId, byGame });
