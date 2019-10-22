import * as R from 'ramda';
import { schema, normalize, Schema } from 'normalizr';
import { Either, tryCatch, fold } from 'fp-ts/lib/Either';
import { identity } from 'fp-ts/lib/function';

import { Dart, FetchDartsResponse } from 'modules/darts/types';
import { NormalizedEntity, NormalizedEntities } from 'modules/common/schemas';

export const dartSchema = new schema.Entity('darts');
export const dartListSchema = [dartSchema];

export type NormalizedDart = NormalizedEntity<Dart>;
export type NormalizedDarts = NormalizedEntities<Dart>;

export const dartNormalize = (data: Dart): NormalizedEntity<Dart> =>
  normalize({ darts: data }, { darts: dartSchema });

const normalizeCurried = R.curry((schema: Schema, data: any) =>
  normalize(data, { darts: schema }),
);

export const dartNormalizePartial = normalizeCurried(dartSchema);
export const dartsNormalizePartial = normalizeCurried(dartListSchema);

export const dartNormalizePartialResult = (data: Dart) =>
  dartNormalizePartial(data);

export const dartsNormalizePartialResult = (data: FetchDartsResponse) =>
  dartsNormalizePartial(data);

export const dartsNormalize = (
  data: FetchDartsResponse,
): NormalizedEntities<Dart> => normalize(data, { darts: dartListSchema });

export const dartNormalizeEither = (
  data: Dart,
): Either<string, NormalizedEntity<Dart>> =>
  tryCatch(() => dartNormalizePartialResult(data), e => `${e}`);

export const dartsNormalizeEither = (
  data: FetchDartsResponse,
): Either<string, NormalizedDarts> =>
  tryCatch(() => dartsNormalizePartialResult(data), e => `${e}`);

export const dartsNormalize_ = fold(identity, identity);
