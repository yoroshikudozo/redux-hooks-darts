import { normalize } from 'normalizr';

import { dartListSchema } from '../schema';
import dart1 from '../mock/resources/dart1.json';
import dart2 from '../mock/resources/dart2.json';
import dart3 from '../mock/resources/dart3.json';

describe('dartListSchema', () => {
  it('returns normalized entity', async () => {
    const data = { darts: [dart1, dart2, dart3] };
    const normalizedData = normalize(data.darts, dartListSchema);

    expect(normalizedData).toEqual({
      entities: { darts: { '1': dart1, '2': dart2, '3': dart3 } },
      result: ['1', '2', '3'],
    });
  });
});
