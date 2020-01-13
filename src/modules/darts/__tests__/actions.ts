import configureMockStore from 'redux-mock-store';
import { combineEpics } from 'redux-observable';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock';

import { sleep } from 'modules/common/testHelpers';
import dartsEpic from 'modules/darts/epics';
import { initDartsMock } from 'modules/darts/mock';
import { createDart } from 'modules/darts/operations';
import { epicMiddleware } from 'modules/store/configureStore';

import ParseError from 'modules/common/errors/parseError';
import ResponseError from 'modules/common/errors/responseError';
import { loggingEpic } from 'modules/common/utils/rx';

import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';
import game1 from 'modules/games/mock/resources/game1';
import round1 from 'modules/rounds/mock/resources/round1';
import round2 from 'modules/rounds/mock/resources/round2';
import round3 from 'modules/rounds/mock/resources/round3';
import score1 from 'modules/scores/mock/resources/score1';

import actions from '../actions';
import dart1 from '../mock/resources/dart1';

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const rootEpic = combineEpics(dartsEpic, loggingEpic);

initDartsMock(fetchMock);

jest.mock('cuid', () => {
  const counter = 0;
  function id() {
    return counter + 1;
  }
  return id;
});

describe('darts epics', () => {
  describe('fetchDartsByGame epic', () => {
    it('fetches darts correctly', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);
      const expectedActions = [
        {
          type: 'DARTS/BY_GAME/FETCH_STARTED',
          payload: { gameId: '1' },
        },
        {
          type: 'DARTS/BY_GAME/FETCH_DONE',
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

      await sleep(1000).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('canceles collectly', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);
      const expectedActions = [
        {
          type: 'DARTS/BY_GAME/FETCH_STARTED',
          payload: { gameId: '1' },
        },
        {
          type: 'DARTS/BY_GAME/FETCH_CANCEL',
          payload: { gameId: '1' },
        },
      ];

      store.dispatch(actions.fetchDartsByGameAsync.started({ gameId: '1' }));
      store.dispatch(actions.fetchDartsByGameCancel({ gameId: '1' }));

      await sleep(1000).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns ResponseError', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'DARTS/BY_GAME/FETCH_STARTED',
          payload: {
            gameId: '2',
          },
        },
        {
          type: 'DARTS/BY_GAME/FETCH_FAILED',
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

      await sleep(1000).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns ParseError', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'DARTS/BY_GAME/FETCH_STARTED',
          payload: {
            gameId: '3',
          },
        },
        {
          type: 'DARTS/BY_GAME/FETCH_FAILED',
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

      await sleep(1000).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('createDart epic', () => {
    it('creates dart', async () => {
      const store = mockStore({
        entities: {
          scores: {
            byId: { 1: { ...score1, rounds: ['1', '2', '3'] } },
            allIds: ['1'],
            byGame: { '1': ['1'] },
          },
          rounds: {
            byId: {
              1: round1,
              2: round2,
              3: round3,
            },
            allIds: ['1', '2', '3'],
          },
          games: {
            byId: { 1: game1 },
            allIds: ['1'],
          },
        },
      });
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'DARTS/CREATE_STARTED',
          payload: {
            id: 1,
            value: 20,
            area: 'inner',
            isValid: false,
            point: 20,
            roundId: '3',
            dartType: 'single',
            index: 1,
          },
        },
        {
          type: 'DARTS/CREATE_DONE',
          payload: {
            params: {
              id: 1,
              value: 20,
              area: 'inner',
              isValid: false,
              point: 20,
              roundId: '3',
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

      store.dispatch<any>(
        createDart({ value: 20, area: 'inner', type: 'single' }),
      );

      await sleep(1000).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });
  });
});
