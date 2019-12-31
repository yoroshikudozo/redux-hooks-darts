import * as R from 'ramda';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

import * as actions from 'modules/users/actions';

const initialState: string[] = [];

const allIds = reducerWithInitialState(initialState)
  .case(actions.fetchUserAsync.done, (state, action) =>
    R.union(state, action.result.result.users),
  )
  .case(actions.fetchUsersAsync.done, (state, action) =>
    R.union(state, action.result.result.users),
  )
  .case(actions.fetchPlayersAsync.done, (state, action) =>
    R.union(state, action.result.result.users),
  )
  .case(actions.createUserAsync.done, (state, action) =>
    R.union(state, action.result.result.users),
  );

export default allIds;
