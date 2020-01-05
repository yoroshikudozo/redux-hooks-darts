import { normalize, NormalizedSchema, schema } from 'normalizr';

import { dartListSchema } from 'modules/darts/schemas';
import { Dart } from 'modules/darts/types';
import { Round, RoundEntity, RoundEntityList } from 'modules/rounds/types';

export const roundSchema = new schema.Entity('rounds', {
  darts: dartListSchema,
});

export const roundListSchema = new schema.Array(roundSchema);

export type NormalizedRounds = NormalizedSchema<
  {
    rounds: { [key: string]: Round };
    darts: { [key: string]: Dart };
  },
  { rounds: string[] }
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRoundsList(data: any): data is RoundEntityList {
  return data.rounds;
}

export const roundsNormalize = (
  data: RoundEntity | RoundEntityList,
): NormalizedRounds =>
  isRoundsList(data)
    ? normalize(data, { rounds: roundListSchema })
    : normalize({ rounds: [data] }, { rounds: roundListSchema });
