import * as schemas from '../schemas';
import dart1 from '../mock/resources/dart1';
import dart2 from '../mock/resources/dart2';
import dart3 from '../mock/resources/dart3';

describe('schemas', () => {
  describe('dartSchema', () => {
    it('returns normalized entity', async () => {
      const data = dart1;
      const normalizedData = schemas.dartsNormalize(data);

      expect(normalizedData).toEqual({
        entities: { darts: { '1': dart1 } },
        result: { darts: ['1'] },
      });
    });
  });

  describe('dartListSchema', () => {
    it('returns normalized entity', async () => {
      const data = { darts: [dart1, dart2, dart3] };
      const normalizedData = schemas.dartsNormalize(data);

      expect(normalizedData).toEqual({
        entities: { darts: { '1': dart1, '2': dart2, '3': dart3 } },
        result: { darts: ['1', '2', '3'] },
      });
    });
  });
});
