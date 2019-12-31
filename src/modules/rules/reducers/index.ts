import { combineReducers } from 'redux';

import allIds from 'modules/rules/reducers/allIds';
import byId from 'modules/rules/reducers/byId';
import byUser from 'modules/rules/reducers/users';

export const rulesReducer = combineReducers({ allIds, byId, byUser });
