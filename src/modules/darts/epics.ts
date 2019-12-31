import { combineEpics } from 'redux-observable';

import { NormalizedEntities } from 'modules/common/schemas';
import actions from 'modules/darts/actions';
import {
  createDartRequest,
  fetchDartRequest,
  fetchDartsByGameRequest,
} from 'modules/darts/api';
import { dartsNormalize } from 'modules/darts/schemas';
import {
  CreateDartData,
  Dart,
  FetchDartParams,
  FetchDartsByGameParams,
  FetchDartsResponse,
} from 'modules/darts/types';

import { epicFactory } from 'modules/common/utils/rx';

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
  // fetchDartEpic,
  fetchDartsByGameEpic,
  createDartEpic,
);

export default dartsEpic;
