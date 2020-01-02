import actionCreatorFactory from 'typescript-fsa';

import { NormalizedEntities } from 'modules/common/schemas';
import {
  CreateGameData,
  FetchGameParams,
  FetchGamesParams,
  Game,
} from 'modules/games/types';

const gamesActionCreator = actionCreatorFactory('GAMES');

export const fetchGameAsync = gamesActionCreator.async<
  FetchGameParams,
  NormalizedEntities<Game, { games: string[] }>,
  Error
>('FETCH');

export const fetchGamesAsync = gamesActionCreator.async<
  FetchGamesParams,
  NormalizedEntities<Game, { games: string[] }>,
  Error
>('FETCH_LIST');

export const fetchGameCancel = gamesActionCreator<FetchGameParams>(
  'FETCH_CANCEL',
);

export const fetchGamesCancel = gamesActionCreator<FetchGamesParams>(
  'FETCH_LIST_CANCEL',
);

export const createGameAsync = gamesActionCreator.async<
  CreateGameData,
  NormalizedEntities<Game, { games: string[] }>,
  Error
>('CREATE');

export const createGameAction = gamesActionCreator<number>('CREATE');
export const createGameCancel = gamesActionCreator<CreateGameData>(
  'CREATE_CANCEL',
);

const actions = {
  fetchGameAsync,
  fetchGamesAsync,
  fetchGameCancel,
  createGameAsync,
  createGameCancel,
};

export default actions;
