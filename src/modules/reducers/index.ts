import { combineReducers, AnyAction } from 'redux';
import merge from 'lodash/merge';

type Keys = 'darts' | 'rounds' | 'games' | 'users';

interface Rule {
  bull: 'separate' | 'fat';
}

export interface AppState {
  entities: { [keyof in Keys]: any };
  rules: Rule;
}

const initialState = { users: {} };

// Updates an entity cache in response to any action with result.entities.
const entities = (state = initialState, action: AnyAction) => {
  if (
    action.payload &&
    action.payload.result &&
    action.payload.result.entities
  ) {
    return merge({}, state, action.result.entities);
  }

  return state;
};

const rootReducer = combineReducers({
  entities,
});

export default rootReducer;
