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
import { ofAction } from 'typescript-fsa-redux-observable';

export const loggingEpic: Epic<AnyAction, AnyAction, AppState> = action$ =>
  action$.pipe(
    tap(action => console.log(action.type)),
    ignoreElements(),
  );

export const epicFactory = <Params, Result, Data = Result, ErrorType = Error>({
  asyncActions,
  request,
  normalizer: normalizer = R.identity as (result: Result) => Data,
  cancelAction,
}: {
  asyncActions: AsyncActionCreators<Params, Data, ErrorType>;
  request: (params: Params) => Promise<Result>;
  normalizer: (result: Result) => Data;
  cancelAction: ActionCreator<Params>;
}): Epic => action$ =>
  action$.pipe(
    ofAction(asyncActions.started),
    mergeMap(action =>
      request(action.payload)
        .then(data =>
          R.isEmpty(data)
            ? (({ entities: {}, result: [] } as unknown) as Data)
            : normalizer(data),
        )
        .then(result =>
          asyncActions.done({
            result: result,
            params: action.payload,
          }),
        )
        .catch(error => {
          console.log(error);
          return asyncActions.failed({
            params: action.payload,
            error,
          });
        }),
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
