import { Observable } from "rxjs";
import { toArray } from "rxjs/operators";

/** Internal Obsducer Function. You can pass it an Observable made from an array to receive an array */
export const executeObsducer = <T>(syncObservable: Observable<T>): Array<T> => {
  let value: Array<T>;
  syncObservable
    .pipe(toArray())
    .subscribe(v => (value = v))
    .unsubscribe();
  return value;
};
