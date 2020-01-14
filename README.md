# obsducer

<img src="https://user-images.githubusercontent.com/37420160/72317608-d289d080-3667-11ea-91c7-381064d467d7.png" width="400">
<img src="https://user-images.githubusercontent.com/37420160/72317615-d61d5780-3667-11ea-8f2e-6a40c25532d8.png" width="400">


## Motivation

## Install

```
$ npm i obsducer
```

## How it Works

`createObsducer` takes a pipeline of RxJS operators and returns a transducer (obsducer?) that efficiently transforms an array.

RxJS operators (e.g. map, filter, takeLast) return unary functions; they take an Observable, and they return an Observable.  Some operators, like map and reduce, need to be called with callbacks (e.g. projections, predicates, reducers) which will be applied to each value that passes through. 

You can create pipelines with any pipe function, but I recommend RxJS's static pipe function because it comes with Typescript function overloads for up to 9 piped functions. Typing variadic functions in Typescript is tedious, so it is very convenient to be able to pipe any amount of operators with RxJS `pipe`

```ts
import { pipe } from 'rxjs'

const firstPipedOps = pipe(
    map(addOne), map(addOne), map(addOne), map(addOne),
    map(addOne), map(addOne), map(addOne), map(addOne),
);
const secondPipedOps = pipe(
    map(subtractOne), map(subtractOne), map(subtractOne), map(subtractOne),
    map(subtractOne), map(subtractOne), map(subtractOne), map(subtractOne),
);
// Even though we're piping 16 operators, Typescript can infer the types with this method!
const bothPipedOps = pipe(firstPipedOps, secondPipedOps);
```

Obsducers abstract away the process of observable creation, subscription, value retrieval, and unsubscription to allow you to think in terms of data transformations. They give you the readability of functional array methods such as map and reduce, but with more reusability/composability (array method chains are specific to the place you define them) and better performance (no intermediate array creation; each value passes through the pipeline like a conveyer belt).

## Usage

### Why you'd use obsducer:
1) You have many array transformations that could be generalized and composed 
2) You are transforming a very big array
3) Both of the above

### Ways to use obsducer: 

* createObsducer from . While this is a contrived example, it demonstrates the value proposition of obsducer. Reuse pipelines (TODO: link to real world use) (recommended approach) 

```ts
import createObsducer from "obsducer";
import { pipe } from "rxjs";
import { map, filter, take } from "rxjs/operators";

// projections, predicates
const addOne = (x: number) => x + 1;
const isGreaterThanThree = (x: number) => x > 3;
const numberToString = (x: number) => x.toString();

const firstPipedOps = pipe(
    map(addOne), 
    filter(isGreaterThanThree)
);

const secondPipedOps = pipe(
    take(2), 
    map(addOne), 
    map(numberToString)
);

const bothPipedOps = pipe(
    firstPipe, 
    secondPipe
);

const beforeArrayA = [1, 2, 3, 4, 5];
const beforeArrayB = [0, 1, 2, 3, 4];

// pass different pipes and combinations of pipe to create reusable transducers
const obsducer1 = createObsducer(firstPipedOps);
const obsducer2 = createObsducer(secondPipedOps);
const obsducer3 = createObsducer(bothPipedOps);

// result1A: [4, 5, 6]
const result1A = obsducer1(beforeArrayA);
const result1B = obsducer1(beforeArrayB);
// result2A: ["1", "2"];
const result2A = obsducer2(beforeArrayA);
const result2B = obsducer2(beforeArrayB);
// result3A: []
const result3A = obsducer3(beforeArrayA);
const result3B = obsducer3(beforeArrayB);
```

* executeObsducer: create observable from array, pipe all the operators you need, and immediately execute. Do this if you know you're only going to use this exact transducer/transformation in one place. You still get the performance advantage over native array method chaining, but you lose a little bit of (subjective) readability.

```ts
import { executeObsducer } from "obsducer";
import { from } from "rxjs"
import { map, filter, take } from "rxjs/operators";

// using internal execution function
const result = executeObsducer(
    from(beforeArray).pipe(
        map(addOne), 
        filter(isGreaterThanThree),
        take(2), 
        map(addOne), 
        map(numberToString)
    )
  );
```

## Performance

Benchmark code: `src/benchmark.ts`

Performing 4 operations on an array with 10,000,000 elements is almost as fast on average with an obsducer as with a for loop. On many iterations of my benchmark, the obsducer method was actually faster than the for loop. The small overhead in creating an observable has no statistically significant impact on performance compared to for loops for huge arrays.

<img src="https://user-images.githubusercontent.com/37420160/72314889-a158d280-365e-11ea-9c12-adba34e749ba.png" height="400" width="400">

For arrays with 100,000 elements, the obsducer method is slightly slower than a for loop. This is probably due to  However, it still easily beats array method chaining performance-wise, and .

<img src="https://user-images.githubusercontent.com/37420160/72314881-97cf6a80-365e-11ea-8bbe-736b456fde94.png" height="400" width="400">

You probably wouldn't be thinking about optimizing your code when manipulating arrays of 10 elements... but if you find yourself in that situation, you should stick to native array method chaining or loops. I still use obsducer for small-ish arrays to take advantage of RxJS operators.

<img src="https://user-images.githubusercontent.com/37420160/72314859-8b4b1200-365e-11ea-8a5b-61a68b85e8a3.png" height="400" width="400">

## API Reference

## Credits/Prior Art
