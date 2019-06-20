import { normalize, schema } from 'normalizr';
import { AnyAction, Middleware } from 'redux';
import { fetchDarts, createDart } from 'modules/darts/actions';
import { dartSchema } from 'modules/darts/schema';
import callApi from 'modules/common/mock/mock';
import wrapAsyncWorker from 'modules/common/actions';
import CONSTS from 'consts';

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

export interface CallApiActionArgs<T extends Params = any> {
  name: ModuleNames;
  params: T;
  requestType: RequestTypes;
  endpoint?: string;
}

export interface CallApiAction {
  type: 'CALL_API';
  meta: CallApiActionArgs;
}

function isCallApiAction(action: AnyAction): action is CallApiAction {
  return action.type === 'CALL_API';
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
const callApiMiddleware: Middleware = store => next => async action => {
  if (isCallApiAction(action)) {
    console.log('CALL_API');
    const { name, params, requestType } = action.meta;

    const asyncAction = asyncActions[name][requestType];
    const worker = await asyncAction(next, params);
    console.log(worker);

    return await worker;
  }

  return next(action);
};

export default callApiMiddleware;
