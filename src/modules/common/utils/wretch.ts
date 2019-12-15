import * as wretch from 'wretch';

import CONSTS from 'consts';
import { FetchDartsByIdParams } from 'modules/darts/types';

export function http(url?: string, opts?: wretch.WretcherOptions) {
  return wretch
    .default(url ? `${CONSTS.API.ROOT}${url}` : CONSTS.API.ROOT)
    .errorType('json')
    .accept('application/json')
    .content('utf-8')
    .options(opts ? opts : {})
    .catcher('__fromFetch', err => {
      console.log('fetch error');
      return err.message;
    })
    .catcher(400, createDefaultErrorResponse)
    .catcher(401, createDefaultErrorResponse)
    .catcher(402, createDefaultErrorResponse)
    .catcher(403, createErrorResponse)
    .catcher(404, createErrorResponse)
    .catcher(408, createDefaultErrorResponse)
    .catcher(500, createErrorResponse);
}

function createDefaultErrorResponse({ response }: wretch.WretcherError) {
  console.log(response);
  return `${response.status} ${response.statusText}`;
}

function createErrorResponse({ response }: wretch.WretcherError) {
  console.log(response);
  return CONSTS.ERRORS[String(response.status) as keyof typeof CONSTS.ERRORS];
}

export const dartsRequest = ({ gameId }: FetchDartsByIdParams) =>
  http(`${CONSTS.API.DARTS}/games/${gameId}`)
    .get()
    .json()
    .catch(error => {
      console.log(error.message);
      return CONSTS.ERRORS.PARSE;
    });
