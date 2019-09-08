// for actions
import actionCreatorFactory, {
  AnyAction,
  AsyncActionCreators,
} from 'typescript-fsa';

// for reducers
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';
import { ofAction } from 'typescript-fsa-redux-observable';

//for epics
import { mergeMap, tap, ignoreElements } from 'rxjs/operators';
import { combineEpics, Epic, createEpicMiddleware } from 'redux-observable';

//reducer
import { createStore, applyMiddleware } from 'redux';
import { Dart } from 'modules/darts/types';
import API from 'consts/endpoints';

export interface TypedResponse<T = any> extends Response {
  /**
   * this will override `json` method from `Body` that is extended by `Response`
   * interface Body {
   *     json(): Promise<any>;
   * }
   */
  json<P = T>(): Promise<P>;
}
declare function fetch<T>(...args: any): Promise<TypedResponse<T>>;

// action
const dartsActionCreator = actionCreatorFactory('darts');

const actions = {
  fetchDarts: dartsActionCreator.async<FetchDartsParams, FetchDartsResponse>(
    'FETCH',
  ),
};

export const fetchDartsActions = dartsActionCreator.async<
  FetchDartsParams,
  FetchDartsResponse
>('FETCH');

interface FetchDartsParams {
  value: number;
}

interface FetchDartsResponse {
  darts: Dart[];
}

// reducers & state

interface State {
  darts: Dart[];
}

const initialState: State = { darts: [] };

const darts = reducerWithInitialState(initialState)
  .case(actions.fetchDarts.started, (state, action) => ({
    ...state.darts,
    darts: [],
  }))
  .case(actions.fetchDarts.done, (state, action) => ({
    ...state.darts,
    darts: action.result.darts,
  }));

const rootReducer = combineReducers({
  darts,
});

const fetchDartsEndpoint = (id: number) => `${API.DARTS}${id}`;
const fetchDartsRequest = ({ value }: FetchDartsParams) =>
  fetch<FetchDartsResponse>(fetchDartsEndpoint(value));

// epics
export const toJson = <T>(req: TypedResponse<T>) => req.json();
export const createEpic = <Params, Result, Error = {}>(
  asyncActions: AsyncActionCreators<Params, Result, Error>,
  request: (params: Params) => Promise<TypedResponse<Result>>,
): Epic<AnyAction> => action$ =>
  action$.pipe(
    ofAction(asyncActions.started),
    mergeMap(action =>
      request(action.payload)
        .then(toJson)
        .then(data =>
          asyncActions.done({
            result: data,
            params: action.payload,
          }),
        ),
    ),
  );

const fetchDartsEpic = createEpic<FetchDartsParams, FetchDartsResponse>(
  fetchDartsActions,
  fetchDartsRequest,
);

const loggingEpic: Epic<AnyAction, AnyAction, State> = action$ =>
  action$.pipe(
    ofAction(actions.fetchDarts.started),
    tap(action => console.log(action.type)),
    ignoreElements(),
  );

const rootEpic = combineEpics(fetchDartsEpic, loggingEpic);

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, State>();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

// tool
async function sleep(time: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), time);
  });
}

it('increment decrement test', async () => {
  expect(store.getState()).toEqual({ darts: [] });

  store.dispatch(actions.fetchDarts.started({ value: 20 }));
  expect(store.getState()).toEqual({ darts: [] });

  await sleep(1000);
  expect(store.getState()).toEqual({ darts: [] });
});
