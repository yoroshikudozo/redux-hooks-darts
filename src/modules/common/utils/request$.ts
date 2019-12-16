import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

export const wrap$ = <T, E>(task: Observable<Response>): Observable<T | E> => {
  return task.pipe(
    switchMap(response => {
      if (response.ok) {
        // OK return data
        return of((response.json() as unknown) as T);
      } else {
        // Server is returning a status requiring the client to try something else.
        return (of({
          error: true,
          message: `Error ${response.status}`,
        }) as unknown) as Observable<E>;
      }
    }),
    catchError(err => {
      // Network or other error, handle appropriately
      console.error(err);
      return of(({ error: true, message: err.message } as unknown) as E);
    }),
  );
};

export interface TypedResponse<T = any> extends Response {
  /**
   * this will override `json` method from `Body` that is extended by `Response`
   * interface Body {
   *     json(): Promise<any>;
   * }
   */
  json<P = T>(): Promise<P>;
}

const http$ = <T>(
  input: RequestInfo,
  init?: RequestInit,
): Observable<TypedResponse<T>> => fromFetch(input, init);

export default http$;
