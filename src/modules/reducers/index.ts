import { combineReducers } from 'redux';
import entitiesReducer from 'modules/reducers/entities';

const rootReducer = combineReducers({
  auth: (state = { isAuthenticated: false }, action) => state,
  entities: entitiesReducer,
});

export type AppState = any; //ReturnType<typeof rootReducer>;

export default rootReducer;
