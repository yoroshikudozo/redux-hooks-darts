import actionCreatorFactory, { AnyAction } from 'typescript-fsa';
import cuid from 'cuid';

import {
  FetchGameParams,
  FetchGamesParams,
  CreateGameData,
  GameType,
  Game,
} from 'modules/games/types';
import { AppState } from 'modules/reducers';
import { ThunkAction } from 'redux-thunk';
import { NormalizedEntities } from 'modules/common/schemas';

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

export const initCreateGameRequestData = (
  id: string,
  gameType: GameType,
  state: AppState,
): CreateGameData => ({
  gameType: 'countUp',
  id,
  status: 'playing',
  players: ['1'],
});

export const fetchGame = (
  id: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(fetchGameAsync.started({ id }));
};

export const createGame = (
  gameType: GameType,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const id = cuid();
  const createGameData = initCreateGameRequestData(id, gameType, getState());
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
