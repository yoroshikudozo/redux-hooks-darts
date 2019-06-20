import wrapAsyncWorker from '../actions';
import actionCreatorFactory from 'typescript-fsa';
import callApi from '../mock/mock';
import CONSTS from 'consts';
import { initDartsMock } from 'modules/darts/mock';
import fetchMock from 'fetch-mock';

import dart1 from 'modules/darts/mock/resources/dart1.json';
import { dartListSchema } from 'modules/darts/schema';

describe('ActionCreatorFactory', () => {
  const actionCreator = actionCreatorFactory('DARTS');

  interface DartsResponse {
    point: number;
    id: string;
  }

  const fetchDarts = actionCreator.async<{ gameId: string }, DartsResponse>(
    'FETCH',
    { schema: dartListSchema },
  );

  const fetchDartsWorker = wrapAsyncWorker(fetchDarts, gameId =>
    callApi.get(CONSTS.API.DARTS, gameId),
  );

  it('returns actions', async () => {
    initDartsMock(fetchMock);
    const data = await fetchDartsWorker(b => b, { gameId: '1' });
    expect(data).toEqual({ darts: [dart1] });
  });
});
