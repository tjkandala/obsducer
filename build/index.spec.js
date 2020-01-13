"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var operators_1 = require("rxjs/operators");
test("create obsducer", function () {
    expect(index_1.default(operators_1.map(function (x) { return x + 1; }))([1, 2, 3, 4, 5])).toStrictEqual([2, 3, 4, 5, 6]);
});
