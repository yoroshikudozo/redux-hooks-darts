import user1 from 'modules/users/mock/resources/user1';
import user2 from 'modules/users/mock/resources/user2';
import user3 from 'modules/users/mock/resources/user3';

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
        rounds: { '1': round1 },
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
          '1': round1,
          '2': round2,
          '3': round3,
        },
      },
      result: { rounds: ['1', '2', '3'] },
    });
  });
});
