import actionCreatorFactory from 'typescript-fsa';

import { NormalizedRules } from 'modules/rules/schemas';
import * as Types from 'modules/rules/types';

const rulesActionCreator = actionCreatorFactory('RULES');

export const fetchRuleAsync = rulesActionCreator.async<
  Types.FetchRuleParams,
  NormalizedRules,
  Error
>('FETCH');

export const fetchRuleCancel = rulesActionCreator<Types.FetchRuleParams>(
  'FETCH_CANCEL',
);

export const createRuleAsync = rulesActionCreator.async<
  Types.CreateRuleData,
  NormalizedRules,
  Error
>('CREATE');

export const createRuleCancel = rulesActionCreator<Types.CreateRuleData>(
  'CREATE_CANCEL',
);

const actions = {
  fetchRuleAsync,
  fetchRuleCancel,
  createRuleAsync,
  createRuleCancel,
};

export default actions;
