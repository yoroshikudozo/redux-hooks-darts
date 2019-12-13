import * as R from 'ramda';

import { DartsList, Dart } from 'modules/darts/types';
import { TypedResponse } from 'modules/common/utils/request';
import API from 'consts/endpoints';
import { dartsNormalize } from 'modules/darts/schemas';

import { array } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';

import ResponseError from 'modules/common/errors/responseError';
import RequestError from 'modules/common/errors/requestError';
import ParseError from 'modules/common/errors/parseError';
import { NormalizedEntities } from 'modules/common/schemas';
import { identity } from 'fp-ts/lib/function';

declare function fetch<T>(...args: any): Promise<TypedResponse<T>>;

export interface FetchDartsByIdParams {
  gameId: string;
}

function toJson<T>(response: TypedResponse<T>) {
  return response.json();
}

export const fetchGreeting = TE.tryCatch<Error, { name: string }>(
  () => new Promise(resolve => resolve(JSON.parse('{ "name": "Carol" }'))),
  reason => new Error(String(reason)),
);

// fetchGreeting()
//   .then(e =>
//     pipe(
//       e,
//       E.fold(
//         err => `I'm sorry, I don't know who you are. (${err.message})`,
//         x => `Hello, ${x.name}!`,
//       ),
//     ),
//   )
//   .then(console.log);

export const createRequestTE = <T>(init: RequestInit | string) =>
  TE.tryCatch(
    () => fetch<T>(init),
    error => new RequestError(error as string),
  );

export const createfetchDartsByGameRequest = ({
  gameId,
}: FetchDartsByIdParams) => `${API.DARTS}/games/${gameId}`;

export const toJsonTE = <T>(res: TypedResponse<T>) =>
  TE.tryCatch<ParseError, T>(
    () => res.json(),
    reason => new ParseError(reason as Error),
  );

export const createRequest = async <T>(
  requestTE: TE.TaskEither<RequestError, TypedResponse<T>>,
  normalizer: (data: T | { [key: string]: T[] }) => NormalizedEntities<T>,
) => {
  const async2 = TE.taskEither.chain<Error, Response, TypedResponse<T>>(
    requestTE,
    checkResponseStatus,
  );

  const async = await requestTE()
    .then(checkResponseStatus)
    .then(e => {
      return E.flatten<Error, TypedResponse<T>>(e);
    })
    .then(async e => {
      const json = await E.either.map(e, toJsonTE);
      console.log(json);
      return json;
    });

  console.log(async);

  const async2 = TE.taskEither.chain(requestTE, toJsonTE);
  const result2 = await async2().then(res => {
    console.log(res);
    return createResponse(normalizer)(res);
  });
  return result2;

  // const async = TE.taskEither.chain(requestTE, toJsonTE);
  // const result = await async().then(res => {
  //   console.log(res);
  //   return createResponse(normalizer)(res);
  // });
  // return result;
};

export const checkResponseStatus = <T>(
  responseTE: TE.TaskEither<RequestError, TypedResponse<T>>,
) =>
  TE.flatten<Error, TypedResponse<T>>(
    TE.fromEither(
      E.tryCatch(
        () =>
          TE.taskEither.map(responseTE, response => {
            if (response.ok) return response as TypedResponse<T>;
            throw new ResponseError(response);
          }),
        reason => reason as ResponseError,
      ),
    ),
  );

const createResponse = <T>(
  normalizer: (data: T | { [key: string]: T[] }) => NormalizedEntities<T>,
) =>
  E.fold<RequestError, T, string | NormalizedEntities<T>>(
    R.prop('message'),
    normalizer,
  );

function log(val: any) {
  console.log('yay!');
  console.log(val instanceof Error);
  return val;
}
