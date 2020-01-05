import * as R from 'ramda';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/rounds/actions';

const initialState: string[] = [];

const allIds = reducerWithInitialState(initialState)
  .case(actions.fetchRoundAsync.done, (state, action) =>
    R.union(state, action.result.result.rounds),
  )
  .case(actions.createRoundAsync.done, (state, action) =>
    R.union(state, action.result.result.rounds),
  );

export default allIds;
