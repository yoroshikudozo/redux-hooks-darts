import { NormalizedSchema } from 'normalizr';

export type NormalizedEntities<T, R> = NormalizedSchema<
  { [key: string]: T },
  R
>;
