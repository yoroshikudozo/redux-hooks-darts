import fetchMock from 'fetch-mock';
import { initDartsMock } from '../../darts/mock';

export function init() {
  initDartsMock(fetchMock);
}
