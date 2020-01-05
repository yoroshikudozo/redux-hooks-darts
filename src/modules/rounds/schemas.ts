import { normalize, NormalizedSchema, schema } from 'normalizr';

import {
  CreateRoundData,
  Round,
  RoundEntity,
  RoundEntityList,
} from 'modules/rounds/types';
import { scoreListSchema } from 'modules/scores/schemas';
import { Score } from 'modules/scores/types';
import { playerListSchema } from 'modules/users/schemas';
import { User } from 'modules/users/types';

export const gameSchema = new schema.Entity('rounds', {
  players: playerListSchema,
  scores: scoreListSchema,
});

const createRoundDataSchema = new schema.Entity('rounds', {
  scores: scoreListSchema,
});

export const gameListSchema = new schema.Array(gameSchema);

export type NormalizedRounds = NormalizedSchema<
  {
    rounds: { [key: string]: Round };
    scores: { [key: string]: Score };
    players: { [key: string]: User };
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
    ? normalize(data, { rounds: gameListSchema })
    : normalize({ rounds: [data] }, { rounds: gameListSchema });

export const createRoundDataNormalize = <R>(
  data: CreateRoundData,
): NormalizedRounds =>
  normalize({ rounds: [data] }, { rounds: [createRoundDataSchema] });
