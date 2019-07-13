import { schema } from 'normalizr';
import { dartListSchema } from 'modules/darts/schema';

export const roundSchema = new schema.Entity('rounds', {
  darts: dartListSchema,
});
export const roundListSchema = [roundSchema];
