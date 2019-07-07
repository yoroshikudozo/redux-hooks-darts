import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import format from 'date-fns/format';

import { initDartsMock } from 'modules/darts/mock';
import { initRoundsMock } from 'modules/rounds/mock';
import { initRulesMock } from 'modules/rules/mock';

console.log(format(Date.now(), 'yyyy/MM/dd HH:mm:ss zz'));

export const mock = new MockAdapter(axios);

export function init() {
  initDartsMock(mock);
  initRoundsMock(mock);
  initRulesMock(mock);
}

export default mock;
