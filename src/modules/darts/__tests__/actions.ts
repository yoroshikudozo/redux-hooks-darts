import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions';

import dart1 from '../mock/resources/dart1.json';
import { sleep } from 'modules/common/testHelpers';
import API from 'consts/endpoints';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

mock.onGet(API.DARTS, { gameId: '1' }).reply(200, {
  darts: [dart1],
});

mock.onPost(API.DARTS, { gameId: '1' }).reply(200, {
  darts: [dart1],
});

describe('async actions', () => {
  it('returns entity', async () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: 'DARTS/READ_STARTED',
        payload: { gameId: '1' },
      },
      {
        type: 'DARTS/READ_DONE',
        payload: {
          params: { gameId: '1' },
          result: { darts: [dart1] },
        },
      },
    ];

    store.dispatch((actions.fetchDarts({
      gameId: '1',
    }) as unknown) as any);

    await sleep(100).then(() => {
      console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('returns created dart', async () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: 'DARTS/CREATE_STARTED',
        payload: { gameId: '1' },
      },
      {
        type: 'DARTS/CREATE_DONE',
        payload: {
          params: { gameId: '1' },
          result: { darts: [dart1] },
        },
      },
    ];

    store.dispatch((actions.createDart({
      gameId: '1',
    }) as unknown) as any);

    await sleep(100).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
