import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { combineEpics } from 'redux-observable';

import fetchMock from 'fetch-mock';

import { initGamesMock } from 'modules/games/mock';
import { sleep } from 'modules/common/testHelpers';

import game1 from '../mock/resources/game1';
import actions from '../actions';
import { epicMiddleware } from 'modules/store/configureStore';
import gamesEpic from 'modules/games/epics';
import { loggingEpic } from 'modules/common/utils/rx';
import ParseError from 'modules/common/errors/parseError';
import ResponseError from 'modules/common/errors/responseError';
import user1 from 'modules/users/mock/resources/user1';

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const rootEpic = combineEpics(gamesEpic, loggingEpic);

initGamesMock(fetchMock);

describe('games epics', () => {
  describe('fetchGame epic', () => {
    it('fetches game correctly', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);
      const expectedActions = [
        {
          type: 'GAMES/FETCH_STARTED',
          payload: { id: '1' },
        },
        {
          type: 'GAMES/FETCH_DONE',
          payload: {
            result: {
              entities: {
                games: { 1: { ...game1, players: ['1'] } },
                players: { 1: user1 },
              },
              result: { games: ['1'] },
            },
            params: { id: '1' },
          },
        },
      ];

      store.dispatch(actions.fetchGameAsync.started({ id: '1' }));

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns ResponseError', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'GAMES/FETCH_STARTED',
          payload: {
            id: '2',
          },
        },
        {
          type: 'GAMES/FETCH_FAILED',
          error: true,
          payload: {
            params: {
              id: '2',
            },
            error: new ResponseError(({
              url: 'asdf',
              status: 404,
              statusText: 'not found',
            } as unknown) as Response),
          },
        },
      ];

      store.dispatch<any>(actions.fetchGameAsync.started({ id: '2' }));

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns ParseError', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'GAMES/FETCH_STARTED',
          payload: {
            id: '3',
          },
        },
        {
          type: 'GAMES/FETCH_FAILED',
          error: true,
          payload: {
            params: {
              id: '3',
            },
            error: new ParseError(new Error()),
          },
        },
      ];

      store.dispatch<any>(actions.fetchGameAsync.started({ id: '3' }));

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('canceles collectly', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);
      const expectedActions = [
        {
          type: 'GAMES/FETCH_STARTED',
          payload: { id: '1' },
        },
        {
          type: 'GAMES/FETCH_CANCEL',
          payload: { id: '1' },
        },
      ];

      store.dispatch(actions.fetchGameAsync.started({ id: '1' }));
      store.dispatch(actions.fetchGameCancel({ id: '1' }));

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetchGames epic', () => {
    it('fetches games correctly', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);
      const expectedActions = [
        {
          type: 'GAMES/FETCH_STARTED',
          payload: { id: '1' },
        },
        {
          type: 'GAMES/FETCH_DONE',
          payload: {
            result: {
              entities: {
                games: { 1: { ...game1, players: ['1'] } },
                players: { 1: user1 },
              },
              result: { games: ['1'] },
            },
            params: { id: '1' },
          },
        },
      ];

      store.dispatch(actions.fetchGameAsync.started({ id: '1' }));

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns ResponseError', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'GAMES/FETCH_STARTED',
          payload: {
            id: '2',
          },
        },
        {
          type: 'GAMES/FETCH_FAILED',
          error: true,
          payload: {
            params: {
              id: '2',
            },
            error: new ResponseError(({
              url: 'asdf',
              status: 404,
              statusText: 'not found',
            } as unknown) as Response),
          },
        },
      ];

      store.dispatch<any>(actions.fetchGameAsync.started({ id: '2' }));

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns ParseError', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'GAMES/FETCH_STARTED',
          payload: {
            id: '3',
          },
        },
        {
          type: 'GAMES/FETCH_FAILED',
          error: true,
          payload: {
            params: {
              id: '3',
            },
            error: new ParseError(new Error()),
          },
        },
      ];

      store.dispatch<any>(actions.fetchGameAsync.started({ id: '3' }));

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('canceles collectly', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);
      const expectedActions = [
        {
          type: 'GAMES/FETCH_STARTED',
          payload: { id: '1' },
        },
        {
          type: 'GAMES/FETCH_CANCEL',
          payload: { id: '1' },
        },
      ];

      store.dispatch(actions.fetchGameAsync.started({ id: '1' }));
      store.dispatch(actions.fetchGameCancel({ id: '1' }));

      await sleep(100).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('createGame epic', () => {
    it('creates dart', async () => {
      const store = mockStore({});
      epicMiddleware.run(rootEpic);

      const expectedActions = [
        {
          type: 'GAMES/CREATE_STARTED',
          payload: {
            id: 'cuid, so it is not able to testing',
            value: 20,
            area: 'inner',
            dartType: 'single',
            index: 1,
          },
        },
        {
          type: 'GAMES/CREATE_DONE',
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
                games: { 1: { ...game1, players: ['1'] } },
                players: { 1: user1 },
              },
              result: { games: ['1'] },
            },
          },
        },
      ];

      store.dispatch<any>(actions.createGame('countUp'));

      await sleep(100).then(() => {
        const actions = store.getActions();
        expect(actions[1].payload.result).toEqual(
          expectedActions[1].payload.result,
        );
      });
    });
  });
});
