# obsducer

## Motivation

## Install

```
$ npm i obsducer
```

## Performance

Benchmark code: `src/benchmark.ts`

Performing 4 operations on an array with 10,000,000 elements is almost as fast on average with an obsducer as with a for loop. On many iterations of my benchmark, the obsducer method was actually faster than the for loop. The small overhead in creating an observable has no statistically significant impact on performance compared to for loops for huge arrays.

<img src="https://user-images.githubusercontent.com/37420160/72314889-a158d280-365e-11ea-9c12-adba34e749ba.png" height="400" width="400">

For arrays with 100,000 elements, the obsducer method is slightly slower than a for loop. This is probably due to  However, it still easily beats array method chaining performance-wise, and .

<img src="https://user-images.githubusercontent.com/37420160/72314881-97cf6a80-365e-11ea-8bbe-736b456fde94.png" height="400" width="400">

You probably wouldn't be thinking about optimizing your code when manipulating arrays of 10 elements... but if you find yourself in that situation, you should stick to native array method chaining, or even to for loops if you're really short on resources.

<img src="https://user-images.githubusercontent.com/37420160/72314859-8b4b1200-365e-11ea-8a5b-61a68b85e8a3.png" height="400" width="400">


## Usage

### Why you'd use obsducer:
1) You have many array transformations that could be generalized and composed 
2) You are transforming a very big array
3) Both of the above

### Ways to use obsducer: 

1) executeObsducer: create observable from array, pipe all the operators you need, and immediately execute. Do this if you know you're only going to use this exact transducer/transformation in one place. You still get the performance advantage over native array method chaining, but you lose a little bit of (subjective) readability.


```js
import createObsducer, { executeObsducer } from "obsducer";
import { pipe, from } from "rxjs"

// projections, predicates
const addOne = (x: number) => x + 1;
const isGreaterThanThree = (x: number) => x > 3;
const numberToString = (x: number) => x.toString();

const firstPipe = pipe(map(addOne), filter(isGreaterThanThree));
const secondPipe = pipe(take(2), map(addOne), map(numberToString));

const beforeArray = [1, 2, 3, 4, 5]

// standard method
const myFunObsducer = createObsducer(pipe(firstPipe, secondPipe))
const result = myFunObsducer(beforeArray);

// using internal execution function
const result = executeObsducer(
    from(beforeArray).pipe(firstPipe, secondPipe)
  );
```

## API Reference

## Credits/Prior Art
