import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ById } from 'modules/common/types';

import actions from 'modules/users/actions';
import { User } from 'modules/users/types';

const initialState: ById<User> = {};

const byId = reducerWithInitialState(initialState).case(
  actions.fetchUserAsync.done,
  (state, action) => ({
    ...state,
    ...action.result.entities.users,
  }),
);

export default byId;
