import { combineReducers } from 'redux';

import { dartsReducer } from 'modules/darts/reducers';
import { rulesReducer } from 'modules/rules/reducers';
import { usersReducer } from 'modules/users/reducers';

const entitiesReducer = combineReducers({
  darts: dartsReducer,
  rules: rulesReducer,
  users: usersReducer,
});

export default entitiesReducer;
