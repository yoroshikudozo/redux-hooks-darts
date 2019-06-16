import fetchMock from 'fetch-mock';
import { initDartsMock } from 'modules/darts/mock';
import { initRoundsMock } from 'modules/rounds/mock';

export function init() {
  initDartsMock(fetchMock);
  initRoundsMock(fetchMock);
}
