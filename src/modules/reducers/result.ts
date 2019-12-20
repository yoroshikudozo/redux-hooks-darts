import { combineReducers } from 'redux';

import { dartsReducer } from 'modules/darts/reducer';

const entities = combineReducers({ darts: dartsReducer });

export default entities;
