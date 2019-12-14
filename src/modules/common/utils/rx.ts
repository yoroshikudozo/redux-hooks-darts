import { AsyncActionCreators, AnyAction, ActionCreator } from 'typescript-fsa';
import { ofAction } from 'typescript-fsa-redux-observable';
import { Epic } from 'redux-observable';
import { map, mergeMap, tap, ignoreElements, takeUntil } from 'rxjs/operators';
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
    ofAction(asyncActions.started),
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
    takeUntil(action$.pipe(ofAction(cancelAction))),
  );

export const actionTransformEpicFactory = <Params, Result>(
  flagmentAction: ActionCreator<Params>,
  resultAction: ActionCreator<Result>,
  operator: (params: Params, state: AppState) => Result,
): Epic<AnyAction, AnyAction, AppState> => (action$, state$) =>
  action$.pipe(
    ofAction(flagmentAction),
    map(action => resultAction(operator(action.payload, state$.value))),
  );
