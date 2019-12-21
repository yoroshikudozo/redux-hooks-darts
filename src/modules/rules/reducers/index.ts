import { combineReducers } from 'redux';

import byId from 'modules/rules/reducers/byId';
import byUser from 'modules/rules/reducers/users';
import allIds from 'modules/rules/reducers/allIds';

export const rulesReducer = combineReducers({ allIds, byId, byUser });
