import { combineReducers } from 'redux';

import allIds from 'modules/scores/reducers/allIds';
import byId from 'modules/scores/reducers/byId';
import byGame from 'modules/scores/reducers/games';

export const scoresReducer = combineReducers({ allIds, byId, byGame });
