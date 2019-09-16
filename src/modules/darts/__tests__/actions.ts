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

const middlewares = [thunk, epicMiddleware];
const mockStore = configureMockStore(middlewares);
const rootEpic = combineEpics(dartsEpic, loggingEpic);

initDartsMock(fetchMock);

describe('darts epics', () => {
  it('fetch darts', async () => {
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

    store.dispatch(actions.fetchDartsASync.started({ id: '1' }));

    await sleep(100).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates dart', async () => {
    const store = mockStore({});
    epicMiddleware.run(rootEpic);

    const expectedActions = [
      {
        type: 'DARTS/CREATE',
        payload: { value: 20 },
      },
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
            result: '1',
          },
        },
      },
    ];

    store.dispatch(actions.createDart({ value: 20 }));

    await sleep(100).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      expect(actions[1].payload.value).toEqual(
        expectedActions[1].payload.value,
      );
      expect(actions[1].payload.area).toEqual(expectedActions[1].payload.area);
      expect(actions[1].payload.dartType).toEqual(
        expectedActions[1].payload.dartType,
      );
      expect(actions[1].payload.index).toEqual(
        expectedActions[1].payload.index,
      );
      expect(actions[2].payload.result).toEqual(
        expectedActions[2].payload.result,
      );
    });
  });
});
