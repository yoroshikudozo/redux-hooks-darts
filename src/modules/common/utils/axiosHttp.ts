import axios, {
  AxiosRequestConfig,
  CancelToken,
  CancelTokenStatic,
  CancelTokenSource,
  AxiosStatic,
  AxiosError,
} from 'axios';

function http(axios: AxiosStatic) {
  return axios.create({
    baseURL: '',
    headers: { 'Content-Type': 'application/json' },
  });
}

export function createApi(axios: AxiosStatic) {
  const instance = axios.create({
    baseURL: '',
    headers: { 'Content-Type': 'application/json' },
  });

  return (type = 'get') => {
    let call: CancelTokenSource;

    return function axiosWrapper(
      url: string,
      data: any,
      config?: AxiosRequestConfig,
    ) {
      if (call) {
        call.cancel('Only one request allowed!');
      }
      call = axios.CancelToken.source();

      function cancel(message?: string) {
        return call.cancel(message);
      }

      const extConf = {
        cancelToken: call.token,
        ...config,
      };
      switch (type) {
        case 'request':
          return Object.assign(instance[type](extConf), { cancel });

        case 'get':
        case 'delete':
        case 'head':
          return Object.assign(instance[type](url, extConf), { cancel });

        case 'post':
        case 'put':
        case 'patch':
          const a = Object.assign(instance[type](url, data, extConf), {
            cancel,
          });
          return a;

        default:
          return null as never;
      }
    };
  };
}

export default http;
