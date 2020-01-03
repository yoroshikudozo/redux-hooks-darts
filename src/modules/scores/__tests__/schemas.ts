import score1 from '../mock/resources/score1';
import score2 from '../mock/resources/score2';
import score3 from '../mock/resources/score3';
import * as schemas from '../schemas';

describe('schemas', () => {
  describe('scoreSchema', () => {
    it('returns normalized entity', async () => {
      const data = score1;
      const normalizedData = schemas.scoresNormalize(data);

      expect(normalizedData).toEqual({
        entities: { scores: { '1': score1 } },
        result: { scores: ['1'] },
      });
    });
  });

  describe('scoreListSchema', () => {
    it('returns normalized entity', async () => {
      const data = { scores: [score1, score2, score3] };
      const normalizedData = schemas.scoresNormalize(data);

      expect(normalizedData).toEqual({
        entities: { scores: { '1': score1, '2': score2, '3': score3 } },
        result: { scores: ['1', '2', '3'] },
      });
    });
  });
});
