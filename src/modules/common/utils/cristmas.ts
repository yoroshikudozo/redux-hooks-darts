import * as R from 'ramda';

import { TypedResponse } from 'modules/common/utils/request';
import API from 'consts/endpoints';

import { pipe } from 'fp-ts/lib/pipeable';
import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';

import ResponseError from 'modules/common/errors/responseError';
import RequestError from 'modules/common/errors/requestError';
import ParseError from 'modules/common/errors/parseError';
import { NormalizedEntities } from 'modules/common/schemas';

export interface FetchDartsByIdParams {
  gameId: string;
}

type Errors = RequestError | ResponseError | ParseError;

export const createfetchDartsByGameRequest = ({
  gameId,
}: FetchDartsByIdParams) => `${API.DARTS}/games/${gameId}`;

const request = (init: RequestInfo | string) =>
  TE.tryCatch(
    () => fetch(init),
    reason => new RequestError(reason as string) as Errors,
  );

const toJson = <T>(res: TypedResponse<T>) =>
  TE.tryCatch(
    () => res.json(),
    reason => new ParseError(reason as Error) as Errors,
  );

const checkResponse = <T>(response: Response) =>
  TE.fromEither(
    E.tryCatch(
      () => {
        if (response.ok) return response as TypedResponse<T>;
        throw new ResponseError(response);
      },
      reason => reason as Errors,
    ),
  );

export const http = async <T>(
  init: RequestInfo | string,
  normalizer: (data: T | { [key: string]: T[] }) => NormalizedEntities<T>,
) => {
  const sequence = pipe(
    request(init),
    TE.chain<Errors, Response, TypedResponse<T>>(checkResponse),
    TE.chain(toJson),
  );

  return sequence().then(
    E.fold<Errors, T, string | NormalizedEntities<T>>(
      R.prop('message'),
      normalizer,
    ),
  );
};
