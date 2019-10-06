import { schema, NormalizedSchema, normalize } from 'normalizr';
import { Dart, FetchDartsResponse } from 'modules/darts/types';
import { Either, tryCatch } from 'fp-ts/lib/Either';

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

// export const dartsNormalize_ = (data: FetchDartsResponse) =>
//   tryCatch(
//     () => dartsNormalize(data),
//     e => {
//       console.log(e);
//       // throw new NormalizeError(e);
//     },
//   );

// export const dartsNormalize = (data: Dart) => dartsNormalizeEither(data);
