import actionCreatorFactory from 'typescript-fsa';

import { DartsResponse } from 'modules/darts/types';
import { dartListSchema } from 'modules/darts/schema';
import { CallApiActionArgs } from 'modules/middlewares/api';

const actionCreator = actionCreatorFactory('DARTS');

export function callApiActionCreator<P, R, E>({
  requestType,
  name,
  endpoint = undefined,
  asyncActions,
  schema,
}: CallApiActionArgs<P, R, E>) {
  return function<P>(params: P) {
    return {
      type: 'CALL_API' as const,
      payload: params,
      meta: {
        name,
        requestType,
        endpoint,
        asyncActions,
        schema,
      },
    };
  };
}

export const fetchDarts = callApiActionCreator<
  { gameId: string },
  DartsResponse,
  string
>({
  requestType: 'fetch',
  name: 'darts',
  asyncActions: actionCreator.async('FETCH'),
  schema: dartListSchema,
});
