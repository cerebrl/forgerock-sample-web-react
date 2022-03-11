/*
 * @forgerock/javascript-sdk
 *
 * name-callback.ts
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
 * Represents a callback used to collect a username.
 */
var NameCallback = /** @class */ (function (_super) {
    __extends(NameCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function NameCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the callback's prompt.
     */
    NameCallback.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
    };
    /**
     * Sets the username.
     */
    NameCallback.prototype.setName = function (name) {
        this.setInputValue(name);
    };
    return NameCallback;
}(FRCallback));
export default NameCallback;
//# sourceMappingURL=name-callback.js.map