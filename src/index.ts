import { from, OperatorFunction, Observable, pipe } from "rxjs";
import { toArray } from "rxjs/operators";

// executeObsducer: for either composed transducers (using this api), or on any observable from arrays!
// composing adds a little overhead/constant, but very flexible. if you're doing a one-off
// array transformation, you can just use executeObsducer (most of the time)

/** Internal Obsducer Function. You can pass it an Observable made from an array to receive an array */
export const executeObsducer = <T>(syncObservable: Observable<T>): Array<T> => {
  let value: Array<T>;
  syncObservable
    .pipe(toArray())
    .subscribe(v => (value = v))
    .unsubscribe();
  return value;
};

/** Creates a transducer out of a pipe of RxJS operator functions.
 * You can pass either one operator function, or compose an arbitrary
 * number of operator functions with a pipe function
 * (recommended pipe function is from RxJS)   */
export const createObsducer = <T, R>(pipe: OperatorFunction<T, R>) => {
  /** A transducer made out RxJS operators.
   * Pass in an array of the input type, which will get transduced into an array of
   *  the output type. This is helpful because each element of the array will go
   * through the pipe individually, without creating intermediate arrays  */
  const inner = function(source: Array<T>) {
    return executeObsducer(from(source).pipe(pipe));
  };
  return inner;
};

// BOTH A PATTERN AND A LIBRARY

// can reuse transducer logic in many contexts!
// it is built for collections! give an example with arary, and with observable
// for example, if you have an observable of arrays, you can map them with a transducer

// e.g.  pipe ajax.getJson (returning arrays) to map(obsducer), and you can reuse the obsducer
// logic on arrays synchronously! "I use a similar approach in data-driven applications such as 4Quarters"

// tap for side effects!
