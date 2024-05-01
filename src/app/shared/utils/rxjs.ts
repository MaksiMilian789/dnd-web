import { Observable, merge, scan, filter, map } from 'rxjs';

export function combineReload<T>(
  value$: Observable<T>,
  reload$: Observable<void>
): Observable<T> {
  return merge(value$, reload$).pipe(
    scan((oldValue, currentValue) => currentValue ?? oldValue),
    filter((value) => value != null),
    map((value) => value as T)
  );
}