import { OperatorFunction } from "rxjs";
/** Creates a transducer out of a pipe of RxJS operator functions.
 * You can pass either one operator function, or compose an arbitrary
 * number of operator functions with a pipe function
 * (recommended pipe function is from RxJS)   */
export declare const createObsducer: <T, R>(pipe: OperatorFunction<T, R>) => (source: T[]) => R[];
