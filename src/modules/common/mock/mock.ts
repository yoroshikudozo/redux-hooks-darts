type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function getQueryString(params: any = {}) {
  return (
    '?' +
    Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')
  );
}

function requestWithQuery<T>(
  endpoint: string,
  method: Method,
  params?: any,
): T {
  const url = params ? endpoint + getQueryString(params) : endpoint;
  return (fetch(url, { method }).then(res => res.json()) as unknown) as T;
}

function request<T>(url: string, method: Method, params: any) {
  console.log(params);
  const body = JSON.stringify(params);
  return (fetch(url, { method, body }).then(res => res.json()) as unknown) as T;
}

const callApi = {
  get: <T>(url: string, params?: any) =>
    requestWithQuery<T>(url, 'GET', params),
  post: <T>(url: string, params: any) => request<T>(url, 'POST', params),
  put: <T>(url: string, params: any) => request<T>(url, 'PUT', params),
  patch: <T>(url: string, params: any) => request<T>(url, 'PATCH', params),
  delete: <T>(url: string, params?: any) =>
    requestWithQuery<T>(url, 'DELETE', params),
};

export default callApi;
