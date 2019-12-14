import fetchMock from 'fetch-mock';
import CONSTS from 'consts';
import { initDartsMock } from 'modules/darts/mock';

import {
  createfetchDartsByGameRequest,
  http,
} from 'modules/common/utils/cristmas';

import { dartsNormalize } from 'modules/darts/schemas';
import dart1 from 'modules/darts/mock/resources/dart1';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';

initDartsMock(fetchMock);

describe('cristmas', () => {
  describe('fetchDartsByGame', () => {
    it('returns ParseError', async () => {
      const init = createfetchDartsByGameRequest({ gameId: '3' });
      const response = await http(init, dartsNormalize);
      expect(response).toEqual(CONSTS.ERRORS.PARSE);
    });

    it('returns RequestError', async () => {
      const init = createfetchDartsByGameRequest({ gameId: '4' });
      const response = await http(init, dartsNormalize);
      expect(response).toEqual(CONSTS.ERRORS.NETWORK);
    });

    it('returns Not Found', async () => {
      const init = createfetchDartsByGameRequest({ gameId: '2' });
      const response = await http(init, dartsNormalize);
      expect(response).toEqual(CONSTS.ERRORS['404']);
    });

    it('returns Forbidden Error', async () => {
      const init = createfetchDartsByGameRequest({ gameId: '5' });
      const response = await http(init, dartsNormalize);
      expect(response).toEqual(CONSTS.ERRORS['403']);
    });

    it('returns Normalized Entities', async () => {
      const data = dartsNormalize({ darts: [dart1, dart2, dart3] });
      const init = createfetchDartsByGameRequest({ gameId: '1' });
      const response = await http(init, dartsNormalize);
      expect(response).toEqual(data);
    });
  });
});
