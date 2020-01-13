"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var executeObsducer_1 = require("./executeObsducer");
var rxjs_1 = require("rxjs");
/** Creates a transducer out of a pipe of RxJS operator functions.
 * You can pass either one operator function, or compose an arbitrary
 * number of operator functions with a pipe function
 * (recommended pipe function is from RxJS)   */
exports.createObsducer = function (pipe) {
    /** A transducer made out RxJS operators.
     * Pass in an array of the input type, which will get transduced into an array of
     *  the output type. This is helpful because each element of the array will go
     * through the pipe individually, without creating intermediate arrays  */
    var inner = function (source) {
        return executeObsducer_1.executeObsducer(rxjs_1.from(source).pipe(pipe));
    };
    return inner;
};
