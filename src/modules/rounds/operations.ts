import { ThunkAction } from 'redux-thunk';

import cuid from 'cuid';
import { makeCreateGameData } from 'logics';
import { AnyAction } from 'typescript-fsa';

import { GameIdentifier } from 'config';

import { AppState } from 'modules/reducers';

import actions from 'modules/games/actions';
import { createGameDataNormalize } from 'modules/games/schemas';

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
  const createGameData = makeCreateGameData({
    id: cuid(),
    game: type,
    slug,
    state: getState(),
  });
  dispatch(actions.createGameAsync.started(createGameData));
  dispatch(
    actions.createGameAsync.done({
      result: createGameDataNormalize(createGameData),
      params: createGameData,
    }),
  );
};
