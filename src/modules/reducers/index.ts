import { combineReducers, AnyAction } from 'redux';
import * as R from 'ramda';
import { Auth } from 'modules/auth/types';
import { getQueryString as qs } from 'modules/common/utils/qs';
import { Dart } from 'modules/darts/types';
import { User } from 'modules/users/types';
import { Game } from 'modules/games/types';
import { Round } from 'modules/rounds/types';

type Keys = 'darts' | 'rounds' | 'games' | 'users';

interface Rule {
  bull: 'separate' | 'fat';
}

export interface AppState {
  entities: {
    darts?: { [key: string]: Dart };
    rounds?: { [key: string]: Round };
    games?: { [key: string]: Game };
    users?: { [key: string]: User };
  };
  result: { [keyof in Keys]?: { [key: string]: string[] } };
  rules: Rule;
  auth: Auth;
}

const initialState = {};

const getEntity = R.path(['payload', 'result', 'entities']);

// Updates an entity cache in response to any action with result.entities.
const entitiesReducer = (state = initialState, action: AnyAction) => {
  const entities = getEntity(action);
  return !!entities ? R.mergeDeepRight(state, entities) : state;
};

const getResult = R.path<string[] | string>(['payload', 'result', 'result']);
const getParams = R.path<string[] | string>(['payload', 'params']);

const resultReducer = (state = initialState, action: AnyAction) => {
  const result = getResult(action);
  if (result === undefined) return state;

  const params = getParams(action);
  if (!params) return state;

  return R.mergeDeepRight(state, { [qs(params)]: result });
};

const rootReducer = combineReducers({
  entities: entitiesReducer,
  result: resultReducer,
  auth: (state = { isAuthenticated: false }, action) => state,
});

export default rootReducer;
