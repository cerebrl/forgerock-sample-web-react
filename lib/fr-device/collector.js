/*
 * @forgerock/javascript-sdk
 *
 * collector.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * @class Collector - base class for FRDevice
 * Generic collector functions for collecting a device profile attributes
 */
var Collector = /** @class */ (function () {
    function Collector() {
    }
    /**
     * @method reduceToObject - goes one to two levels into source to collect attribute
     * @param props - array of strings; can use dot notation for two level lookup
     * @param src - source of attributes to check
     */
    // eslint-disable-next-line
    Collector.prototype.reduceToObject = function (props, src) {
        return props.reduce(function (prev, curr) {
            if (curr.includes('.')) {
                var propArr = curr.split('.');
                var prop1 = propArr[0];
                var prop2 = propArr[1];
                var prop = src[prop1] && src[prop1][prop2];
                prev[prop2] = prop != undefined ? prop : '';
            }
            else {
                prev[curr] = src[curr] != undefined ? src[curr] : null;
            }
            return prev;
        }, {});
    };
    /**
     * @method reduceToString - goes one level into source to collect attribute
     * @param props - array of strings
     * @param src - source of attributes to check
     */
    // eslint-disable-next-line
    Collector.prototype.reduceToString = function (props, src) {
        return props.reduce(function (prev, curr) {
            prev = "".concat(prev).concat(src[curr].filename, ";");
            return prev;
        }, '');
    };
    return Collector;
}());
export default Collector;
//# sourceMappingURL=collector.js.map