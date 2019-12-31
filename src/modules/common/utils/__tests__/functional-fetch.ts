import fetchMock from 'fetch-mock';

import CONSTS from 'consts';

import { initDartsMock } from 'modules/darts/mock';
import { FetchDartsByGameParams } from 'modules/darts/types';

import { http } from 'modules/common/utils/functional-fetch';

import dart1 from 'modules/darts/mock/resources/dart1';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';

initDartsMock(fetchMock);

const httpClient = http(fetch);

const makeFetchDartsByGameInput = ({
  gameId,
}: FetchDartsByGameParams): RequestInfo =>
  `${CONSTS.API.ROOT}${CONSTS.API.DARTS}/games/${gameId}`;

describe('functional-fetch', () => {
  describe('fetchDartsByGame', () => {
    it('returns ParseError', async () => {
      const input = makeFetchDartsByGameInput({ gameId: '3' });
      const response = await httpClient(input);
      expect(response).toEqual(CONSTS.ERRORS.PARSE);
    });

    it('returns RequestError', async () => {
      const input = makeFetchDartsByGameInput({ gameId: '4' });
      const response = await httpClient(input);
      expect(response).toEqual(CONSTS.ERRORS.NETWORK);
    });

    it('returns Not Found', async () => {
      const input = makeFetchDartsByGameInput({ gameId: '2' });
      const response = await httpClient(input);
      expect(response).toEqual(CONSTS.ERRORS['404']);
    });

    it('returns Forbidden Error', async () => {
      const input = makeFetchDartsByGameInput({ gameId: '5' });
      const response = await httpClient(input);
      expect(response).toEqual(CONSTS.ERRORS['403']);
    });

    it('returns Normalized Entities', async () => {
      const data = { darts: [dart1, dart2, dart3] };
      const input = makeFetchDartsByGameInput({ gameId: '1' });
      const response = await httpClient(input);
      expect(response).toEqual(data);
    });
  });
});
