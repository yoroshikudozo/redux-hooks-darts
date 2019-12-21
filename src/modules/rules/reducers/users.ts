import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from 'modules/rules/actions';

const initialState: { [key: string]: string[] } = {};

const users = reducerWithInitialState(initialState)
  .case(actions.fetchRuleAsync.done, (state, action) => ({
    ...state,
    [action.params.id]: action.result.result.rules,
  }))
  .case(actions.createRuleAsync.done, (state, action) => ({
    ...state,
    [action.params.id]: action.result.result.rules,
  }));

export default users;
