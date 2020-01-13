"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var operators_1 = require("rxjs/operators");
test("create obsducer", function () {
    expect(index_1.createObsducer(operators_1.map(function (x) { return x + 1; }))([1, 2, 3, 4, 5])).toStrictEqual([2, 3, 4, 5, 6]);
});
