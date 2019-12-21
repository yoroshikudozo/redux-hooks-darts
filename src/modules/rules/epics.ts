import { combineEpics } from 'redux-observable';

import { NormalizedEntities } from 'modules/common/schemas';
import { epicFactory } from 'modules/common/utils/rx';

import { FetchRuleParams, Rule, CreateRuleData } from 'modules/rules/types';
import actions from 'modules/rules/actions';
import { rulesNormalize } from 'modules/rules/schemas';
import { fetchRuleRequest, createRuleRequest } from 'modules/rules/api';

export const fetchRuleEpic = epicFactory<
  FetchRuleParams,
  Rule,
  NormalizedEntities<Rule, { rules: string[] }>
>({
  asyncActions: actions.fetchRuleAsync,
  request: fetchRuleRequest,
  normalizer: rulesNormalize,
  cancelAction: actions.fetchRuleCancel,
});

export const createRuleEpic = epicFactory<
  CreateRuleData,
  Rule,
  NormalizedEntities<Rule, { rules: string[] }>
>({
  asyncActions: actions.createRuleAsync,
  request: createRuleRequest,
  normalizer: rulesNormalize,
  cancelAction: actions.createRuleCancel,
});

const rulesEpic = combineEpics(fetchRuleEpic, createRuleEpic);

export default rulesEpic;
