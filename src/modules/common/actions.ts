import actionCreatorFactory, { AsyncActionCreators } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { CallApiActionArgs } from 'modules/middlewares/api';

export interface Options {
  name: string;
  url: string;
  meta?: Meta;
}

interface Meta {
  [name: string]: any;
}

export function wrapAsyncWorker<TParameters, TSuccess, TError>(
  asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
  worker: (params: TParameters) => Promise<TSuccess>,
) {
  return function wrappedWorker(
    dispatch: Dispatch,
    params: TParameters,
  ): Promise<TSuccess> {
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
