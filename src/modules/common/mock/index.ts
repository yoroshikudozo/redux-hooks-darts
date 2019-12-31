import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fetchMock from 'fetch-mock';

import format from 'date-fns/format';

import { initDartsMock } from 'modules/darts/mock';
// import { initRoundsMock } from 'modules/rounds/mock';
// import { initRulesMock } from 'modules/rules/mock';
import { initGamesMock } from 'modules/games/mock';
import { initUsersMock } from 'modules/users/mock';

export function init() {
  initDartsMock(fetchMock);
  initGamesMock(fetchMock);
  initUsersMock(fetchMock);
}

console.log(format(Date.now(), 'yyyy/MM/dd HH:mm:ss zz'));

export const mock = new MockAdapter(axios);

export default mock;
