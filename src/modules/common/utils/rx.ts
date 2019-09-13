import { Epic } from 'redux-observable';
import { tap, ignoreElements } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';
import { AsyncActionCreators, AnyAction } from 'typescript-fsa';
import { ofAction } from 'typescript-fsa-redux-observable';
import { TypedResponse, toJson } from 'modules/common/utils/request';

import { AppState } from 'modules/reducers';

export const loggingEpic: Epic<AnyAction, AnyAction, AppState> = action$ =>
  action$.pipe(
    tap(action => console.log(action.type)),
    ignoreElements(),
  );

export const createEpic = <Params, Result, Data, Error = {}>(
  asyncActions: AsyncActionCreators<Params, Data, Error>,
  request: (params: Params) => Promise<TypedResponse<Result>>,
  operator: (result: Result) => Data,
): Epic<AnyAction> => action$ =>
  action$.pipe(
    ofAction(asyncActions.started),
    mergeMap(action =>
      request(action.payload)
        .then(toJson)
        .then(result =>
          asyncActions.done({
            result: operator(result),
            params: action.payload,
          }),
        ),
    ),
  );
