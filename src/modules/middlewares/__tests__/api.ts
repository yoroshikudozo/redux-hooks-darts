import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock';
import { initDartsMock } from 'modules/darts/mock';

import api from '../api';
import { fetchDarts } from 'modules/darts/duck';

import dart1 from 'modules/darts/mock/resources/dart1.json';
import { dartListSchema } from 'modules/darts/schema';

initDartsMock(fetchMock);

const middlewares = [thunk, api];
const mockStore = configureMockStore(middlewares);

describe('apiMiddleware', () => {
  it('returns normalized entity', async () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'DARTS/FETCH_STARTED',
        payload: { gameId: '1' },
      },
      {
        type: 'DARTS/FETCH_DONE',
        payload: {
          params: { gameId: '1' },
          result: {
            darts: [dart1],
          },
        },
      },
    ];
    await store.dispatch(fetchDarts({ gameId: '1' }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
