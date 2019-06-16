import { schema } from 'normalizr';

export const dartSchema = new schema.Entity('darts');
export const dartListSchema = [dartSchema];
