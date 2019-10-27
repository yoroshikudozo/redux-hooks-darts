import { NormalizedSchema } from 'normalizr';

export type NormalizedEntities<T> = NormalizedSchema<
  { [key: string]: T },
  string[]
>;
