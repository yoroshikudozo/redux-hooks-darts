import * as wretch from 'wretch';
import CONSTS from 'consts';
import RequestError from 'modules/common/errors/requestError';
import ResponseError from 'modules/common/errors/responseError';
import ParseError from 'modules/common/errors/parseError';

function http(url?: string, opts?: wretch.WretcherOptions) {
  return wretch
    .default(url ? `${CONSTS.API.ROOT}${url}` : CONSTS.API.ROOT)
    .errorType('json')
    .accept('application/json')
    .content('utf-8')
    .options(opts ? opts : {})
    .catcher('AbortError', err => {
      console.log('abort error');
      throw new RequestError(err.message);
    })
    .catcher('__fromFetch', err => {
      console.log('fetch error');
      throw new RequestError(err.message);
    })
    .catcher(400, createErrorResponse)
    .catcher(401, createErrorResponse)
    .catcher(402, createErrorResponse)
    .catcher(403, createErrorResponse)
    .catcher(404, createErrorResponse)
    .catcher(408, createErrorResponse)
    .catcher(500, createErrorResponse);
}

function createErrorResponse({ response }: wretch.WretcherError) {
  console.log(response);
  throw new ResponseError(response);
}

export const handleErrors = (error: wretch.WretcherError) => {
  console.log(error);
  if (error instanceof ResponseError) throw error;
  throw new ParseError(error);
};

export default http;
