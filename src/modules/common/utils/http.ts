import getQueryString from 'modules/common/utils/qs';

export interface RequestInitObject extends Omit<RequestInit, 'body'> {
  body: object;
}

// this function will infer a response type
const fetchTypeHelper = <T>(task: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    task
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const http = <T = any>(
  input: RequestInfo,
  options?: RequestInitObject,
): Promise<T> => {
  let url = input;
  console.log(input, options);
  if (options) {
    if (options.method === 'get' || 'delete') {
      url = options.body ? input + getQueryString(options.body) : input;
      const { body, ...init } = options;
      return fetchTypeHelper<T>(fetch(url, init));
    } else {
      return fetchTypeHelper<T>(
        fetch(url, { ...options, body: JSON.stringify(options.body) }),
      );
    }
  }
  return fetchTypeHelper<T>(fetch(url, {}));
};

export default http;
