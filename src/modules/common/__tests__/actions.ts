import wrapAsyncWorker, { createEntityActions } from '../actions';
import actionCreatorFactory from 'typescript-fsa';
import callApi from '../mock/mock';
import CONSTS from '../../../consts';
import { initDartsMock } from '../../darts/mock';
import fetchMock from 'fetch-mock';

describe('ActionCreatorFactory', () => {
  it('returns actions', () => {
    const args = {
      fetch: {
        started: undefined,
        done: {
          params: { gameId: 'asdf' },
          result: { darts: [{ id: 1, score: 20 }, { id: 2, score: 20 }, { id: 3, score: 20 }] },
        },
        failed: {},
      },
      create: {
        started: undefined,
        done: {},
        failed: {},
      },
      update: {
        started: undefined,
        done: {},
        failed: {},
      },
      delete: {
        started: undefined,
        done: {},
        failed: {},
      },
    };

    const actions = createEntityActions('darts');

    console.log(actions.fetch.done(args.fetch.done));

    expect(actions.fetch.started(args.fetch.started)).toEqual({
      type: 'DARTS/FETCH_STARTED',
    });
  });

  const actionCreator = actionCreatorFactory('DARTS');

  interface DartsResponse {
    point: number;
    id: string;
  }

  const fetchDarts = actionCreator.async<{ gameId: string }, DartsResponse, {}>('FETCH');

  const fetchDartsWorker = wrapAsyncWorker(fetchDarts, gameId =>
    callApi.get(CONSTS.API.DARTS, gameId),
  );

  it('returns actions', async () => {
    initDartsMock(fetchMock);
    const a = await fetchDartsWorker(b => b, { gameId: '1' });
    console.log(a);
    const b = await fetchDartsWorker(b => b, { gameId: '2' });
    console.log(b);
  });
});
