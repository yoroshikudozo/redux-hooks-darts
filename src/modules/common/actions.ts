import actionCreatorFactory, { AsyncActionCreators } from 'typescript-fsa';
import { Dispatch } from 'redux';

export interface Options {
  name: string;
  url: string;
  meta?: Meta;
}

interface Meta {
  [name: string]: any;
}

interface AsyncActionPayload<T> {
  started: any;
  done: {
    darts: T[];
  };
  failed: any;
}

function createEntityAsyncAction<T>(type: string, name: string) {
  const NAME = name.toUpperCase();
  return actionCreatorFactory(NAME).async<
    AsyncActionPayload<T>['started'],
    AsyncActionPayload<T>['done'],
    AsyncActionPayload<T>['failed']
  >(type);
}

export function createEntityActions(name: string) {
  const NAME = name.toUpperCase();
  return {
    fetch: createEntityAsyncAction('FETCH', NAME),
    create: createEntityAsyncAction('CREATE', NAME),
    update: createEntityAsyncAction('UPDATE', NAME),
    delete: createEntityAsyncAction('DELETE', NAME),
  };
}

export function wrapAsyncWorker<TParameters, TSuccess, TError>(
  asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
  worker: (params: TParameters) => Promise<TSuccess>,
) {
  return function wrappedWorker(dispatch: Dispatch, params: TParameters): Promise<TSuccess> {
    console.log(asyncAction.started(params));
    dispatch(asyncAction.started(params));
    return worker(params).then(
      result => {
        console.log(asyncAction.done({ params, result }));
        dispatch(asyncAction.done({ params, result }));
        return result;
      },
      (error: TError) => {
        console.log(asyncAction.failed({ params, error }));
        dispatch(asyncAction.failed({ params, error }));
        throw error;
      },
    );
  };
}

export default wrapAsyncWorker;
