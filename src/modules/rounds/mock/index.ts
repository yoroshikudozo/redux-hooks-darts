import MockAdapter from 'axios-mock-adapter';

import API from 'consts/endpoints';

import round1 from './resources/round1.json';
// import round2 from './resources/round2.json';
// import round3 from './resources/round3.json';
// import round4 from './resources/round4.json';

const endpoint = API.ROUNDS;

export function initRoundsMock(mock: MockAdapter): void {
  mock.onGet(endpoint, { gameId: '1' }).reply(200, {
    rounds: [round1],
  });

  mock.onPost(endpoint, { point: 20 }).reply(200, {
    rounds: [round1],
  });

  mock.onPut(`${endpoint}/1`, { point: 20 }).reply(200, {
    rounds: [round1],
  });

  mock.onPut(`${endpoint}`, { id: '1', point: 20 }).reply(200, {
    rounds: [round1],
  });

  mock.onDelete(`${endpoint}/1`).reply(200);
  mock.onDelete(endpoint, { id: '1' }).reply(200);
}
