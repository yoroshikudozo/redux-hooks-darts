import { schema, normalize } from 'normalizr';

import { Dart, FetchDartsResponse } from 'modules/darts/types';
import { NormalizedEntities } from 'modules/common/schemas';

export const dartSchema = new schema.Entity('darts');
export const dartListSchema = [dartSchema];

export type NormalizedDarts = NormalizedEntities<Dart>;

export const dartNormalize = (data: Dart): NormalizedDarts =>
  normalize({ darts: [data] }, { darts: dartListSchema });

export const dartsNormalize = (data: FetchDartsResponse): NormalizedDarts =>
  normalize(data, { darts: dartListSchema });
