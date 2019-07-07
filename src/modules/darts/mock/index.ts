import MockAdapter from 'axios-mock-adapter';

import API from 'consts/endpoints';

import dart1 from './resources/dart1.json';
// import dart2 from './resources/dart2.json';
// import dart3 from './resources/dart3.json';

const endpoint = API.DARTS;

export function initDartsMock(mock: MockAdapter): void {
  mock.onGet(endpoint, { gameId: '1' }).reply(200, {
    darts: [dart1],
  });

  mock.onPost(endpoint, { point: 20 }).reply(200, {
    darts: [dart1],
  });

  mock.onPut(`${endpoint}/1`, { point: 20 }).reply(200, {
    darts: [dart1],
  });

  mock.onPut(`${endpoint}`, { id: '1', point: 20 }).reply(200, {
    darts: [dart1],
  });

  mock.onDelete(`${endpoint}/1`).reply(200);
  mock.onDelete(endpoint, { id: '1' }).reply(200);
}
