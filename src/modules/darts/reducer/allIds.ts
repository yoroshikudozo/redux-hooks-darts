import R from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/darts/actions';
import { AllIds } from 'modules/common/types';

const initialState: AllIds = { result: [] };

const allIds = reducerWithInitialState(initialState).case(
  actions.fetchDartsAsync.done,
  (state, action) => ({
    result: R.union(state.result, action.result.result),
  }),
);

export default allIds;
