import { createEpic } from 'modules/common/utils/rx';
import API from 'consts/endpoints';

import {
  FetchDartsParams,
  FetchDartsResponse,
  CreateDartsParams,
  FetchDartsResult,
  Dart,
  CreateDartsResponse,
} from 'modules/darts/types';
import actions from 'modules/darts/actions';
import { normalize, NormalizedSchema } from 'normalizr';
import { dartSchema, dartListSchema } from 'modules/darts/schema';

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

const fetchDartsEndpoint = (id: string) => `${API.DARTS}/${id}`;
const createDartsEndpoint = `${API.DARTS}`;

const fetchDartsRequest = ({ id }: FetchDartsParams) =>
  fetch<FetchDartsResponse>(fetchDartsEndpoint(id));

const dartsNormalize = (data: FetchDartsResponse) =>
  normalize<{ [key: string]: Dart }, string[]>(data.darts, dartListSchema);

export const fetchDartsEpic = createEpic<
  FetchDartsParams,
  FetchDartsResponse,
  NormalizedSchema<{ [key: string]: Dart }, string[]>
>(actions.fetchDarts, fetchDartsRequest, dartsNormalize);
