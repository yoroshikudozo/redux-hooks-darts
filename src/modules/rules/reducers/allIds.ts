import * as R from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/rules/actions';

const initialState: string[] = [];

const allIds = reducerWithInitialState(initialState)
  .case(actions.fetchRuleAsync.done, (state, action) =>
    R.union(state, action.result.result.rules),
  )
  .case(actions.createRuleAsync.done, (state, action) =>
    R.union(state, action.result.result.rules),
  );

export default allIds;
