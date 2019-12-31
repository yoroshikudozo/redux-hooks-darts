import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ById } from 'modules/common/types';
import actions from 'modules/rules/actions';
import { Rule } from 'modules/rules/types';

const initialState: ById<Rule> = {};

const byId = reducerWithInitialState(initialState).case(
  actions.fetchRuleAsync.done,
  (state, action) => ({
    ...state,
    ...action.result.entities.rules,
  }),
);

export default byId;
