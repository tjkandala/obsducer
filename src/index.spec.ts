import createObsducer from "./index";
import { map, filter, take } from "rxjs/operators";
import { pipe, from } from "rxjs";
import { executeObsducer } from "./executeObsducer";

const beforeArray = [1, 2, 3, 4, 5];
const expectedOutputArray = ["5", "6"];

// projections, predicates
const addOne = (x: number) => x + 1;
const isGreaterThanThree = (x: number) => x > 3;
const numberToString = (x: number) => x.toString();

const firstPipe = pipe(map(addOne), filter(isGreaterThanThree));
const secondPipe = pipe(take(2), map(addOne), map(numberToString));

// testing interface/functionality, not implementation details
test("obsducer produces expected output", () => {
  const obsducer = createObsducer(pipe(firstPipe, secondPipe));
  const outputArray = obsducer(beforeArray);

  expect(outputArray).toStrictEqual(expectedOutputArray);
});

test("executeObsducer works with manually created observables", () => {
  const outputArray = executeObsducer(
    from(beforeArray).pipe(firstPipe, secondPipe)
  );

  expect(outputArray).toStrictEqual(expectedOutputArray);
});
