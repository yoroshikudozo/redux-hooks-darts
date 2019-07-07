import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import mock from 'modules/common/mock';
import { initDartsMock } from 'modules/darts/mock';
import { sleep } from 'modules/common/testHelpers';

import dart1 from '../mock/resources/dart1.json';
import * as actions from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

initDartsMock(mock);

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
        payload: { point: 20 },
      },
      {
        type: 'DARTS/CREATE_DONE',
        payload: {
          params: { point: 20 },
          result: { darts: [dart1] },
        },
      },
    ];

    store.dispatch((actions.createDart({
      point: 20,
    }) as unknown) as any);

    await sleep(100).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('returns updated dart', async () => {
    const store = mockStore({ rules: {} });

    const expectedActions = [
      {
        type: 'DARTS/UPDATE_STARTED',
        payload: { point: 20 },
      },
      {
        type: 'DARTS/UPDATE_DONE',
        payload: {
          params: { point: 20 },
          result: { darts: [dart1] },
        },
      },
    ];

    store.dispatch((actions.updateDart('1', {
      point: 20,
    }) as unknown) as any);

    await sleep(100).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('deletes entity', async () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: 'DARTS/DELETE_STARTED',
        payload: { id: '1' },
      },
      {
        type: 'DARTS/DELETE_DONE',
        payload: {
          params: { id: '1' },
        },
      },
    ];

    store.dispatch((actions.deleteDart({
      id: '1',
    }) as unknown) as any);

    await sleep(100).then(() => {
      console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
