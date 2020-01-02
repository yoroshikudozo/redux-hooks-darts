import { combineReducers } from 'redux';

import allIds from 'modules/games/reducers/allIds';
import byId from 'modules/games/reducers/byId';

export const gamesReducer = combineReducers({ allIds, byId });
