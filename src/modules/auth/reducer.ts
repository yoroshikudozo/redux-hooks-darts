import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/darts/actions';

const initialState = { isAuthenticated: false };

const authReducer = reducerWithInitialState(initialState).case(
  actions.fetchDartsByGameAsync.done,
  (state, action) => ({
    isAuthenticated: state.isAuthenticated,
  }),
);

export default authReducer;
