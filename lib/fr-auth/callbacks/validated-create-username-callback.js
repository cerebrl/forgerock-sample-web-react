/*
 * @forgerock/javascript-sdk
 *
 * validated-create-username-callback.ts
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
 * Represents a callback used to collect a valid platform username.
 */
var ValidatedCreateUsernameCallback = /** @class */ (function (_super) {
    __extends(ValidatedCreateUsernameCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function ValidatedCreateUsernameCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the callback's prompt.
     */
    ValidatedCreateUsernameCallback.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
    };
    /**
     * Gets the callback's failed policies.
     */
    ValidatedCreateUsernameCallback.prototype.getFailedPolicies = function () {
        return this.getOutputByName('failedPolicies', []);
    };
    /**
     * Gets the callback's applicable policies.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ValidatedCreateUsernameCallback.prototype.getPolicies = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.getOutputByName('policies', {});
    };
    /**
     * Gets whether the username is required.
     */
    ValidatedCreateUsernameCallback.prototype.isRequired = function () {
        return this.getOutputByName('required', false);
    };
    /**
     * Sets the callback's username.
     */
    ValidatedCreateUsernameCallback.prototype.setName = function (name) {
        this.setInputValue(name);
    };
    /**
     * Set if validating value only.
     */
    ValidatedCreateUsernameCallback.prototype.setValidateOnly = function (value) {
        this.setInputValue(value, /validateOnly/);
    };
    return ValidatedCreateUsernameCallback;
}(FRCallback));
export default ValidatedCreateUsernameCallback;
//# sourceMappingURL=validated-create-username-callback.js.map