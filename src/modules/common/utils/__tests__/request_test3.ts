import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MockAdapter from 'axios-mock-adapter';
import { initDartsMock } from 'modules/darts/mock';

import * as request from '../request_test3';

import dart1 from '../../../darts/mock/resources/dart1.json';

import { fold, right, isRight } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { sleep } from 'modules/common/testHelpers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export const mock = new MockAdapter(request.http);

initDartsMock(mock);

describe('test', () => {
  it('returns entity', async () => {
    const store = mockStore({});
    const params = { value: 20 };
    // await store.dispatch(request.fetchDarts(params));

    const expectedActions = [
      {
        type: 'DARTS/FETCH_STARTED',
        payload: { value: 20 },
      },
      {
        type: 'DARTS/FETCH_DONE',
        payload: {
          params: { value: 20 },
          result: { darts: [dart1] },
        },
      },
    ];

    // expect(req).toEqual({ darts: [dart1] });
    await sleep(100).then(() => {
      console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
