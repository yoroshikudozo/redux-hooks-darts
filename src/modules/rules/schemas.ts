import { schema, normalize } from 'normalizr';

import { NormalizedEntities } from 'modules/common/schemas';
import * as Types from 'modules/rules/types';

export const ruleSchema = new schema.Entity<Types.Rule>('rules');
export const ruleListSchema = [ruleSchema];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRulesList(data: any): data is Types.RuleList {
  return data.rules;
}

export const rulesNormalize = <R>(
  data: Types.Rule | Types.RuleList,
): NormalizedEntities<Types.Rule, R> =>
  isRulesList(data)
    ? normalize(data, { rules: ruleListSchema })
    : normalize({ rules: [data] }, { rules: ruleListSchema });
