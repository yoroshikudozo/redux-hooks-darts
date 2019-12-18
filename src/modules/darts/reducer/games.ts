import * as R from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/darts/actions';

const initialState: string[] = [];

const games = reducerWithInitialState(initialState).case(
  actions.fetchDartsByGameAsync.done,
  (state, action) => {
    console.log(action.result);
    return R.union(state, action.result.result.darts);
  },
);

export default games;
