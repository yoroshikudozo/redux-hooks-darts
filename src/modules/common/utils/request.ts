import ResponseError from 'modules/common/errors/responseError';
import ParseError from 'modules/common/errors/parseError';

export interface TypedResponse<T = any> extends Response {
  /**
   * this will override `json` method from `Body` that is extended by `Response`
   * interface Body {
   *     json(): Promise<any>;
   * }
   */
  json<P = T>(): Promise<P>;
}

declare function fetch<T>(...args: any): Promise<TypedResponse<T>>;

const handleParseError = function(error: Error) {
  throw new ParseError(error);
};

const handleResponseErrors = function(response: Response) {
  if (!response.ok) {
    throw new ResponseError(response);
  }

  return response;
};

const toJson = (response: Response) => response.json().catch(handleParseError);

// const isResponseError = (error: Error): error is ResponseError =>
//   error instanceof ResponseError;

// const isParseError = (error: Error): error is ParseError =>
//   error instanceof ParseError;

const handleRequestErrors = function(error: ResponseError | ParseError) {
  console.log(error);
  // if (isResponseError(error)) {
  //   console.log('ResponseError');
  //   console.log(error);
  //   throw error;
  // }
  // if (isParseError(error)) {
  //   console.log('ParseError');
  //   console.log(error);
  //   throw error;
  // }
  throw error;
};

const http = <T = any>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  return fetch(input, init)
    .then(handleResponseErrors)
    .then(toJson)
    .catch(handleRequestErrors);
};

export default http;
