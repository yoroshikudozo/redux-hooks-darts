import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

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

declare function fetch<T>(...args: any): Promise<TypedResponse<T>>;

export function fromFetch<T>(
  input: string | Request,
  init?: RequestInit,
): Observable<TypedResponse<T>> {
  return new Observable<Response>(subscriber => {
    const controller = new AbortController();
    const signal = controller.signal;
    let outerSignalHandler: () => void;
    let abortable = true;
    let unsubscribed = false;

    if (init) {
      // If a signal is provided, just have it teardown. It's a cancellation token, basically.
      if (init.signal) {
        outerSignalHandler = () => {
          if (!signal.aborted) {
            controller.abort();
          }
        };
        init.signal.addEventListener('abort', outerSignalHandler);
      }
      init.signal = signal;
    } else {
      init = { signal };
    }

    fetch<T>(input, init)
      .then(response => {
        abortable = false;
        subscriber.next(response);
        subscriber.complete();
      })
      .catch(err => {
        abortable = false;
        if (!unsubscribed) {
          // Only forward the error if it wasn't an abort.
          subscriber.error(err);
        }
      });

    return () => {
      unsubscribed = true;
      if (abortable) {
        controller.abort();
      }
    };
  });
}

const http$ = <T = any, E = any>(input: RequestInfo, init?: RequestInit) =>
  fromFetch<T>(input, init);

export default http$;
