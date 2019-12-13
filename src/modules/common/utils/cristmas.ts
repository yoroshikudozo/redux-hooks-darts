import * as R from 'ramda';

import { TypedResponse } from 'modules/common/utils/request';
import API from 'consts/endpoints';

import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';

import ResponseError from 'modules/common/errors/responseError';
import RequestError from 'modules/common/errors/requestError';
import ParseError from 'modules/common/errors/parseError';
import { NormalizedEntities } from 'modules/common/schemas';

export interface FetchDartsByIdParams {
  gameId: string;
}

type Errors = Error | RequestError | ResponseError | ParseError;

export const createfetchDartsByGameRequest = ({
  gameId,
}: FetchDartsByIdParams) => `${API.DARTS}/games/${gameId}`;

export const createRequestTE = (init: RequestInfo | string) =>
  TE.tryCatch(
    () => fetch(init),
    error => new RequestError(error as string),
  );

export const toJsonTE = <T>(res: TypedResponse<T>) =>
  TE.tryCatch<ParseError, T>(
    () => res.json(),
    reason => new ParseError(reason as Error),
  );

export const createRequest = async <T>(
  requestTE: TE.TaskEither<RequestError, Response>,
  normalizer: (data: T | { [key: string]: T[] }) => NormalizedEntities<T>,
) => {
  const typedResponse = TE.taskEither.chain<Errors, Response, TypedResponse<T>>(
    requestTE,
    checkResponseStatus,
  );
  const jsonResponse = TE.taskEither.chain(typedResponse, toJsonTE);

  const result = await jsonResponse().then(createResponse(normalizer));

  return result;
};

export const checkResponseStatus = <T>(response: Response) => {
  const checkedResponseE = E.tryCatch(
    () => {
      if (response.ok) return response as TypedResponse<T>;
      throw new ResponseError(response);
    },
    reason => reason as ResponseError,
  );
  return TE.fromEither(checkedResponseE);
};

const createResponse = <T>(
  normalizer: (data: T | { [key: string]: T[] }) => NormalizedEntities<T>,
) =>
  E.fold<RequestError, T, string | NormalizedEntities<T>>(
    R.prop('message'),
    normalizer,
  );
