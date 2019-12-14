import { Dart } from 'modules/darts/types';
import { combineReducers } from 'redux';
import byId from 'modules/darts/reducer/byId';
import allIds from 'modules/darts/reducer/allIds';

export interface DartsState {
  entities: {
    [key: string]: Dart;
  };
  result: string[];
  isLoading: boolean;
}

export const dartsReducer = combineReducers({ byId, allIds });
