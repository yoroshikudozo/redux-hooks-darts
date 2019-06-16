import { normalize } from 'normalizr';

import { roundListSchema } from '../schema';
import round1 from '../mock/resources/round1.json';
import round2 from '../mock/resources/round2.json';
import round3 from '../mock/resources/round3.json';
import round4 from '../mock/resources/round4.json';

describe('roundListSchema', () => {
  it('returns normalized entity', async () => {
    const data = { rounds: [round1, round2, round3, round4] };
    const normalizedData = normalize(data.rounds, roundListSchema);

    expect(normalizedData).toEqual({
      entities: {
        rounds: {
          round1: round1,
          round2: round2,
          round3: round3,
          round4: round4,
        },
      },
      result: ['round1', 'round2', 'round3', 'round4'],
    });
  });
});
