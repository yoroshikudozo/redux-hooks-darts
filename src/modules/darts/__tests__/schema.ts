import { normalize } from 'normalizr';

import { dartListSchema } from '../schema';
import dart1 from '../mock/resources/dart1';
import dart2 from '../mock/resources/dart2';
import dart3 from '../mock/resources/dart3';
import { ById } from 'modules/common/types';
import { DartEntity } from 'modules/darts/types';

describe('dartListSchema', () => {
  it('returns normalized entity', async () => {
    const data = { darts: [dart1, dart2, dart3] };
    const normalizedData = normalize<DartEntity, string[]>(
      data.darts,
      dartListSchema,
    );

    expect(normalizedData).toEqual({
      entities: { darts: { '1': dart1, '2': dart2, '3': dart3 } },
      result: ['1', '2', '3'],
    });
  });
});
