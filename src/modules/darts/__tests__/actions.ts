import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock';

import { initDartsMock } from 'modules/darts/mock';
import { sleep } from 'modules/common/testHelpers';

import dart1 from '../mock/resources/dart1';
import * as actions from '../actions';
import { epicMiddleware } from 'modules/store/configureStore';
import { combineEpics } from 'redux-observable';
import { fetchDartsEpic } from 'modules/darts/epics';
import { loggingEpic } from 'modules/common/utils/rx';

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const rootEpic = combineEpics(fetchDartsEpic, loggingEpic);

initDartsMock(fetchMock);

describe('async actions', () => {
  it('returns entity', async () => {
    const store = mockStore({});
    epicMiddleware.run(rootEpic);

    const expectedActions = [
      {
        type: 'DARTS/FETCH_STARTED',
        payload: { id: '1' },
      },
      {
        type: 'DARTS/FETCH_DONE',
        payload: {
          params: { id: '1' },
          result: {
            entities: {
              darts: { 1: dart1 },
            },
            result: ['1'],
          },
        },
      },
    ];

    store.dispatch(actions.fetchDarts.started({ id: '1' }));

    await sleep(100).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
