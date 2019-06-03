import format from 'date-fns/format';
import { FetchMockStatic } from 'fetch-mock';

import API from '../../../consts/endpoints';
import { getQueryString as qs } from '../../common/mock/mock';

import dart1 from './resources/dart1.json';
import dart2 from './resources/dart2.json';
import dart3 from './resources/dart3.json';

const endpoint = API.DARTS;

console.log(format(Date.now(), 'yyyy/MM/dd HH:mm:ss OOOO'));

export function initDartsMock(mock: FetchMockStatic): void {
  mock.get(endpoint + qs({ score: 10 }), dart1);
  mock.get(endpoint + qs({ gameId: '1' }), dart1);
  mock.get(endpoint + qs({ gameId: '2' }), { status: 500, throws: new Error('Bad kitty') });
  mock.get(endpoint, [dart1, dart2, dart3]);
}
