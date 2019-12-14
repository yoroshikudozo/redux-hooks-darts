import CONSTS from 'consts';

export default class RequestError extends Error {
  message: string;

  constructor(error: string) {
    super();

    this.message = CONSTS.ERRORS.NETWORK;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError);
    }
  }
}
