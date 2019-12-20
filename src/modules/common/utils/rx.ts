import { AsyncActionCreators, AnyAction, ActionCreator } from 'typescript-fsa';
import { Epic } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable';
import {
  mergeMap,
  tap,
  ignoreElements,
  takeUntil,
  filter,
} from 'rxjs/operators';
import * as R from 'ramda';

import { AppState } from 'modules/reducers';

export const loggingEpic: Epic<AnyAction, AnyAction, AppState> = action$ =>
  action$.pipe(
    tap(action => console.log(action.type)),
    ignoreElements(),
  );

export const epicFactory = <Params, Result, Data = Result, ErrorType = Error>({
  asyncActions,
  request,
  normalizer = R.identity as (result: Result) => Data,
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
        .catch(error =>
          asyncActions.failed({
            params: action.payload,
            error,
          }),
        ),
    ),
    takeUntil(action$.pipe(filter(action => cancelAction.match(action)))),
  );
