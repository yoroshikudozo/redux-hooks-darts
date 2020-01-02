import { ThunkAction } from 'redux-thunk';

import cuid from 'cuid';
import { initCreateGameData } from 'logics';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';

import { GameIdentifier } from 'config';

import { AppState } from 'modules/reducers';

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

export const fetchGame = (
  id: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(fetchGameAsync.started({ id }));
};

export const createGame = (
  slug: string,
  game: GameIdentifier,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const createGameData = initCreateGameData({
    id: cuid(),
    game,
    slug,
    state: getState(),
  });
  dispatch(createGameAsync.started(createGameData));
};

const actions = {
  fetchGameAsync,
  fetchGamesAsync,
  fetchGameCancel,
  createGame,
  createGameAsync,
  createGameCancel,
};

export default actions;
