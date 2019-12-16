import * as wretch from 'wretch';

import CONSTS from 'consts';

function http(url?: string, opts?: wretch.WretcherOptions) {
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
  throw new Error(`${response.status} ${response.statusText}`);
}

function createErrorResponse({ response }: wretch.WretcherError) {
  console.log(response);
  throw new Error(
    CONSTS.ERRORS[String(response.status) as keyof typeof CONSTS.ERRORS],
  );
}

export default http;
