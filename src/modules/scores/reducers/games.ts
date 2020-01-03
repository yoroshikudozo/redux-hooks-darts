import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/scores/actions';

const initialState: { [key: string]: string[] } = {};

const games = reducerWithInitialState(initialState).case(
  actions.fetchScoresByGameAsync.done,
  (state, action) => ({
    ...state,
    [action.params.gameId]: action.result.result.scores,
  }),
);

export default games;
