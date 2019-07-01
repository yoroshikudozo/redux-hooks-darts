import axios, {
  AxiosResponse,
  CancelTokenSource,
  AxiosRequestConfig,
  Method,
} from 'axios';
import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import API, { Endpoints } from 'consts/endpoints';

type AsyncActionType = 'create' | 'read' | 'update' | 'delete';

interface InitArg<Params> {
  endpoint?: string;
  method: Method;
  id: Endpoints;
  type: AsyncActionType;
  params: Params;
}

export default class Request {
  static defaultConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  private static asyncActions = <Params, Result, Error>(
    id: string,
    type: AsyncActionType,
  ) => {
    const actionCreator = actionCreatorFactory(id.toUpperCase());
    return actionCreator.async<Params, Result, Error>(type.toUpperCase());
  };

  public static post = (id: Endpoints, params: object = {}) => {
    return Request.init({ method: 'post', type: 'create', id, params });
  };

  public static get = (id: Endpoints, params: object = {}) => {
    return Request.init({ method: 'get', type: 'read', id, params });
  };

  public static put = (id: Endpoints, params: object = {}) => {
    return Request.init({ method: 'put', type: 'update', id, params });
  };

  public static delete = (id: Endpoints, params: object = {}) => {
    return Request.init({ method: 'delete', type: 'delete', id, params });
  };

  private static init = <Param, Result, Error>({
    id,
    method,
    type,
    params,
  }: InitArg<Param>) => {
    const actions = Request.asyncActions<Param, Result, Error>(id, type);
    const canceller = axios.CancelToken.source();
    const requestConfig = Request.setConfig(method, {
      ...params,
      cancelToken: canceller.token,
    });

    return (dispatch: Dispatch): CancelTokenSource => {
      dispatch(actions.started(params));
      try {
        Request.send(requestConfig)(id)
          .then((response: AxiosResponse<Result>) => {
            const result = response.data;
            dispatch(actions.done({ params, result }));
          })
          .catch((error: Error) => {
            dispatch(actions.failed({ params, error }));
          });
      } catch (error) {
        Request.catchError(error);
      }

      return canceller;
    };
  };

  private static setConfig = (
    method: Method,
    config: object,
  ): AxiosRequestConfig => {
    return {
      ...Request.defaultConfig,
      ...config,
      method,
    };
  };

  private static catchError = (error: Error) => {
    if (axios.isCancel(error)) {
      throw new Error(`Request cancelled: ${error.message}`);
    } else {
      throw new Error(`Error retrieving response: ${error.message}`);
    }
  };

  private static send = (config: object = {}) => (id: Endpoints) => {
    return axios({ url: `${API[id]}`, ...config });
  };
}
