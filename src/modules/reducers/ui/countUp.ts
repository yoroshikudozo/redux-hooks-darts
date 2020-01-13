import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/games/actions';

const initialState = { currentRound: '', currentScore: '', currentGame: '' };

export const countUpReducer = reducerWithInitialState(initialState)
  .case(actions.createGameAsync.done, (_state_, payload) => {
    return {
      currentGame: payload.params.id,
      currentScore: payload.params.scores[0].id,
      currentRound: payload.params.scores[0].rounds[0].id,
    };
  })
  .case(actions.fetchGameAsync.done, (state, payload) => ({
    ...state,
    ...payload.result.entities.games,
  }));
