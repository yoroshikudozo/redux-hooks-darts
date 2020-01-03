import { ThunkAction } from 'redux-thunk';

import cuid from 'cuid';
import { initCreateGameData } from 'logics';
import { AnyAction } from 'typescript-fsa';

import { GameIdentifier } from 'config';

import { AppState } from 'modules/reducers';

import actions from 'modules/games/actions';
import { gamesNormalize } from 'modules/games/schemas';
import { Game } from 'modules/games/types';

import user1 from 'modules/users/mock/resources/user1';
import user2 from 'modules/users/mock/resources/user2';

export const fetchGame = (
  id: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(actions.fetchGameAsync.started({ id }));
};

export const createGame = (
  slug: string,
  type: GameIdentifier,
): ThunkAction<void, AppState, undefined, AnyAction> => (
  dispatch,
  getState,
) => {
  const createGameData = initCreateGameData({
    id: cuid(),
    game: type,
    slug,
    state: getState(),
  });
  dispatch(actions.createGameAsync.started(createGameData));
  const game: Game = {
    ...createGameData,
    date: Date.now().toString(),
    players: [user1, user2],
    scores: [],
  };
  dispatch(
    actions.createGameAsync.done({
      result: gamesNormalize(game),
      params: createGameData,
    }),
  );
};
