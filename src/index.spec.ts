import createObsducer from "./index";
import { map } from "rxjs/operators";

// testing interface/functionality, not implementation details
test("create obsducer", () => {
  expect(
    createObsducer(map((x: number) => x + 1))([1, 2, 3, 4, 5])
  ).toStrictEqual([2, 3, 4, 5, 6]);
});
