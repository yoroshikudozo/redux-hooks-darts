import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ById } from 'modules/common/types';
import actions from 'modules/games/actions';
import { Game } from 'modules/games/types';

const initialState: ById<Game> = {};

const byId = reducerWithInitialState(initialState)
  .case(actions.createGameAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.games,
  }))
  .case(actions.fetchGameAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.games,
  }));

export default byId;
