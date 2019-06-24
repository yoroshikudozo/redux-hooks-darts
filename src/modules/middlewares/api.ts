import { normalize, schema, Schema } from 'normalizr';
import { AnyAction, Middleware } from 'redux';
import { fetchDarts, createDart } from 'modules/darts/actions';
import { dartSchema } from 'modules/darts/schema';
import callApi from 'modules/common/mock/mock';
import wrapAsyncWorker from 'modules/common/actions';
import CONSTS from 'consts';
import { AsyncActionCreators } from 'typescript-fsa';

const schemas = {
  darts: dartSchema,
  rounds: dartSchema,
  scores: dartSchema,
  games: dartSchema,
};

const asyncActions = {
  darts: {
    create: wrapAsyncWorker(createDart, params =>
      callApi.get(CONSTS.API.DARTS, params),
    ),
    fetch: wrapAsyncWorker(fetchDarts, params =>
      callApi.get(CONSTS.API.DARTS, params),
    ),
  },
};

type ModuleNames = 'darts'; //| 'rounds' | 'scores' | 'games';
type RequestTypes = 'fetch' | 'create'; // | 'update' | 'delete';

interface Params {
  [key: string]: any;
}

export interface CallApiActionArgs<P, R, E> {
  name: ModuleNames;
  requestType: RequestTypes;
  endpoint?: string;
  asyncActions: AsyncActionCreators<P, R, E>;
  schema: Schema;
}

export interface CallApiAction<P, R, E> {
  type: 'CALL_API';
  payload: P;
  meta: CallApiActionArgs<P, R, E>;
}

function isCallApiAction(
  action: AnyAction,
): action is CallApiAction<any, any, any> {
  return action.type === 'CALL_API';
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
const callApiMiddleware: Middleware = store => next => async action => {
  console.log(action);
  if (isCallApiAction(action)) {
    const { name, requestType, asyncActions } = action.meta;
    const params = action.payload;
    const worker = await wrapAsyncWorker(asyncActions, params =>
      callApi.get(name, params),
    );

    const result = worker(next, params);

    return await result;
  }

  return next(action);
};

export default callApiMiddleware;
