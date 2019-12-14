import * as R from 'ramda';

import { identity } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';

import { TypedResponse } from 'modules/common/utils/request';

import ResponseError from 'modules/common/errors/responseError';
import RequestError from 'modules/common/errors/requestError';
import ParseError from 'modules/common/errors/parseError';

type Errors = RequestError | ResponseError | ParseError;

const request = (client: Promise<Response>) =>
  TE.tryCatch(
    () => client,
    reason => {
      console.log(reason);
      return new RequestError(reason as string) as Errors;
    },
  );

const toJson = <T>(res: TypedResponse<T>) =>
  TE.tryCatch(
    () => res.json(),
    reason => {
      console.log(reason);
      return new ParseError(reason as Error) as Errors;
    },
  );

const checkResponse = <T>(response: Response) =>
  TE.fromEither(
    E.tryCatch(
      () => {
        if (response.ok) return response as TypedResponse<T>;
        console.log(response);
        throw new ResponseError(response);
      },
      reason => reason as Errors,
    ),
  );

const createResponse = <T>() =>
  E.fold<Errors, T, string | T>(R.prop('message'), identity);

export const http = (client: typeof fetch) => <T>(
  init: RequestInfo | string,
) => {
  const sequence = pipe(
    request(client(init)),
    TE.chain<Errors, Response, TypedResponse<T>>(checkResponse),
    TE.chain(toJson),
  );

  return sequence().then(createResponse());
};
