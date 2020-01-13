import { NormalizedSchema } from 'normalizr';
import actionCreatorFactory from 'typescript-fsa';

import {
  CreateDartData,
  Dart,
  DartsBoardData,
  FetchDartParams,
  FetchDartsByGameParams,
} from 'modules/darts/types';

const dartsActionCreator = actionCreatorFactory('DARTS');

export const fetchDartsByGameAsync = dartsActionCreator.async<
  FetchDartsByGameParams,
  NormalizedSchema<{ darts: { [key: string]: Dart } }, { darts: string[] }>,
  Error
>('BY_GAME/FETCH');

export const fetchDartsByGameCancel = dartsActionCreator<
  FetchDartsByGameParams
>('BY_GAME/FETCH_CANCEL');

export const fetchDartAsync = dartsActionCreator.async<
  FetchDartParams,
  NormalizedSchema<{ darts: { [key: string]: Dart } }, { darts: string[] }>,
  Error
>('FETCH');

export const fetchDartCancel = dartsActionCreator<FetchDartParams>(
  'FETCH_CANCEL',
);

export const createDartAsync = dartsActionCreator.async<
  CreateDartData,
  NormalizedSchema<{ darts: { [key: string]: Dart } }, { darts: string[] }>,
  Error
>('CREATE_');

export const createDartAction = dartsActionCreator.async<
  DartsBoardData,
  NormalizedSchema<{ darts: { [key: string]: Dart } }, { darts: string[] }>,
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
  createDartAction,
  createDartCancel,
};

export default actions;
