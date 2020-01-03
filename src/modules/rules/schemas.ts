import { normalize, NormalizedSchema, schema } from 'normalizr';

import * as Types from 'modules/rules/types';

export const ruleSchema = new schema.Entity<Types.Rule>('rules');
export const ruleListSchema = [ruleSchema];

export type NormalizedRules = NormalizedSchema<
  { rules: { [key: string]: Types.Rule } },
  { rules: string[] }
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRulesList(data: any): data is Types.RuleList {
  return data.rules;
}

export const rulesNormalize = (
  data: Types.Rule | Types.RuleList,
): NormalizedRules =>
  isRulesList(data)
    ? normalize(data, { rules: ruleListSchema })
    : normalize({ rules: [data] }, { rules: ruleListSchema });
