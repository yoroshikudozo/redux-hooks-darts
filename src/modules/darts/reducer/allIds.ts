import * as R from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/darts/actions';

const initialState: string[] = [];

const allIds = reducerWithInitialState(initialState)
  .case(actions.fetchDartsByGameAsync.done, (state, action) =>
    R.union(state, action.result.result.darts),
  )
  .case(actions.createDartAsync.done, (state, action) =>
    R.union(state, action.result.result.darts),
  );

export default allIds;
