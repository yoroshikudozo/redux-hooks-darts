import * as R from 'ramda';

export function randomSort<T>(arr: T[]) {
  const array = R.clone(arr);
  for (let i = array.length - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }
  return array;
}
