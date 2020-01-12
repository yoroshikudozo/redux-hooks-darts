import * as R from 'ramda';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

import * as actions from 'modules/users/actions';

const initialState: string[] = [];

const playerIds = reducerWithInitialState(initialState).case(
  actions.fetchPlayersAsync.done,
  (state, action) => R.union(state, action.result.result.users),
);

export default playerIds;
