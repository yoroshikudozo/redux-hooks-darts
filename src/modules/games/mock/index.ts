import { FetchMockStatic } from 'fetch-mock';

import API from 'consts/endpoints';
import format from 'date-fns/format';

import { sleep } from 'modules/common/testHelpers';

import game1 from './resources/game1';
import game2 from './resources/game2';
import game3 from './resources/game3';

const endpoint = `${API.ROOT}${API.GAMES}`;

console.log(format(Date.now(), 'yyyy/MM/dd HH:mm:ss zz'));

export function initGamesMock(mock: FetchMockStatic): void {
  mock.get(
    (url, opts) => url === `${endpoint}/1`,
    sleep(1000).then(() => ({ games: [game1, game2, game3] })),
  );
  mock.get(
    (url, opts) => url === `${endpoint}`,
    sleep(1000).then(() => ({ games: [game1, game2, game3] })),
  );
  mock.get(
    (url, opts) => url === `${endpoint}/2`,
    sleep(1000).then(() => ({
      status: 404,
      body: {},
    })),
  );
  mock.get(
    (url, opts) => url === `${endpoint}/3`,
    sleep(1000).then(
      () =>
        '<!doctype html><head><title>500</title></head><body>internal server error 500</body></html>',
    ),
  );
  mock.get(
    (url, opts) => url === `${endpoint}/4`,
    sleep(1000).then(() => ({
      throws: new Error('network error'),
    })),
  );
  mock.get(
    (url, opts) => url === `${endpoint}/5`,
    sleep(1000).then(() => ({
      status: 403,
      body: {},
    })),
  );

  let options: {};
  mock.post(
    (url, opts) => {
      console.log(opts.body);
      options = opts.body as any;
      return url === `${endpoint}`;
    },
    sleep(1000).then(() => ({
      body: {
        ...options,
      },
    })),
  );
}
