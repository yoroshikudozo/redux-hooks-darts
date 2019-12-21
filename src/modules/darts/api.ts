import API from 'consts/endpoints';

import http, { handleErrors } from 'modules/common/utils/wretch';

import {
  FetchDartParams,
  Dart,
  CreateDartData,
  DartList,
  FetchDartsByGameParams,
} from 'modules/darts/types';

const endpoint = `${API.DARTS}`;

export const fetchDartsByGameRequest = ({ gameId }: FetchDartsByGameParams) =>
  http(`${endpoint}/games/${gameId}`)
    .get()
    .json<DartList>()
    .catch(handleErrors);

export const fetchDartRequest = ({ id }: FetchDartParams) =>
  http(`${endpoint}/${id}`)
    .get()
    .json<Dart>()
    .catch(handleErrors);

export const createDartRequest = (data: CreateDartData) =>
  http(`${endpoint}`, {
    body: JSON.stringify(data),
  })
    .post()
    .json<Dart>()
    .catch(handleErrors);
