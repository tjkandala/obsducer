"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
/** Internal Obsducer Function. You can pass it an Observable made from an array to receive an array */
exports.executeObsducer = function (syncObservable) {
    var value;
    syncObservable
        .pipe(operators_1.toArray())
        .subscribe(function (v) { return (value = v); })
        .unsubscribe();
    return value;
};
