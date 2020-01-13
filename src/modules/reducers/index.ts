import { combineReducers } from 'redux';

import authReducer from 'modules/auth/reducer';
import entitiesReducer from 'modules/reducers/entities';
import uiReducer from 'modules/reducers/ui';

export type AppState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
  ui: uiReducer,
});

export default rootReducer;
