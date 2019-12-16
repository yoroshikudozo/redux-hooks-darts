import { schema, normalize } from 'normalizr';

import { Dart, DartsList, NormalizedDarts } from 'modules/darts/types';

export const dartSchema = new schema.Entity('darts');
export const dartListSchema = [dartSchema];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDartsList(data: any): data is DartsList {
  return data.darts;
}

export const dartsNormalize = (data: Dart | DartsList): NormalizedDarts =>
  isDartsList(data)
    ? normalize(data, { darts: dartListSchema })
    : normalize({ darts: [data] }, { darts: dartListSchema });
