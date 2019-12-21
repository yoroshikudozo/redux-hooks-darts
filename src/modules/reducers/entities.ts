import { combineReducers } from 'redux';

import { dartsReducer } from 'modules/darts/reducers';
import { rulesReducer } from 'modules/rules/reducers';

const entitiesReducer = combineReducers({
  darts: dartsReducer,
  rules: rulesReducer,
});

export default entitiesReducer;
