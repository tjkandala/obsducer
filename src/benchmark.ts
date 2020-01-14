import { performance } from "perf_hooks";
import { createObsducer } from "./createObsducer";
import { pipe } from "rxjs";
import { map, filter } from "rxjs/operators";

const benchmark = (name: string, tries: number, fn: Function) => {
  let times = [];
  for (let i = 0; i < tries; i++) {
    const t1 = performance.now();
    fn();
    const t2 = performance.now();
    times.push(t2 - t1);
  }
  console.log(
    `${name} took ${times.reduce((acc, v) => acc + v, 0) /
      times.length}ms on average (${exampleSource.length} elements) (${
      times.length
    } tries)`
  );
  console.log(times);
};

const exampleSource: number[] = Array(10000000).fill(1);

const addOne = (x: number) => x + 1;
const greaterThanOne = (x: number) => x > 1;
const numberToString = (x: number) => x.toString();
const concatHi = (x: string) => x + " hi";

const arrayMethodChaining = (source: Array<number>) => () =>
  source
    .map(addOne)
    .filter(greaterThanOne)
    .map(numberToString)
    .map(concatHi);

// yuck! not declarative at all, hard to scan over! also less type-safe
// however, this destroys array method chaining performance-wise
const forLoop = (source: Array<number>) => () => {
  let arr = [];
  for (let i = 0; i < source.length; i++) {
    let item: any = source[i] + 1;
    if (item > 1) {
      item = item.toString();
      item = item + " hi";
      arr.push(item);
    }
  }
  return arr;
};

// best of both worlds!
const ops = pipe(
  map(addOne),
  filter(greaterThanOne),
  map(numberToString),
  map(concatHi)
);

const myFunObsducer = createObsducer(ops);

const obsducerMethod = (source: Array<number>) => () => myFunObsducer(source);

export default {
  benchmarks: () => {
    benchmark("array chaining", 10, arrayMethodChaining(exampleSource));
    benchmark("for loop", 10, forLoop(exampleSource));
    benchmark("obsducer method", 10, obsducerMethod(exampleSource));
  }
};
