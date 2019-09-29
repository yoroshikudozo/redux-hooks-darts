import CONSTS from 'consts';
import { Errors } from 'consts/errors';

export default class ResponseError extends Error {
  statusText: string;
  status: Errors;
  url: string | undefined;
  stack: any;
  innerError: any;

  constructor(res: Response) {
    super();

    this.url = res.url;
    this.statusText = res.statusText;
    this.status = (`${res.status}` as unknown) as Errors;
    this.innerError = res;
    this.stack = new Error().stack;
    this.message = CONSTS.ERRORS[this.status];

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError);
    }
  }
}
