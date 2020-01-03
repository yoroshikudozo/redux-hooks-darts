import { normalize, NormalizedSchema, schema } from 'normalizr';

import { Dart, DartList } from 'modules/darts/types';

type NormalizedDarts = NormalizedSchema<
  { darts: { [key: string]: Dart } },
  { darts: string[] }
>;

export const dartSchema = new schema.Entity<Dart>('darts');
export const dartListSchema = [dartSchema];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDartsList(data: any): data is DartList {
  return data.darts;
}

export const dartsNormalize = (data: Dart | DartList): NormalizedDarts =>
  isDartsList(data)
    ? normalize(data, { darts: dartListSchema })
    : normalize({ darts: [data] }, { darts: dartListSchema });
