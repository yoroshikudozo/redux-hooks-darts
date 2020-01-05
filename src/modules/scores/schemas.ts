import { normalize, NormalizedSchema, schema } from 'normalizr';

import { roundListSchema } from 'modules/rounds/schemas';
import { Round } from 'modules/rounds/types';
import { Score, ScoreList } from 'modules/scores/types';

export const scoreSchema = new schema.Entity<Score>('scores', {
  rounds: roundListSchema,
});
export const scoreListSchema = [scoreSchema];

export type NormalizedScores = NormalizedSchema<
  {
    scores: { [key: string]: Score };
    rounds: { [key: string]: Round };
  },
  { scores: string[] }
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isScoresList(data: any): data is ScoreList {
  return data.scores;
}

export const scoresNormalize = (data: Score | ScoreList): NormalizedScores =>
  isScoresList(data)
    ? normalize(data, { scores: scoreListSchema })
    : normalize({ scores: [data] }, { scores: scoreListSchema });
