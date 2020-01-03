import * as R from 'ramda';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/scores/actions';

const initialState: string[] = [];

const allIds = reducerWithInitialState(initialState)
  .case(actions.fetchScoreAsync.done, (state, action) =>
    R.union(state, action.result.result.scores),
  )
  .case(actions.fetchScoresByGameAsync.done, (state, action) =>
    R.union(state, action.result.result.scores),
  )
  .case(actions.createScoreAsync.done, (state, action) =>
    R.union(state, action.result.result.scores),
  );

export default allIds;
