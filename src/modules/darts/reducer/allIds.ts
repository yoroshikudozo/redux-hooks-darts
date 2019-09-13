import R from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/darts/actions';
import { AllIds } from 'modules/common/types';

const initialState: AllIds = { result: [] };

const allIds = reducerWithInitialState(initialState).case(
  actions.fetchDarts.done,
  (state, action) => R.union(state.result, action.result.allIds),
);

export default allIds;
