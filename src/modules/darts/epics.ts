import { combineEpics } from 'redux-observable';

import API from 'consts/endpoints';
import http from 'modules/common/utils/request';
import {
  FetchDartsParams,
  FetchDartsResponse,
  Dart,
  CreateDartData,
} from 'modules/darts/types';
import { epicFactory } from 'modules/common/utils/rx';
import actions, {
  fetchDartsCancel,
  createDartCancel,
} from 'modules/darts/actions';
import {
  NormalizedDarts,
  NormalizedDart,
  dartsNormalize,
  dartNormalize,
} from 'modules/darts/schemas';

const fetchDartsRequest = ({ id }: FetchDartsParams) =>
  http<FetchDartsResponse>(`${API.DARTS}/${id}`);

const createDartsRequest = (data: CreateDartData) =>
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

export const createDartEpic = epicFactory<CreateDartData, Dart, NormalizedDart>(
  {
    asyncActions: actions.createDartAsync,
    request: createDartsRequest,
    operator: dartNormalize,
    cancelAction: createDartCancel,
  },
);

// export const createDartDataEpic = actionTransformEpicFactory(
//   actions.createDart,
//   actions.createDartAsync.started,
//   initCreateDartRequestData,
// );

const dartsEpic = combineEpics(
  fetchDartsEpic,
  createDartEpic,
  // createDartDataEpic,
);

export default dartsEpic;
