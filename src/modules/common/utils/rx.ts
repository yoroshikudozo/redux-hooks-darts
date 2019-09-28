import { Epic } from 'redux-observable';
import { map, tap, ignoreElements, takeUntil } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { AsyncActionCreators, AnyAction, ActionCreator } from 'typescript-fsa';
import { ofAction } from 'typescript-fsa-redux-observable';

import { AppState } from 'modules/reducers';

export const loggingEpic: Epic<AnyAction, AnyAction, AppState> = action$ =>
  action$.pipe(
    tap(action => console.log(action.type)),
    ignoreElements(),
  );

export const epicFactory = <Params, Result, Data = Result, ErrorType = Error>({
  asyncActions,
  request,
  operator,
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
        .then(result =>
          asyncActions.done({
            result: operator(result),
            params: action.payload,
          }),
        )
        .catch((error: ErrorType) =>
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
