import { combineEpics } from 'redux-observable';

import API from 'consts/endpoints';
import http from 'modules/common/utils/request-first';
import {
  FetchDartsParams,
  FetchDartsResponse,
  Dart,
  CreateDartData,
  FetchDartParams,
  NormalizedDarts,
  FetchDartsByIdParams,
} from 'modules/darts/types';
import { epicFactory } from 'modules/common/utils/rx';
import actions, {
  fetchDartsCancel,
  createDartCancel,
} from 'modules/darts/actions';
import { dartsNormalize } from 'modules/darts/schemas';

export const fetchDartsRequest = ({ id }: FetchDartsParams) =>
  http<FetchDartsResponse>(`${API.DARTS}/games/${id}`);

export const createfetchDartsByGameInit = ({ gameId }: FetchDartsByIdParams) =>
  `${API.DARTS}/games/${gameId}`;

export const fetchDartRequest = ({ id }: FetchDartParams) =>
  http<Dart>(`${API.DARTS}/${id}`);

export const createDartRequest = (data: CreateDartData) =>
  http<Dart>(API.DARTS, { method: 'post', body: JSON.stringify(data) });

export const fetchDartsEpic = epicFactory<
  FetchDartsParams,
  FetchDartsResponse,
  NormalizedDarts
>({
  asyncActions: actions.fetchDartsAsync,
  request: fetchDartsRequest,
  operator: dartsNormalize,
  cancelAction: fetchDartsCancel,
});

export const fetchDartEpic = epicFactory<
  FetchDartParams,
  Dart,
  NormalizedDarts
>({
  asyncActions: actions.fetchDartAsync,
  request: fetchDartRequest,
  operator: dartsNormalize,
  cancelAction: actions.fetchDartCancel,
});

export const createDartEpic = epicFactory<
  CreateDartData,
  Dart,
  NormalizedDarts
>({
  asyncActions: actions.createDartAsync,
  request: createDartRequest,
  operator: dartsNormalize,
  cancelAction: createDartCancel,
});

// export const createDartDataEpic = actionTransformEpicFactory(
//   actions.createDart,
//   actions.createDartAsync.started,
//   initCreateDartRequestData,
// );

const dartsEpic = combineEpics(
  fetchDartEpic,
  fetchDartsEpic,
  createDartEpic,
  // createDartDataEpic,
);

export default dartsEpic;
