import { ThunkAction } from 'redux-thunk';

import cuid from 'cuid';
import { initCreateGameData } from 'logics';
import { AnyAction } from 'typescript-fsa';

import { GameIdentifier } from 'config';

import { AppState } from 'modules/reducers';

import actions from 'modules/games/actions';

export const fetchGame = (
  id: string,
): ThunkAction<void, AppState, undefined, AnyAction> => dispatch => {
  dispatch(actions.fetchGameAsync.started({ id }));
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
  dispatch(actions.createGameAsync.started(createGameData));
};
