import { combineEpics } from 'redux-observable';

import { NormalizedEntities } from 'modules/common/schemas';
import { epicFactory } from 'modules/common/utils/rx';

import {
  FetchDartParams,
  FetchDartsResponse,
  Dart,
  CreateDartData,
  FetchDartsByGameParams,
} from 'modules/darts/types';
import actions from 'modules/darts/actions';
import { dartsNormalize } from 'modules/darts/schemas';
import {
  fetchDartsByGameRequest,
  fetchDartRequest,
  createDartRequest,
} from 'modules/darts/api';

export const fetchDartsByGameEpic = epicFactory<
  FetchDartsByGameParams,
  FetchDartsResponse,
  NormalizedEntities<Dart, { darts: string[] }>
>({
  asyncActions: actions.fetchDartsByGameAsync,
  request: fetchDartsByGameRequest,
  normalizer: dartsNormalize,
  cancelAction: actions.fetchDartsByGameCancel,
});

export const fetchDartEpic = epicFactory<
  FetchDartParams,
  Dart,
  NormalizedEntities<Dart, { darts: string[] }>
>({
  asyncActions: actions.fetchDartAsync,
  request: fetchDartRequest,
  normalizer: dartsNormalize,
  cancelAction: actions.fetchDartCancel,
});

export const createDartEpic = epicFactory<
  CreateDartData,
  Dart,
  NormalizedEntities<Dart, { darts: string[] }>
>({
  asyncActions: actions.createDartAsync,
  request: createDartRequest,
  normalizer: dartsNormalize,
  cancelAction: actions.createDartCancel,
});

const dartsEpic = combineEpics(
  fetchDartEpic,
  fetchDartsByGameEpic,
  createDartEpic,
);

export default dartsEpic;
