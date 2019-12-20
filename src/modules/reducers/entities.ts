import { combineReducers } from 'redux';

import { dartsReducer } from 'modules/darts/reducer';

const entitiesReducer = combineReducers({ darts: dartsReducer });

export default entitiesReducer;
