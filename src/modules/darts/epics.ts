import { combineEpics } from 'redux-observable';

import API from 'consts/endpoints';
import http, { handleErrors } from 'modules/common/utils/wretch';
import {
  FetchDartParams,
  FetchDartsResponse,
  Dart,
  CreateDartData,
  DartsList,
  FetchDartsByGameParams,
} from 'modules/darts/types';
import { epicFactory } from 'modules/common/utils/rx';
import actions from 'modules/darts/actions';
import { dartsNormalize } from 'modules/darts/schemas';
import { NormalizedEntities } from 'modules/common/schemas';

const endpoint = `${API.DARTS}`;

export const fetchDartsByGame = ({ gameId }: FetchDartsByGameParams) =>
  http(`${endpoint}/games/${gameId}`)
    .get()
    .json<DartsList>()
    .catch(handleErrors);

export const fetchDart = ({ id }: FetchDartParams) =>
  http(`${endpoint}/${id}`)
    .get()
    .json<Dart>()
    .catch(handleErrors);

export const createDart = (data: CreateDartData) =>
  http(`${endpoint}`, {
    body: JSON.stringify(data),
  })
    .post()
    .json<Dart>()
    .catch(handleErrors);

export const fetchDartsByGameEpic = epicFactory<
  FetchDartsByGameParams,
  FetchDartsResponse,
  NormalizedEntities<Dart, { darts: string[] }>
>({
  asyncActions: actions.fetchDartsByGameAsync,
  request: fetchDartsByGame,
  normalizer: dartsNormalize,
  cancelAction: actions.fetchDartsByGameCancel,
});

export const fetchDartEpic = epicFactory<
  FetchDartParams,
  Dart,
  NormalizedEntities<Dart, { darts: string[] }>
>({
  asyncActions: actions.fetchDartAsync,
  request: fetchDart,
  normalizer: dartsNormalize,
  cancelAction: actions.fetchDartCancel,
});

export const createDartEpic = epicFactory<
  CreateDartData,
  Dart,
  NormalizedEntities<Dart, { darts: string[] }>
>({
  asyncActions: actions.createDartAsync,
  request: createDart,
  normalizer: dartsNormalize,
  cancelAction: actions.createDartCancel,
});

// export const createDartDataEpic = actionTransformEpicFactory(
//   actions.createDart,
//   actions.createDartAsync.started,
//   initCreateDartRequestData,
// );

const dartsEpic = combineEpics(
  fetchDartEpic,
  fetchDartsByGameEpic,
  createDartEpic,
  // createDartDataEpic,
);

export default dartsEpic;
