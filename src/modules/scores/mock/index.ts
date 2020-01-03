import { FetchMockStatic } from 'fetch-mock';

import API from 'consts/endpoints';
import format from 'date-fns/format';

import { sleep } from 'modules/common/testHelpers';

import score1 from './resources/score1';
import score2 from './resources/score2';
import score3 from './resources/score3';

const endpoint = `${API.ROOT}${API.SCORES}`;

console.log(format(Date.now(), 'yyyy/MM/dd HH:mm:ss zz'));

export function initScoresMock(mock: FetchMockStatic): void {
  mock.get(
    (url, opts) => url === `${endpoint}`,
    sleep(1000).then(() => ({ scores: [score1, score2, score3] })),
  );
  mock.get(
    (url, opts) => url === `${endpoint}/1`,
    sleep(1000).then(() => ({ scores: [score1, score2, score3] })),
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
  mock.post(endpoint, score1);
}
