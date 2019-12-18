import { combineReducers, AnyAction } from 'redux';
import * as R from 'ramda';
import { Auth } from 'modules/auth/types';
import { getQueryString as qs } from 'modules/common/utils/qs';
import { Dart } from 'modules/darts/types';
import { User } from 'modules/users/types';
import { Game } from 'modules/games/types';
import { Round } from 'modules/rounds/types';
import { dartsReducer } from 'modules/darts/reducer';

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

const rootReducer = combineReducers({
  auth: (state = { isAuthenticated: false }, action) => state,
  darts: dartsReducer,
});

export default rootReducer;
