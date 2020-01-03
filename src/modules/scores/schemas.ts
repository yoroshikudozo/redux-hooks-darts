import { normalize, schema } from 'normalizr';

import { NormalizedEntities } from 'modules/common/schemas';
import { Score, ScoreList } from 'modules/scores/types';

export const scoreSchema = new schema.Entity<Score>('scores');
export const scoreListSchema = [scoreSchema];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isScoresList(data: any): data is ScoreList {
  return data.scores;
}

export const scoresNormalize = <R>(
  data: Score | ScoreList,
): NormalizedEntities<Score, R> =>
  isScoresList(data)
    ? normalize(data, { scores: scoreListSchema })
    : normalize({ scores: [data] }, { scores: scoreListSchema });
