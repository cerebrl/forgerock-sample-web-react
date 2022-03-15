/*
 * @forgerock/javascript-sdk
 *
 * attribute-input-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import FRCallback from '.';
/**
 * Represents a callback used to collect attributes.
 *
 * @typeparam T Maps to StringAttributeInputCallback, NumberAttributeInputCallback and
 *     BooleanAttributeInputCallback, respectively
 */
var AttributeInputCallback = /** @class */ (function (_super) {
    __extends(AttributeInputCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function AttributeInputCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the attribute name.
     */
    AttributeInputCallback.prototype.getName = function () {
        return this.getOutputByName('name', '');
    };
    /**
     * Gets the attribute prompt.
     */
    AttributeInputCallback.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
    };
    /**
     * Gets whether the attribute is required.
     */
    AttributeInputCallback.prototype.isRequired = function () {
        return this.getOutputByName('required', false);
    };
    /**
     * Gets the callback's failed policies.
     */
    AttributeInputCallback.prototype.getFailedPolicies = function () {
        return this.getOutputByName('failedPolicies', []);
    };
    /**
     * Gets the callback's applicable policies.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AttributeInputCallback.prototype.getPolicies = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.getOutputByName('policies', {});
    };
    /**
     * Set if validating value only.
     */
    AttributeInputCallback.prototype.setValidateOnly = function (value) {
        this.setInputValue(value, /validateOnly/);
    };
    /**
     * Sets the attribute's value.
     */
    AttributeInputCallback.prototype.setValue = function (value) {
        this.setInputValue(value);
    };
    return AttributeInputCallback;
}(FRCallback));
export default AttributeInputCallback;
//# sourceMappingURL=attribute-input-callback.js.map