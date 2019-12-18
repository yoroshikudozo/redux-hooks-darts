import { schema, normalize } from 'normalizr';

import { Dart, DartsList } from 'modules/darts/types';
import { NormalizedEntities } from 'modules/common/schemas';

export const dartSchema = new schema.Entity<Dart>('darts');
export const dartListSchema = [dartSchema];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDartsList(data: any): data is DartsList {
  return data.darts;
}

export const dartsNormalize = <R>(
  data: Dart | DartsList,
): NormalizedEntities<Dart, R> =>
  isDartsList(data)
    ? normalize(data, { darts: dartListSchema })
    : normalize({ darts: [data] }, { darts: dartListSchema });
