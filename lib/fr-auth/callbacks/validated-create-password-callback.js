/*
 * @forgerock/javascript-sdk
 *
 * validated-create-password-callback.ts
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
 * Represents a callback used to collect a valid platform password.
 */
var ValidatedCreatePasswordCallback = /** @class */ (function (_super) {
    __extends(ValidatedCreatePasswordCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function ValidatedCreatePasswordCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the callback's failed policies.
     */
    ValidatedCreatePasswordCallback.prototype.getFailedPolicies = function () {
        return this.getOutputByName('failedPolicies', []);
    };
    /**
     * Gets the callback's applicable policies.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ValidatedCreatePasswordCallback.prototype.getPolicies = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.getOutputByName('policies', {});
    };
    /**
     * Gets the callback's prompt.
     */
    ValidatedCreatePasswordCallback.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
    };
    /**
     * Gets whether the password is required.
     */
    ValidatedCreatePasswordCallback.prototype.isRequired = function () {
        return this.getOutputByName('required', false);
    };
    /**
     * Sets the callback's password.
     */
    ValidatedCreatePasswordCallback.prototype.setPassword = function (password) {
        this.setInputValue(password);
    };
    /**
     * Set if validating value only.
     */
    ValidatedCreatePasswordCallback.prototype.setValidateOnly = function (value) {
        this.setInputValue(value, /validateOnly/);
    };
    return ValidatedCreatePasswordCallback;
}(FRCallback));
export default ValidatedCreatePasswordCallback;
//# sourceMappingURL=validated-create-password-callback.js.map