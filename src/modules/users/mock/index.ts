import { FetchMockStatic } from 'fetch-mock';

import API from 'consts/endpoints';
import { sleep } from 'modules/common/testHelpers';

import user1 from './resources/user1';
import user2 from './resources/user2';
import user3 from './resources/user3';

const endpoint = `${API.ROOT}${API.USERS}`;

export function initUsersMock(mock: FetchMockStatic): void {
  mock.get(
    (url, opts) => url === `${endpoint}/1`,
    sleep(1000).then(() => user1),
  );
  mock.get(
    (url, opts) => url === endpoint,
    sleep(1000).then(() => ({ users: [user1, user2, user3] })),
  );
  mock.get(
    (url, opts) => url === `${endpoint}/2`,
    sleep(1000).then(() => ({ status: 404 })),
  );
  mock.get(
    (url, opts) => url === `${endpoint}/3`,
    sleep(1000).then(
      () =>
        '<!doctype html><head><title>500</title></head><body>internal server error 500</body></html>',
    ),
  );
  mock.post(
    (url, opts) => url === endpoint,
    sleep(1000).then(() => user1),
  );
}
