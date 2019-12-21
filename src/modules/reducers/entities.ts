import { combineReducers } from 'redux';

import { dartsReducer } from 'modules/darts/reducers';

const entitiesReducer = combineReducers({ darts: dartsReducer });

export default entitiesReducer;
