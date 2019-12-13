export default class RequestError extends Error {
  message: string;

  constructor(error: string) {
    super();

    this.message =
      'ネットワークエラーです。しばらくしてから再度お試しください。';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError);
    }
  }
}
