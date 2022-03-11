/*
 * @forgerock/javascript-sdk
 *
 * password-callback.ts
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
 * Represents a callback used to collect a password.
 */
var PasswordCallback = /** @class */ (function (_super) {
    __extends(PasswordCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function PasswordCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the callback's failed policies.
     */
    PasswordCallback.prototype.getFailedPolicies = function () {
        return this.getOutputByName('failedPolicies', []);
    };
    /**
     * Gets the callback's applicable policies.
     */
    PasswordCallback.prototype.getPolicies = function () {
        return this.getOutputByName('policies', []);
    };
    /**
     * Gets the callback's prompt.
     */
    PasswordCallback.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
    };
    /**
     * Sets the password.
     */
    PasswordCallback.prototype.setPassword = function (password) {
        this.setInputValue(password);
    };
    return PasswordCallback;
}(FRCallback));
export default PasswordCallback;
//# sourceMappingURL=password-callback.js.map