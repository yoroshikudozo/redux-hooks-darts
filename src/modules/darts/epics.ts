import { normalize, NormalizedSchema } from 'normalizr';

import API from 'consts/endpoints';
import http from 'modules/common/utils/request';
import {
  FetchDartsParams,
  FetchDartsResponse,
  Dart,
  CreateDartData,
} from 'modules/darts/types';
import {
  epicFactory,
  actionTransformEpicFactory,
} from 'modules/common/utils/rx';
import actions, { initCreateDartRequestData } from 'modules/darts/actions';
import { dartListSchema, dartSchema } from 'modules/darts/schema';
import { combineEpics } from 'redux-observable';

const dartNormalize = (data: Dart) =>
  normalize<{ [key: string]: Dart }, string[]>(data, dartSchema);

const dartsNormalize = (data: FetchDartsResponse) =>
  normalize<{ [key: string]: Dart }, string[]>(data.darts, dartListSchema);

const fetchDartsRequest = ({ id }: FetchDartsParams) =>
  http<FetchDartsResponse>(`${API.DARTS}/${id}`);

const createDartsRequest = (data: CreateDartData) =>
  http<Dart>(API.DARTS, { method: 'post', body: JSON.stringify(data) });

export const fetchDartsEpic = epicFactory<
  FetchDartsParams,
  FetchDartsResponse,
  NormalizedSchema<{ [key: string]: Dart }, string[]>
>(actions.fetchDartsASync, fetchDartsRequest, dartsNormalize);

export const createDartEpic = epicFactory<
  CreateDartData,
  Dart,
  NormalizedSchema<{ [key: string]: Dart }, string[]>
>(actions.createDartAsync, createDartsRequest, dartNormalize);

export const createDartDataEpic = actionTransformEpicFactory(
  actions.createDart,
  actions.createDartAsync.started,
  initCreateDartRequestData,
);

const dartsEpic = combineEpics(
  fetchDartsEpic,
  createDartEpic,
  createDartDataEpic,
);

export default dartsEpic;
