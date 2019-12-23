import API from 'consts/endpoints';

import http, { handleErrors } from 'modules/common/utils/wretch';

import {
  FetchDartParams,
  Dart,
  CreateDartData,
  DartList,
  FetchDartsByGameParams,
} from 'modules/darts/types';
import { WretcherOptions } from 'wretch';

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

export const createRequest = <T>(path: string, options: WretcherOptions) => ({
  get: () =>
    http(path, options)
      .get()
      .json<T>()
      .catch(handleErrors),
  post: () =>
    http(path, options)
      .post()
      .json<T>()
      .catch(handleErrors),
  put: () =>
    http(path, options)
      .post()
      .json<T>()
      .catch(handleErrors),
  delete: () =>
    http(path, options)
      .post()
      .json<T>()
      .catch(handleErrors),
});
