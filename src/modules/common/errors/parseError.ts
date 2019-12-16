import CONSTS from 'consts';

export default class ParseError extends Error {
  message: string;
  stack?: any;

  constructor(error: Error) {
    super();

    this.stack = new Error().stack;
    this.message = CONSTS.ERRORS.PARSE;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParseError);
    }
  }
}
