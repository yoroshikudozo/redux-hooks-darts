import fetchMock from 'fetch-mock';
import CONSTS from 'consts';
import { initDartsMock } from 'modules/darts/mock';

import dart1 from 'modules/darts/mock/resources/dart1';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';
import { fetchDartsByGame } from 'modules/darts/epics';

initDartsMock(fetchMock);

describe('wretch test', () => {
  describe('fetchDartsByGame', () => {
    it('returns NetworkError', () => {
      fetchDartsByGame({ gameId: '4' }).catch(err =>
        expect(err).toEqual(new Error('network error')),
      );
    });

    it('returns ParseError', () => {
      fetchDartsByGame({ gameId: '3' }).catch(err =>
        expect(err).toEqual(new Error(CONSTS.ERRORS.PARSE)),
      );
    });

    it('returns Not Found', () => {
      fetchDartsByGame({ gameId: '2' }).catch(err =>
        expect(err).toEqual(new Error(CONSTS.ERRORS['404'])),
      );
    });

    it('returns Forbidden Error', () => {
      fetchDartsByGame({ gameId: '5' }).catch(err =>
        expect(err).toEqual(new Error(CONSTS.ERRORS['403'])),
      );
    });

    it('returns Normalized Entities', async () => {
      const data = { darts: [dart1, dart2, dart3] };
      const response = await fetchDartsByGame({ gameId: '1' });
      expect(response).toEqual(data);
    });
  });
});
