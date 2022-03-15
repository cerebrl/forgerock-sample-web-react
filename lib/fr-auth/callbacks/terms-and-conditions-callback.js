/*
 * @forgerock/javascript-sdk
 *
 * terms-and-conditions-callback.ts
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
 * Represents a callback used to collect acceptance of terms and conditions.
 */
var TermsAndConditionsCallback = /** @class */ (function (_super) {
    __extends(TermsAndConditionsCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function TermsAndConditionsCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the terms and conditions content.
     */
    TermsAndConditionsCallback.prototype.getTerms = function () {
        return this.getOutputByName('terms', '');
    };
    /**
     * Gets the version of the terms and conditions.
     */
    TermsAndConditionsCallback.prototype.getVersion = function () {
        return this.getOutputByName('version', '');
    };
    /**
     * Gets the date of the terms and conditions.
     */
    TermsAndConditionsCallback.prototype.getCreateDate = function () {
        var date = this.getOutputByName('createDate', '');
        return new Date(date);
    };
    /**
     * Sets the callback's acceptance.
     */
    TermsAndConditionsCallback.prototype.setAccepted = function (accepted) {
        if (accepted === void 0) { accepted = true; }
        this.setInputValue(accepted);
    };
    return TermsAndConditionsCallback;
}(FRCallback));
export default TermsAndConditionsCallback;
//# sourceMappingURL=terms-and-conditions-callback.js.map