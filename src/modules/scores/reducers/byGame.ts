import { reducerWithInitialState } from 'typescript-fsa-reducers';

import gameActions from 'modules/games/actions';
import actions from 'modules/scores/actions';

const initialState: { [key: string]: string[] } = {};

const games = reducerWithInitialState(initialState)
  .case(actions.fetchScoresByGameAsync.done, (state, action) => ({
    ...state,
    [action.params.gameId]: action.result.result.scores,
  }))
  .case(gameActions.createGameAsync.done, (state, action) => ({
    ...state,
    [action.params.id]: action.result.entities.games[action.params.id].scores,
  }));

export default games;
