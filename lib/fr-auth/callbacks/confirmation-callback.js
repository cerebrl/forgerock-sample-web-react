/*
 * @forgerock/javascript-sdk
 *
 * confirmation-callback.ts
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
 * Represents a callback used to collect a confirmation to a message.
 */
var ConfirmationCallback = /** @class */ (function (_super) {
    __extends(ConfirmationCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function ConfirmationCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the index position of the confirmation's default answer.
     */
    ConfirmationCallback.prototype.getDefaultOption = function () {
        return Number(this.getOutputByName('defaultOption', 0));
    };
    /**
     * Gets the confirmation's message type.
     */
    ConfirmationCallback.prototype.getMessageType = function () {
        return Number(this.getOutputByName('messageType', 0));
    };
    /**
     * Gets the confirmation's possible answers.
     */
    ConfirmationCallback.prototype.getOptions = function () {
        return this.getOutputByName('options', []);
    };
    /**
     * Gets the confirmation's option type.
     */
    ConfirmationCallback.prototype.getOptionType = function () {
        return Number(this.getOutputByName('optionType', 0));
    };
    /**
     * Gets the confirmation's prompt.
     */
    ConfirmationCallback.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
    };
    /**
     * Set option index.
     */
    ConfirmationCallback.prototype.setOptionIndex = function (index) {
        if (index !== 0 && index !== 1) {
            throw new Error("\"".concat(index, "\" is not a valid choice"));
        }
        this.setInputValue(index);
    };
    /**
     * Set option value.
     */
    ConfirmationCallback.prototype.setOptionValue = function (value) {
        var index = this.getOptions().indexOf(value);
        if (index === -1) {
            throw new Error("\"".concat(value, "\" is not a valid choice"));
        }
        this.setInputValue(index);
    };
    return ConfirmationCallback;
}(FRCallback));
export default ConfirmationCallback;
//# sourceMappingURL=confirmation-callback.js.map