import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock';

import api from 'modules/middlewares/api';

import { initDartsMock } from '../mock';
import * as actions from '../actions';

import dart1 from '../mock/resources/dart1.json';
import { dartListSchema } from 'modules/darts/schema';

const middlewares = [thunk, api];
const mockStore = configureMockStore(middlewares);
initDartsMock(fetchMock);

describe('async actions', () => {
  // afterEach(() => {
  //   fetchMock.restore();
  // });

  it('returns normalized entity', async () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: 'DARTS/FETCH_STARTED',
        payload: { gameId: '1' },
        meta: {
          schema: dartListSchema,
        },
      },
      {
        type: 'DARTS/FETCH_DONE',
        payload: {
          params: { gameId: '1' },
          result: { darts: [dart1] },
        },
        meta: {
          schema: dartListSchema,
        },
      },
    ];

    return actions
      .fetchDartsByGameId(store.dispatch, { gameId: '1' })
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('returns error', async () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: 'DARTS/FETCH_STARTED',
        payload: { gameId: '2' },
        meta: {
          schema: dartListSchema,
        },
      },
      {
        type: 'DARTS/FETCH_FAILED',
        payload: {
          params: { gameId: '2' },
          error: Error('Bad kitty'),
        },
        meta: {
          schema: dartListSchema,
        },
        error: true,
      },
    ];

    return actions
      .fetchDartsByGameId(store.dispatch, { gameId: '2' })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
