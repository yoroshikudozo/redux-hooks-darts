import { schema } from 'normalizr';

export const ruleSchema = new schema.Entity('rules');
export const ruleListSchema = [ruleSchema];
