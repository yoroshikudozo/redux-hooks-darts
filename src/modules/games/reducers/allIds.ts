import * as R from 'ramda';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/games/actions';

const initialState: string[] = [];

const allIds = reducerWithInitialState(initialState)
  .case(actions.fetchGameAsync.done, (state, action) =>
    R.union(state, action.result.result.games),
  )
  .case(actions.createGameAsync.done, (state, action) =>
    R.union(state, action.result.result.games),
  );

export default allIds;
