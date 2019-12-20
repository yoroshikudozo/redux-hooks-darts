import { NormalizedSchema } from 'normalizr';

export type NormalizedEntities<T, R> = NormalizedSchema<
  { [key: string]: { [key: string]: T } },
  R
>;
