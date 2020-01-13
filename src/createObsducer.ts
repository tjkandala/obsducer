import { executeObsducer } from "./executeObsducer";
import { from, OperatorFunction } from "rxjs";

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
