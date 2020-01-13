import { Observable } from "rxjs";
/** Internal Obsducer Function. You can pass it an Observable made from an array to receive an array */
export declare const executeObsducer: <T>(syncObservable: Observable<T>) => T[];
