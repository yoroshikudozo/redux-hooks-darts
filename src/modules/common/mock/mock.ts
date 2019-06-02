type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function getQueryString(params: any = {}) {
  return (
    '?' +
    Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')
  );
}

function requestWithQuery(endpoint: string, method: Method, params?: any) {
  const url = params ? endpoint + getQueryString(params) : endpoint;
  return fetch(url, { method }).then(res => res.json());
}

function request(url: string, method: Method, params: any) {
  console.log(params);
  const body = JSON.stringify(params);
  return fetch(url, { method, body }).then(res => res.json());
}

const callApi = {
  get: (url: string, params?: any) => requestWithQuery(url, 'GET', params),
  post: (url: string, params: any) => request(url, 'POST', params),
  put: (url: string, params: any) => request(url, 'PUT', params),
  patch: (url: string, params: any) => request(url, 'PATCH', params),
  delete: (url: string, params?: any) => requestWithQuery(url, 'DELETE', params),
};

export default callApi;
