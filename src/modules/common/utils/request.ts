import ResponseError from 'modules/common/errors/requestError';

const handleErrors = function(response: Response) {
  if (!response.ok) {
    throw new ResponseError(response);
  }

  return response;
};

export const wrap = <T>(task: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    task
      .then(handleErrors)
      .then(response =>
        response
          .json()
          .then(json => resolve(json))
          .catch(error => reject(error)),
      )
      .catch(error => reject({ message: error.message, url: error.url }));
  });
};

const http = <T = any>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  return wrap<T>(fetch(input, init));
};

export default http;
