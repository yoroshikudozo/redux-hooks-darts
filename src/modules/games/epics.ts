import { combineEpics } from 'redux-observable';

import API from 'consts/endpoints';

import { NormalizedEntities } from 'modules/common/schemas';
import actions, {
  createGameCancel,
  fetchGameCancel,
  fetchGamesCancel,
} from 'modules/games/actions';
import { gameNormalize, gamesNormalize } from 'modules/games/schemas';
import {
  CreateGameData,
  FetchGameParams,
  FetchGamesParams,
  FetchGamesResponse,
  Game,
} from 'modules/games/types';

import http from 'modules/common/utils/request-first';
import { epicFactory } from 'modules/common/utils/rx';

const fetchGamesRequest = ({ playerId }: FetchGamesParams) =>
  http<FetchGamesResponse>(`${API.GAMES}/${playerId}`);

const fetchGameRequest = ({ id }: FetchGameParams) =>
  http<Game>(`${API.GAMES}/${id}`);

const createGamesRequest = (data: CreateGameData) =>
  http<Game>(API.GAMES, { method: 'post', body: JSON.stringify(data) });

export const fetchGameEpic = epicFactory<
  FetchGameParams,
  Game,
  NormalizedEntities<Game, { games: string[] }>
>({
  asyncActions: actions.fetchGameAsync,
  request: fetchGameRequest,
  normalizer: gameNormalize,
  cancelAction: fetchGameCancel,
});

export const fetchGamesEpic = epicFactory<
  FetchGamesParams,
  FetchGamesResponse,
  NormalizedEntities<Game, { games: string[] }>
>({
  asyncActions: actions.fetchGamesAsync,
  request: fetchGamesRequest,
  normalizer: gamesNormalize,
  cancelAction: fetchGamesCancel,
});

export const createGameEpic = epicFactory<
  CreateGameData,
  Game,
  NormalizedEntities<Game, { games: string[] }>
>({
  asyncActions: actions.createGameAsync,
  request: createGamesRequest,
  normalizer: gameNormalize,
  cancelAction: createGameCancel,
});

// export const createGameDataEpic = actionTransformEpicFactory(
//   actions.createGame,
//   actions.createGameAsync.started,
//   initCreateGameRequestData,
// );

const gamesEpic = combineEpics(
  fetchGameEpic,
  fetchGamesEpic,
  createGameEpic,
  // createGameDataEpic,
);

export default gamesEpic;
