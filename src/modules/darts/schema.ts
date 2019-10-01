import { schema, NormalizedSchema, normalize } from 'normalizr';
import { Dart, FetchDartsResponse } from 'modules/darts/types';

export const dartSchema = new schema.Entity('darts');
export const dartListSchema = [dartSchema];

export type NormalizedEntity<T> = NormalizedSchema<
  { [key: string]: T },
  string
>;

export type NormalizedEntities<T> = NormalizedSchema<
  { [key: string]: T },
  string[]
>;

export type NormalizedDart = NormalizedEntity<Dart>;
export type NormalizedDarts = NormalizedEntities<Dart>;

export const dartNormalize = (data: Dart): NormalizedEntity<Dart> =>
  normalize(data, dartSchema);

export const dartsNormalize = (
  data: FetchDartsResponse,
): NormalizedEntities<Dart> => normalize(data.darts, dartListSchema);
