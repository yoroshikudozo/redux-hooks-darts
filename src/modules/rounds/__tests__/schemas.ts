import dart1 from 'modules/darts/mock/resources/dart1';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';

import round1 from '../mock/resources/round1';
import round2 from '../mock/resources/round2';
import round3 from '../mock/resources/round3';
import * as schemas from '../schemas';

describe('roundSchema', () => {
  it('returns normalized entity', async () => {
    const data = round1;
    const normalizedData = schemas.roundsNormalize(data);

    expect(normalizedData).toEqual({
      entities: {
        rounds: { '1': { ...round1, darts: ['1', '2', '3'] } },
        darts: { '1': dart1, '2': dart2, '3': dart3 },
      },
      result: { rounds: ['1'] },
    });
  });
});

describe('roundListSchema', () => {
  it('returns normalized entity', async () => {
    const data = { rounds: [round1, round2, round3] };
    const normalizedData = schemas.roundsNormalize(data);

    expect(normalizedData).toEqual({
      entities: {
        rounds: {
          '1': { ...round1, darts: ['1', '2', '3'] },
          '2': { ...round2, darts: ['1', '2'] },
          '3': { ...round3, darts: ['1', '2', '3'] },
        },
        darts: {
          '1': dart1,
          '2': dart2,
          '3': dart3,
        },
      },
      result: { rounds: ['1', '2', '3'] },
    });
  });
});
