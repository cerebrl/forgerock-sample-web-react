/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Base class for authentication tree callback wrappers.
 */
var FRCallback = /** @class */ (function () {
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function FRCallback(payload) {
        this.payload = payload;
    }
    /**
     * Gets the name of this callback type.
     */
    FRCallback.prototype.getType = function () {
        return this.payload.type;
    };
    /**
     * Gets the value of the specified input element, or the first element if `selector` is not
     * provided.
     *
     * @param selector The index position or name of the desired element
     */
    FRCallback.prototype.getInputValue = function (selector) {
        if (selector === void 0) { selector = 0; }
        return this.getArrayElement(this.payload.input, selector).value;
    };
    /**
     * Sets the value of the specified input element, or the first element if `selector` is not
     * provided.
     *
     * @param selector The index position or name of the desired element
     */
    FRCallback.prototype.setInputValue = function (value, selector) {
        if (selector === void 0) { selector = 0; }
        this.getArrayElement(this.payload.input, selector).value = value;
    };
    /**
     * Gets the value of the specified output element, or the first element if `selector`
     * is not provided.
     *
     * @param selector The index position or name of the desired element
     */
    FRCallback.prototype.getOutputValue = function (selector) {
        if (selector === void 0) { selector = 0; }
        return this.getArrayElement(this.payload.output, selector).value;
    };
    /**
     * Gets the value of the first output element with the specified name or the
     * specified default value.
     *
     * @param name The name of the desired element
     */
    FRCallback.prototype.getOutputByName = function (name, defaultValue) {
        var output = this.payload.output.find(function (x) { return x.name === name; });
        return output ? output.value : defaultValue;
    };
    FRCallback.prototype.getArrayElement = function (array, selector) {
        if (selector === void 0) { selector = 0; }
        if (array === undefined) {
            throw new Error("No NameValue array was provided to search (selector ".concat(selector, ")"));
        }
        if (typeof selector === 'number') {
            if (selector < 0 || selector > array.length - 1) {
                throw new Error("Selector index ".concat(selector, " is out of range"));
            }
            return array[selector];
        }
        if (typeof selector === 'string') {
            var input = array.find(function (x) { return x.name === selector; });
            if (!input) {
                throw new Error("Missing callback input entry \"".concat(selector, "\""));
            }
            return input;
        }
        // Duck typing for RegEx
        if (typeof selector === 'object' && selector.test && selector.exec) {
            var input = array.find(function (x) { return selector.test(x.name); });
            if (!input) {
                throw new Error("Missing callback input entry \"".concat(selector, "\""));
            }
            return input;
        }
        throw new Error('Invalid selector value type');
    };
    return FRCallback;
}());
export default FRCallback;
//# sourceMappingURL=index.js.map