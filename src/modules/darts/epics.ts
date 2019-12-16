import { combineEpics } from 'redux-observable';

import CONSTS from 'consts';
import API from 'consts/endpoints';
import http from 'modules/common/utils/wretch';
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
    .catch(error => {
      console.log(error.message);
      throw new Error(CONSTS.ERRORS.PARSE);
    });

export const fetchDart = ({ id }: FetchDartParams) =>
  http(`${endpoint}/${id}`)
    .get()
    .json<Dart>()
    .catch(error => {
      console.log(error.message);
      throw new Error(CONSTS.ERRORS.PARSE);
    });

export const createDart = (data: CreateDartData) =>
  http(`${endpoint}`, {
    body: JSON.stringify(data),
  })
    .post()
    .json<Dart>()
    .catch(error => {
      console.log(error.message);
      throw new Error(CONSTS.ERRORS.PARSE);
    });

export const fetchDartsByGameEpic = epicFactory<
  FetchDartsByGameParams,
  FetchDartsResponse,
  NormalizedEntities<Dart>
>({
  asyncActions: actions.fetchDartsByGameAsync,
  request: fetchDartsByGame,
  operator: dartsNormalize,
  cancelAction: actions.fetchDartsByGameCancel,
});

export const fetchDartEpic = epicFactory<
  FetchDartParams,
  Dart,
  NormalizedEntities<Dart>
>({
  asyncActions: actions.fetchDartAsync,
  request: fetchDart,
  operator: dartsNormalize,
  cancelAction: actions.fetchDartCancel,
});

export const createDartEpic = epicFactory<
  CreateDartData,
  Dart,
  NormalizedEntities<Dart>
>({
  asyncActions: actions.createDartAsync,
  request: createDart,
  operator: dartsNormalize,
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
