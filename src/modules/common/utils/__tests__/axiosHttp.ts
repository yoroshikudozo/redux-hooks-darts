import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import dart1 from '../../../darts/mock/resources/dart1.json';
import { DartsResponse } from 'modules/darts/types';
import http, { createApi } from 'modules/common/utils/axiosHttp';

describe('http', () => {
  const mock = new MockAdapter(axios, { delayResponse: 1000 });

  mock.onGet('/darts', { gameId: '1' }).reply(200, {
    darts: [dart1],
  });

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

    await axios('/darts', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      data: { gameId: '1' },
    })
      .then(response => {
        console.log(response.data);
        expect(response.data).toEqual(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  it('canceled', async () => {
    try {
      const a = createApi(axios)('get');
      const b = a('/darts', { gameId: '1' });
      await b.cancel('test');
      console.log(b);
    } catch (err) {
      console.log(err);
    }
  });
});
