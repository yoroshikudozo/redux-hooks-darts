import axios, {
  AxiosResponse,
  CancelTokenSource,
  AxiosRequestConfig,
  Method,
} from 'axios';
import actionCreatorFactory, {
  AsyncActionCreators,
  AnyAction,
} from 'typescript-fsa';
import API, { Endpoints } from 'consts/endpoints';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AppState } from 'modules/reducers';

type AsyncActionType = 'create' | 'read' | 'update' | 'delete';

interface InitArg<Params> {
  endpoint?: string;
  method: Method;
  id: Endpoints;
  type: AsyncActionType;
  params: Params;
}

export default function request() {
  const defaultConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  const asyncActions = <Params, Result, Error>(
    id: string,
    type: AsyncActionType,
  ) => {
    const actionCreator = actionCreatorFactory(id);
    return actionCreator.async<Params, Result, Error>(type.toUpperCase());
  };

  function setConfig(method: Method, config: object): AxiosRequestConfig {
    return {
      ...defaultConfig,
      ...config,
      method,
    };
  }

  function catchError(error: Error) {
    if (axios.isCancel(error)) {
      throw new Error(`Request cancelled: ${error.message}`);
    } else {
      throw new Error(`Error retrieving response: ${error.message}`);
    }
  }

  async function send(id: Endpoints, config: object = {}) {
    return await axios({ url: `${API[id]}`, ...config });
  }

  function requestThunk<Param, Result, Error>(
    id: Endpoints,
    actions: AsyncActionCreators<Param, Result, Error>,
    params: Param,
    requestConfig: AxiosRequestConfig,
    canceller: CancelTokenSource,
  ): ThunkAction<CancelTokenSource, any, undefined, AnyAction> {
    return (dispatch): CancelTokenSource => {
      dispatch(actions.started(params));
      try {
        send(id, requestConfig)
          .then((response: AxiosResponse<Result>) => {
            const result = response.data;
            dispatch(actions.done({ params, result }));
          })
          .catch((error: Error) => {
            dispatch(actions.failed({ params, error }));
          });
      } catch (error) {
        catchError(error);
      }

      return canceller;
    };
  }

  function init<Params, Result, Error>({
    id,
    method,
    type,
    params,
  }: InitArg<Params>) {
    const actions = asyncActions<Params, Result, Error>(id, type);
    const canceller = axios.CancelToken.source();
    const requestConfig = setConfig(method, {
      ...params,
      cancelToken: canceller.token,
    });

    return (
      dispatch: ThunkDispatch<AppState, undefined, AnyAction>,
    ): CancelTokenSource => {
      dispatch(actions.started(params));
      try {
        send(id, requestConfig)
          .then((response: AxiosResponse<Result>) => {
            const result = response.data;
            dispatch(actions.done({ params, result }));
          })
          .catch((error: Error) => {
            dispatch(actions.failed({ params, error }));
          });
      } catch (error) {
        catchError(error);
      }

      return canceller;
    };

    // requestThunk<Params, Result, Error>(
    //   id,
    //   actions,
    //   params,
    //   requestConfig,
    //   canceller,
    // );
  }

  function post(id: Endpoints) {
    return (params: object = {}) =>
      init({ method: 'post', type: 'create', id, params });
  }

  function get(id: Endpoints) {
    return (params: object = {}) =>
      init({ method: 'get', type: 'read', id, params });
  }

  function put(id: Endpoints) {
    return (params: object = {}) =>
      init({ method: 'put', type: 'update', id, params });
  }

  function del(id: Endpoints) {
    return (params: object = {}) =>
      init({ method: 'delete', type: 'delete', id, params });
  }

  return {
    post,
    get,
    put,
    delete: del,
  };
}
