import { combineReducers } from 'redux';

import authReducer from 'modules/auth/reducer';
import entitiesReducer from 'modules/reducers/entities';

export type AppState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth: authReducer,
  entities: entitiesReducer,
});

export default rootReducer;
