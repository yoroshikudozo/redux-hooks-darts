import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ById } from 'modules/common/types';
import actions from 'modules/rounds/actions';
import { Round } from 'modules/rounds/types';

const initialState: ById<Round> = {};

const byId = reducerWithInitialState(initialState)
  .case(actions.createRoundAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.rounds,
  }))
  .case(actions.fetchRoundAsync.done, (state, action) => ({
    ...state,
    ...action.result.entities.rounds,
  }));

export default byId;
