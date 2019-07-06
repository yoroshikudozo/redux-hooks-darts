import actionCreatorFactory from 'typescript-fsa';

import wrapAsyncWorker from 'modules/common/actions';
import CONSTS from 'consts';
import { DartsResponse, CreateDartData, Dart } from 'modules/darts/types';
import callApi from 'modules/common/mock/mock';
import { dartListSchema, dartSchema } from 'modules/darts/schema';
import request from 'modules/common/utils/request';

const actionCreator = actionCreatorFactory('DARTS');

interface FetchDartsParams {
  gameId: string;
}

export const fetchDarts = actionCreator.async<
  FetchDartsParams,
  DartsResponse,
  string
>('FETCH', { schema: dartListSchema });

export const createDart = actionCreator.async<CreateDartData, Dart, string>(
  'CREATE',
  { schema: dartSchema },
);

export const fetchDartsByGameId = wrapAsyncWorker(fetchDarts, params =>
  callApi.get(CONSTS.API.DARTS, params),
);

export const fetchDarts2 = request().get('DARTS');
