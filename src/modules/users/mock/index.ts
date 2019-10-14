import { FetchMockStatic } from 'fetch-mock';

import API from 'consts/endpoints';
import { getQueryString as qs } from 'modules/common/utils/qs';

import user1 from './resources/user1';
import user2 from './resources/user2';
import user3 from './resources/user3';

const endpoint = API.USERS;

export function initUsersMock(mock: FetchMockStatic): void {
  mock.get(endpoint + qs({ score: 10 }), user1);
  mock.get(endpoint + qs({ gameId: '1' }), { users: [user1] });
  mock.get(`${endpoint}/1`, { users: [user1] });
  mock.get(endpoint + qs({ gameId: '2' }), {
    status: 500,
    throws: new Error('Bad kitty'),
  });
  mock.get(endpoint, { users: [user1, user2, user3] });
  mock.get((url, opts) => url === `${endpoint}/2`, { status: 404 });
  mock.get(
    (url, opts) => url === `${endpoint}/3`,
    '<!doctype html><head><title>500</title></head><body>internal server error 500</body></html>',
  );
  mock.post(endpoint, user1);
}
