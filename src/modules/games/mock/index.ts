import format from 'date-fns/format';
import { FetchMockStatic } from 'fetch-mock';

import API from 'consts/endpoints';
import { getQueryString as qs } from 'modules/common/utils/qs';

import game1 from './resources/game1';
import game2 from './resources/game2';
import game3 from './resources/game3';

const endpoint = API.GAMES;

console.log(format(Date.now(), 'yyyy/MM/dd HH:mm:ss zz'));

export function initGamesMock(mock: FetchMockStatic): void {
  mock.get(endpoint + qs({ score: 10 }), game1);
  mock.get(endpoint + qs({ playerId: '1' }), { games: [game1] });
  mock.get(`${endpoint}/1`, game1);
  mock.get((url, opts) => url === `${endpoint}/2`, { status: 404 });
  mock.get(
    (url, opts) => url === `${endpoint}/3`,
    '<!doctype html><head><title>500</title></head><body>internal server error 500</body></html>',
  );
  mock.get(endpoint, [game1, game2, game3]);
  mock.post(endpoint, game1);
}
