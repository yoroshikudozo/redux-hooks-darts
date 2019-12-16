import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/darts/actions';

const initialState: any = { result: {} };

const allIds = reducerWithInitialState(initialState).case(
  actions.fetchDartsByGameAsync.done,
  (state, action) => ({
    result: {
      ...state.result,
      ...action.result.result,
    },
  }),
);

export default allIds;
