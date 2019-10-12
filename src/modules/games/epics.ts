import API from 'consts/endpoints';
import http from 'modules/common/utils/request';
import {
  FetchGamesParams,
  FetchGamesResponse,
  Game,
  CreateGameData,
  FetchGameParams,
} from 'modules/games/types';
import { epicFactory } from 'modules/common/utils/rx';
import actions, {
  fetchGamesCancel,
  createGameCancel,
  fetchGameCancel,
} from 'modules/games/actions';
import {
  NormalizedGames,
  NormalizedGame,
  gamesNormalize,
  gameNormalize,
} from 'modules/games/schema';
import { combineEpics } from 'redux-observable';

const fetchGamesRequest = ({ playerId }: FetchGamesParams) =>
  http<FetchGamesResponse>(`${API.GAMES}/${playerId}`);

const fetchGameRequest = ({ id }: FetchGameParams) =>
  http<Game>(`${API.GAMES}/${id}`);

const createGamesRequest = (data: CreateGameData) =>
  http<Game>(API.GAMES, { method: 'post', body: JSON.stringify(data) });

export const fetchGameEpic = epicFactory<FetchGameParams, Game, NormalizedGame>(
  {
    asyncActions: actions.fetchGameAsync,
    request: fetchGameRequest,
    operator: gameNormalize,
    cancelAction: fetchGameCancel,
  },
);

export const fetchGamesEpic = epicFactory<
  FetchGamesParams,
  FetchGamesResponse,
  NormalizedGames
>({
  asyncActions: actions.fetchGamesAsync,
  request: fetchGamesRequest,
  operator: gamesNormalize,
  cancelAction: fetchGamesCancel,
});

export const createGameEpic = epicFactory<CreateGameData, Game, NormalizedGame>(
  {
    asyncActions: actions.createGameAsync,
    request: createGamesRequest,
    operator: gameNormalize,
    cancelAction: createGameCancel,
  },
);

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
