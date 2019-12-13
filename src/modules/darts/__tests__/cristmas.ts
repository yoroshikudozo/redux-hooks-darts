import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { combineEpics } from 'redux-observable';

import fetchMock from 'fetch-mock';

import { initDartsMock } from 'modules/darts/mock';

import dart1 from '../mock/resources/dart1';
import actions from '../actions';
import { epicMiddleware } from 'modules/store/configureStore';
import dartsEpic from 'modules/darts/epics';
import { loggingEpic } from 'modules/common/utils/rx';
import ParseError from 'modules/common/errors/parseError';
import ResponseError from 'modules/common/errors/responseError';
import {
  createfetchDartsByGameRequest,
  createRequestTE,
  createRequest,
} from 'modules/common/utils/cristmas';
import API from 'consts/endpoints';
import { left } from 'fp-ts/lib/Either';
import { dartsNormalize } from 'modules/darts/schemas';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const rootEpic = combineEpics(dartsEpic, loggingEpic);

initDartsMock(fetchMock);

describe('cristmas', () => {
  describe('fetchDartsByGame', () => {
    it('returns ParseError', async () => {
      const request = createfetchDartsByGameRequest({ gameId: '3' });
      const response = await createRequest(
        createRequestTE(request),
        dartsNormalize,
      );
      expect(response).toEqual('不正なJSONです。');
    });

    it('returns RequestError', async () => {
      const message =
        'ネットワークエラーです。しばらくしてから再度お試しください。';
      const request = createfetchDartsByGameRequest({ gameId: '4' });
      const response = await createRequest(
        createRequestTE(request),
        dartsNormalize,
      );
      expect(response).toEqual(message);
    });

    it('returns Not Found', async () => {
      const request = createfetchDartsByGameRequest({ gameId: '2' });
      const response = await createRequest(
        createRequestTE(request),
        dartsNormalize,
      );
      expect(response).toEqual('データが見つかりませんでした。');
    });

    it('returns Normalized Entities', async () => {
      const data = dartsNormalize({ darts: [dart1, dart2, dart3] });
      const request = createfetchDartsByGameRequest({ gameId: '1' });
      const response = await createRequest(
        createRequestTE(request),
        dartsNormalize,
      );
      expect(response).toEqual(data);
    });
  });
});
