import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ById } from 'modules/common/types';
import gameActions from 'modules/games/actions';
import actions from 'modules/scores/actions';
import { Score } from 'modules/scores/types';

const initialState: ById<Score> = {};

const byId = reducerWithInitialState(initialState)
  .case(actions.fetchScoresByGameAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.scores,
  }))
  .case(actions.fetchScoreAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.scores,
  }))
  .case(gameActions.createGameAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.scores,
  }));

export default byId;
