import actionCreatorFactory from 'typescript-fsa';

import wrapAsyncWorker from 'modules/common/actions';
import CONSTS from 'consts';
import { DartsResponse, CreateDartData } from 'modules/darts/types';
import callApi from 'modules/common/mock/mock';

const actionCreator = actionCreatorFactory('DARTS');

export const fetchDarts = actionCreator.async<
  { gameId: string },
  DartsResponse,
  string
>('FETCH');

export const createDart = actionCreator.async<
  CreateDartData,
  DartsResponse,
  {}
>('CREATE');

export const fetchDartsByGameId = wrapAsyncWorker(fetchDarts, gameId =>
  callApi.get(CONSTS.API.DARTS, gameId),
);
