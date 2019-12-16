import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { combineEpics } from 'redux-observable';

import fetchMock from 'fetch-mock';

import { initDartsMock } from 'modules/darts/mock';
import { sleep } from 'modules/common/testHelpers';

import dart1 from '../mock/resources/dart1';
import actions from '../actions';
import { epicMiddleware } from 'modules/store/configureStore';
import dartsEpic from 'modules/darts/epics';
import { loggingEpic } from 'modules/common/utils/rx';
import ParseError from 'modules/common/errors/parseError';
import ResponseError from 'modules/common/errors/responseError';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const rootEpic = combineEpics(dartsEpic, loggingEpic);

initDartsMock(fetchMock);

describe('darts epics', () => {
  describe('fetchDartsByGame epic', () => {
    it('fetches darts correctly', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);
      const expectedActions = [
        {
          type: 'DARTS/LIST/FETCH_STARTED',
          payload: { gameId: '1' },
        },
        {
          type: 'DARTS/LIST/FETCH_DONE',
          payload: {
            params: { gameId: '1' },
            result: {
              entities: {
                darts: { 1: dart1, 2: dart2, 3: dart3 },
              },
              result: {
                darts: ['1', '2', '3'],
              },
            },
          },
        },
      ];

      store.dispatch(actions.fetchDartsByGameAsync.started({ gameId: '1' }));

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('canceles collectly', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);
      const expectedActions = [
        {
          type: 'DARTS/LIST/FETCH_STARTED',
          payload: { gameId: '1' },
        },
        {
          type: 'DARTS/LIST/FETCH_CANCEL',
          payload: { gameId: '1' },
        },
      ];

      store.dispatch(actions.fetchDartsByGameAsync.started({ gameId: '1' }));
      store.dispatch(actions.fetchDartsByGameCancel({ gameId: '1' }));

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns ResponseError', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'DARTS/LIST/FETCH_STARTED',
          payload: {
            gameId: '2',
          },
        },
        {
          type: 'DARTS/LIST/FETCH_FAILED',
          error: true,
          payload: {
            params: {
              gameId: '2',
            },
            error: new ResponseError(({
              url: 'asdf',
              status: 404,
              statusText: 'not found',
            } as unknown) as Response),
          },
        },
      ];

      store.dispatch<any>(
        actions.fetchDartsByGameAsync.started({ gameId: '2' }),
      );

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns ParseError', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'DARTS/LIST/FETCH_STARTED',
          payload: {
            gameId: '3',
          },
        },
        {
          type: 'DARTS/LIST/FETCH_FAILED',
          error: true,
          payload: {
            params: {
              gameId: '3',
            },
            error: new ParseError(new Error()),
          },
        },
      ];

      store.dispatch<any>(
        actions.fetchDartsByGameAsync.started({ gameId: '3' }),
      );

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('createDart epic', () => {
    it('creates dart', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'DARTS/CREATE_STARTED',
          payload: {
            id: 'cuid, so it is not able to testing',
            value: 20,
            area: 'inner',
            dartType: 'single',
            index: 1,
          },
        },
        {
          type: 'DARTS/CREATE_DONE',
          payload: {
            params: {
              id: 'cuid, so it is not able to testing',
              value: 20,
              area: 'inner',
              dartType: 'single',
              index: 1,
            },
            result: {
              entities: {
                darts: { 1: dart1 },
              },
              result: {
                darts: ['1'],
              },
            },
          },
        },
      ];

      store.dispatch<any>(actions.createDart(20));

      await sleep(100).then(() => {
        const actions = store.getActions();
        expect(actions[0].payload.value).toEqual(
          expectedActions[0].payload.value,
        );
        expect(actions[0].payload.area).toEqual(
          expectedActions[0].payload.area,
        );
        expect(actions[0].payload.dartType).toEqual(
          expectedActions[0].payload.dartType,
        );
        expect(actions[0].payload.index).toEqual(
          expectedActions[0].payload.index,
        );
        expect(actions[1].payload.result).toEqual(
          expectedActions[1].payload.result,
        );
      });
    });
  });
});
