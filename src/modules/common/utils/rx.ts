import { AsyncActionCreators, AnyAction, ActionCreator } from 'typescript-fsa';
import { Epic } from 'redux-observable';
import {
  mergeMap,
  tap,
  ignoreElements,
  takeUntil,
  filter,
} from 'rxjs/operators';
import * as R from 'ramda';

import { AppState } from 'modules/reducers';
import http from 'modules/common/utils/request-first';

export const loggingEpic: Epic<AnyAction, AnyAction, AppState> = action$ =>
  action$.pipe(
    tap(action => console.log(action.type)),
    ignoreElements(),
  );

export const epicFactory = <Params, Result, Data = Result, ErrorType = Error>({
  asyncActions,
  request,
  operator: operator = R.identity as (result: Result) => Data,
  cancelAction,
}: {
  asyncActions: AsyncActionCreators<Params, Data, ErrorType>;
  request: (params: Params) => Promise<Result>;
  operator: (result: Result) => Data;
  cancelAction: ActionCreator<Params>;
}): Epic => action$ =>
  action$.pipe(
    filter(action => asyncActions.started.match(action)),
    mergeMap(action =>
      request(action.payload)
        .then(operator)
        .then(result =>
          asyncActions.done({
            result: result,
            params: action.payload,
          }),
        )
        .catch(error =>
          asyncActions.failed({
            params: action.payload,
            error,
          }),
        ),
    ),
    takeUntil(action$.pipe(filter(action => cancelAction.match(action)))),
  );

export const epicFactory2 = <Params, Result, Data = Result, ErrorType = Error>({
  asyncActions,
  cancelAction,
}: {
  asyncActions: AsyncActionCreators<Params, Data, ErrorType>;
  request: (params: Params) => Promise<Result>;
  cancelAction: ActionCreator<Params>;
}): Epic => action$ =>
  action$.pipe(
    filter(action => asyncActions.started.match(action)),
    mergeMap(action =>
      http<Result>(action.payload)
        .then(action.meta.operator as (result: Result) => Data)
        .then(result =>
          asyncActions.done({
            result: result,
            params: action.payload,
          }),
        )
        .catch(error =>
          asyncActions.failed({
            params: action.payload,
            error,
          }),
        ),
    ),
    takeUntil(action$.pipe(filter(action => cancelAction.match(action)))),
  );
