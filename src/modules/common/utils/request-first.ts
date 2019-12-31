import ParseError from 'modules/common/errors/parseError';
import ResponseError from 'modules/common/errors/responseError';

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

export function handleParseError(error: Error) {
  throw new ParseError(error);
}

export function toJson<T>(response: TypedResponse<T>) {
  return response.json().catch(handleParseError);
}

export function handleResponse<T>(response: TypedResponse<T>) {
  if (response.ok) return response;
  throw new ResponseError(response);
}

function http<T>(input: RequestInfo, init?: RequestInit) {
  return fetch<T>(input, init)
    .then(handleResponse)
    .catch(error => error);
}

export default http;
