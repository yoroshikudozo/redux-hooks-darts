import fetchMock from 'fetch-mock';
import { initDartsMock } from 'modules/darts/mock';

import {
  createfetchDartsByGameRequest,
  http,
} from 'modules/common/utils/cristmas';
import { dartsNormalize } from 'modules/darts/schemas';
import dart1 from '../mock/resources/dart1';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';

initDartsMock(fetchMock);

describe('cristmas', () => {
  describe('fetchDartsByGame', () => {
    it('returns ParseError', async () => {
      const init = createfetchDartsByGameRequest({ gameId: '3' });
      const response = await http(init, dartsNormalize);
      expect(response).toEqual('不正なJSONです。');
    });

    it('returns RequestError', async () => {
      const message =
        'ネットワークエラーです。しばらくしてから再度お試しください。';
      const init = createfetchDartsByGameRequest({ gameId: '4' });
      const response = await http(init, dartsNormalize);
      expect(response).toEqual(message);
    });

    it('returns Not Found', async () => {
      const init = createfetchDartsByGameRequest({ gameId: '2' });
      const response = await http(init, dartsNormalize);
      expect(response).toEqual('データが見つかりませんでした。');
    });

    it('returns Normalized Entities', async () => {
      const data = dartsNormalize({ darts: [dart1, dart2, dart3] });
      const init = createfetchDartsByGameRequest({ gameId: '1' });
      const response = await http(init, dartsNormalize);
      expect(response).toEqual(data);
    });
  });
});
