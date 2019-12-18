import { Dart } from 'modules/darts/types';
import { combineReducers } from 'redux';
import entities from 'modules/darts/reducer/entities';
import games from 'modules/darts/reducer/games';
import allIds from 'modules/darts/reducer/allIds';

export interface DartsState {
  entities: {
    [key: string]: Dart;
  };
  games: {
    [key: string]: string[];
  };
  allIds: {
    [key: string]: string[];
  };
  isLoading: boolean;
}

export const dartsReducer = combineReducers({ entities, games, allIds });
