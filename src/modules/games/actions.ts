import actionCreatorFactory from 'typescript-fsa';

import { NormalizedGames } from 'modules/games/schemas';
import {
  CreateGameData,
  FetchGameParams,
  FetchGamesParams,
  Game,
} from 'modules/games/types';

const gamesActionCreator = actionCreatorFactory('GAMES');

export const fetchGameAsync = gamesActionCreator.async<
  FetchGameParams,
  NormalizedGames,
  Error
>('FETCH');

export const fetchGamesAsync = gamesActionCreator.async<
  FetchGamesParams,
  NormalizedGames,
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
  NormalizedGames,
  Error
>('CREATE');

export const createGameAction = gamesActionCreator<number>('CREATE');
export const createGameCancel = gamesActionCreator<CreateGameData>(
  'CREATE_CANCEL',
);

export const createGameTemp = gamesActionCreator<Game>('CREATE_TEMP');

const actions = {
  fetchGameAsync,
  fetchGamesAsync,
  fetchGameCancel,
  createGameAsync,
  createGameCancel,
  createGameTemp,
};

export default actions;
