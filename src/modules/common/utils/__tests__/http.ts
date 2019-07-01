import fetchMock from 'fetch-mock';

import http from 'modules/common/utils/http';
import { initDartsMock } from 'modules/darts/mock';
import API from 'consts/endpoints';

initDartsMock(fetchMock);

describe('http', () => {
  it('returns correct data', async () => {
    const data = {
      darts: [
        {
          area: 'outer',
          dartType: 'single',
          date: '2019/03/21 22:47:29 GMT+09:00',
          id: '1',
          index: 0,
          inOption: true,
          isValid: true,
          playerId: '1',
          point: 20,
          roundId: '1',
          scoreId: '1',
          gameId: '1',
          value: 20,
        },
      ],
    };
    http(API.DARTS, {
      method: 'get',
      headers: { content: 'application/json' },
      body: { gameId: '1' },
    }).then(response => {
      expect(response).toEqual(data);
    });
  });
});
