import MockAdapter from 'axios-mock-adapter';

import API from 'consts/endpoints';

import rule1 from './resources/rule1';
// import rule2 from './resources/rule2.json';
// import rule3 from './resources/rule3.json';

const endpoint = `${API.ROOT}${API.RULES}`;

export function initRulesMock(mock: MockAdapter): void {
  mock.onGet(`${endpoint}/1`).reply(200, rule1);

  mock.onPut(`${endpoint}`, { id: '1', point: 20 }).reply(200, {
    rules: rule1,
  });

  mock.onDelete(`${endpoint}/1`).reply(200);
  mock.onDelete(endpoint, { id: '1' }).reply(200);
}
