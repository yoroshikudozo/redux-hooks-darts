import format from 'date-fns/format';
import { FetchMockStatic } from 'fetch-mock';

import API from 'consts/endpoints';
import { getQueryString as qs } from 'modules/common/mock/mock';

import round1 from './resources/round1.json';
import round2 from './resources/round2.json';
import round3 from './resources/round3.json';
import round4 from './resources/round4.json';

const endpoint = API.ROUNDS;

console.log(format(Date.now(), 'yyyy/MM/dd HH:mm:ss ZZ'));

export function initRoundsMock(mock: FetchMockStatic): void {
  mock.get(endpoint + qs({ score: 10 }), round1);
  mock.get(endpoint + qs({ gameId: '1' }), { rounds: [round1, round2, round3, round4] });
  mock.get(endpoint + qs({ gameId: '2' }), { status: 500, throws: new Error('Bad kitty') });
  mock.get(endpoint, [round1, round2, round3, round4]);
}
