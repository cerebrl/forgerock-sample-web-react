/*
 * @forgerock/javascript-sdk
 *
 * select-idp-callback.ts
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
 * Represents a callback used to collect an answer to a choice.
 */
var SelectIdPCallback = /** @class */ (function (_super) {
    __extends(SelectIdPCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function SelectIdPCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the available providers.
     */
    SelectIdPCallback.prototype.getProviders = function () {
        return this.getOutputByName('providers', []);
    };
    /**
     * Sets the provider by name.
     */
    SelectIdPCallback.prototype.setProvider = function (value) {
        var item = this.getProviders().find(function (item) { return item.provider === value; });
        if (!item) {
            throw new Error("\"".concat(value, "\" is not a valid choice"));
        }
        this.setInputValue(item.provider);
    };
    return SelectIdPCallback;
}(FRCallback));
export default SelectIdPCallback;
//# sourceMappingURL=select-idp-callback.js.map