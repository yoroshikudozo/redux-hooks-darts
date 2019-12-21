import actionCreatorFactory from 'typescript-fsa';

import {
  CreateDartData,
  FetchDartParams,
  Dart,
  FetchDartsByGameParams,
} from 'modules/darts/types';
import { NormalizedEntities } from 'modules/common/schemas';

const dartsActionCreator = actionCreatorFactory('DARTS');

export const fetchDartsByGameAsync = dartsActionCreator.async<
  FetchDartsByGameParams,
  NormalizedEntities<Dart, { darts: string[] }>,
  Error
>('BY_GAME/FETCH');

export const fetchDartsByGameCancel = dartsActionCreator<
  FetchDartsByGameParams
>('BY_GAME/FETCH_CANCEL');

export const fetchDartAsync = dartsActionCreator.async<
  FetchDartParams,
  NormalizedEntities<Dart, { darts: string[] }>,
  Error
>('FETCH');

export const fetchDartCancel = dartsActionCreator<FetchDartParams>(
  'FETCH_CANCEL',
);

export const createDartAsync = dartsActionCreator.async<
  CreateDartData,
  NormalizedEntities<Dart, { darts: string[] }>,
  Error
>('CREATE');

export const createDartCancel = dartsActionCreator<CreateDartData>(
  'CREATE_CANCEL',
);

const actions = {
  fetchDartsByGameAsync,
  fetchDartsByGameCancel,
  fetchDartAsync,
  fetchDartCancel,
  createDartAsync,
  createDartCancel,
};

export default actions;
