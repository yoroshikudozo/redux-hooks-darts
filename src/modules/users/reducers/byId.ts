import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ById } from 'modules/common/types';
import * as actions from 'modules/users/actions';
import { User } from 'modules/users/types';

const initialState: ById<User> = {};

const byId = reducerWithInitialState(initialState)
  .case(actions.fetchUserAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.users,
  }))
  .case(actions.fetchUsersAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.users,
  }))
  .case(actions.fetchPlayersAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.users,
  }));

export default byId;
