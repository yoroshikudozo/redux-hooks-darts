import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock';

import api from 'modules/middlewares/api';

import { initDartsMock } from '../mock';
import * as actions from '../actions';

import dart1 from '../mock/resources/dart1.json';
import { dartListSchema } from 'modules/darts/schema';
import { sleep } from 'modules/common/testHelpers';

const middlewares = [thunk];
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
        type: 'DARTS/READ_STARTED',
        payload: { gameId: '1' },
      },
      {
        type: 'DARTS/FETCH_DONE',
        payload: {
          params: { gameId: '1' },
          result: { darts: [dart1] },
        },
      },
    ];

    await store.dispatch((actions.fetchDarts2({
      gameId: '1',
    }) as unknown) as any);

    sleep(3500).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
