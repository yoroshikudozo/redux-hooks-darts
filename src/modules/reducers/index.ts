import { combineReducers, AnyAction } from 'redux';
import merge from 'lodash/merge';
import { Auth } from 'modules/auth/types';

type Keys = 'darts' | 'rounds' | 'games' | 'users';

interface Rule {
  bull: 'separate' | 'fat';
}

export interface AppState {
  entities: { [keyof in Keys]: any };
  rules: Rule;
  auth: Auth;
}

const initialState = { users: {} };

// Updates an entity cache in response to any action with result.entities.
const entities = (state = initialState, action: AnyAction) => {
  if (
    action.payload &&
    action.payload.result &&
    action.payload.result.entities
  ) {
    return merge({}, state, action.payload.result.entities);
  }

  return state;
};

const rootReducer = combineReducers({
  entities,
  auth: (state = { isAuthenticated: false }, action) => state,
});

export default rootReducer;
