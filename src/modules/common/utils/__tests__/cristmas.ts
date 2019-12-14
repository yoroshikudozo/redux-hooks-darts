import fetchMock from 'fetch-mock';
import CONSTS from 'consts';
import { http } from 'modules/common/utils/cristmas';
import { initDartsMock } from 'modules/darts/mock';
import { createfetchDartsByGameInit } from 'modules/darts/epics';
import dart1 from 'modules/darts/mock/resources/dart1';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';

initDartsMock(fetchMock);

const httpClient = http(fetch);

describe('cristmas', () => {
  describe('fetchDartsByGame', () => {
    it('returns ParseError', async () => {
      const init = createfetchDartsByGameInit({ gameId: '3' });
      const response = await httpClient(init);
      expect(response).toEqual(CONSTS.ERRORS.PARSE);
    });

    it('returns RequestError', async () => {
      const init = createfetchDartsByGameInit({ gameId: '4' });
      const response = await httpClient(init);
      expect(response).toEqual(CONSTS.ERRORS.NETWORK);
    });

    it('returns Not Found', async () => {
      const init = createfetchDartsByGameInit({ gameId: '2' });
      const response = await httpClient(init);
      expect(response).toEqual(CONSTS.ERRORS['404']);
    });

    it('returns Forbidden Error', async () => {
      const init = createfetchDartsByGameInit({ gameId: '5' });
      const response = await httpClient(init);
      expect(response).toEqual(CONSTS.ERRORS['403']);
    });

    it('returns Normalized Entities', async () => {
      const data = { darts: [dart1, dart2, dart3] };
      const init = createfetchDartsByGameInit({ gameId: '1' });
      const response = await httpClient(init);
      expect(response).toEqual(data);
    });
  });
});
