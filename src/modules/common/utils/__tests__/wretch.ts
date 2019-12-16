import fetchMock from 'fetch-mock';
import CONSTS from 'consts';
import { dartsRequest } from 'modules/common/utils/wretch';
import { initDartsMock } from 'modules/darts/mock';

import dart1 from 'modules/darts/mock/resources/dart1';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';

initDartsMock(fetchMock);

describe('wretch test', () => {
  describe('fetchDartsByGame', () => {
    it('returns NetworkError', async () => {
      const response = await dartsRequest({ gameId: '4' });
      expect(response).toEqual('network error');
    });

    it('returns ParseError', async () => {
      const response = await dartsRequest({ gameId: '3' });
      expect(response).toEqual(CONSTS.ERRORS.PARSE);
    });

    it('returns Not Found', async () => {
      const response = await dartsRequest({ gameId: '2' });
      expect(response).toEqual(CONSTS.ERRORS['404']);
    });

    it('returns Forbidden Error', async () => {
      const response = await dartsRequest({ gameId: '5' });
      expect(response).toEqual(CONSTS.ERRORS['403']);
    });

    it('returns Normalized Entities', async () => {
      const data = { darts: [dart1, dart2, dart3] };
      const response = await dartsRequest({ gameId: '1' });
      expect(response).toEqual(data);
    });
  });
});
