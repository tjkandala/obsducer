import createObsducer from "./index";
import { map } from "rxjs/operators";

test("create obsducer", () => {
  expect(
    createObsducer(map((x: number) => x + 1))([1, 2, 3, 4, 5])
  ).toStrictEqual([2, 3, 4, 5, 6]);
});
