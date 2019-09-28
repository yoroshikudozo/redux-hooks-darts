import format from 'date-fns/format';
import { FetchMockStatic } from 'fetch-mock';

import API from 'consts/endpoints';
import { getQueryString as qs } from 'modules/common/utils/qs';

import dart1 from './resources/dart1';
import dart2 from './resources/dart2';
import dart3 from './resources/dart3';

const endpoint = API.DARTS;

console.log(format(Date.now(), 'yyyy/MM/dd HH:mm:ss zz'));

export function initDartsMock(mock: FetchMockStatic): void {
  mock.get(endpoint + qs({ score: 10 }), dart1);
  mock.get(endpoint + qs({ gameId: '1' }), { darts: [dart1] });
  mock.get(`${endpoint}/1`, { darts: [dart1] });
  mock.get(endpoint + qs({ gameId: '2' }), {
    status: 500,
    throws: new Error('Bad kitty'),
  });
  mock.get(endpoint, [dart1, dart2, dart3]);
  mock.get((url, opts) => url === `${endpoint}/2`, { status: 404 });
  mock.post(endpoint, dart1);
}
