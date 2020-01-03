import { combineEpics } from 'redux-observable';

import actions from 'modules/rules/actions';
import { createRuleRequest, fetchRuleRequest } from 'modules/rules/api';
import { NormalizedRules, rulesNormalize } from 'modules/rules/schemas';
import { CreateRuleData, FetchRuleParams, Rule } from 'modules/rules/types';

import { epicFactory } from 'modules/common/utils/rx';

export const fetchRuleEpic = epicFactory<
  FetchRuleParams,
  Rule,
  NormalizedRules
>({
  asyncActions: actions.fetchRuleAsync,
  request: fetchRuleRequest,
  normalizer: rulesNormalize,
  cancelAction: actions.fetchRuleCancel,
});

export const createRuleEpic = epicFactory<
  CreateRuleData,
  Rule,
  NormalizedRules
>({
  asyncActions: actions.createRuleAsync,
  request: createRuleRequest,
  normalizer: rulesNormalize,
  cancelAction: actions.createRuleCancel,
});

const rulesEpic = combineEpics(fetchRuleEpic, createRuleEpic);

export default rulesEpic;
