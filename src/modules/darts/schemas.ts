import { normalize, schema } from 'normalizr';

import { NormalizedEntities } from 'modules/common/schemas';
import { Dart, DartList } from 'modules/darts/types';

export const dartSchema = new schema.Entity<Dart>('darts');
export const dartListSchema = [dartSchema];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDartsList(data: any): data is DartList {
  return data.darts;
}

export const dartsNormalize = <R>(
  data: Dart | DartList,
): NormalizedEntities<Dart, R> =>
  isDartsList(data)
    ? normalize(data, { darts: dartListSchema })
    : normalize({ darts: [data] }, { darts: dartListSchema });
