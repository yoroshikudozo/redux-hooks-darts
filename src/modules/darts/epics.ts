import { combineEpics } from 'redux-observable';

import API from 'consts/endpoints';
import http from 'modules/common/utils/request';
import {
  FetchDartsParams,
  FetchDartsResponse,
  Dart,
  CreateDartData,
  FetchDartParams,
} from 'modules/darts/types';
import { epicFactory } from 'modules/common/utils/rx';
import actions, {
  fetchDartsCancel,
  createDartCancel,
} from 'modules/darts/actions';
import {
  NormalizedDarts,
  dartsNormalize,
  dartNormalize,
} from 'modules/darts/schemas';

const fetchDartsRequest = ({ id }: FetchDartsParams) =>
  http<FetchDartsResponse>(`${API.DARTS}/games/${id}`);

const fetchDartRequest = ({ id }: FetchDartParams) =>
  http<Dart>(`${API.DARTS}/${id}`);

const createDartRequest = (data: CreateDartData) =>
  http<Dart>(API.DARTS, { method: 'post', body: JSON.stringify(data) });

// export const fetchDartsComplexEpic = complexEpicFactory<
//   FetchDartsParams,
//   FetchDartsResponse,
//   NormalizedSchema<{ [key: string]: Dart }, string[]>
// >({
//   beforeAsync: actions.fetchDartsAsync,
//   asyncActions: actions.fetchDartsAsync,
//   request: fetchDartsRequest,
//   afterAsync: actions.fetchDartsAsync,
//   operator: dartsNormalize,
//   cancelAction: fetchDartsCancel,
// });

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
  operator: dartNormalize,
  cancelAction: actions.fetchDartCancel,
});

export const createDartEpic = epicFactory<
  CreateDartData,
  Dart,
  NormalizedDarts
>({
  asyncActions: actions.createDartAsync,
  request: createDartRequest,
  operator: dartNormalize,
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
