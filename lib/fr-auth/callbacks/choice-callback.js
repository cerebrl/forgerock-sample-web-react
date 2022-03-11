/*
 * @forgerock/javascript-sdk
 *
 * choice-callback.ts
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
var ChoiceCallback = /** @class */ (function (_super) {
    __extends(ChoiceCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function ChoiceCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the choice's prompt.
     */
    ChoiceCallback.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
    };
    /**
     * Gets the choice's default answer.
     */
    ChoiceCallback.prototype.getDefaultChoice = function () {
        return this.getOutputByName('defaultChoice', 0);
    };
    /**
     * Gets the choice's possible answers.
     */
    ChoiceCallback.prototype.getChoices = function () {
        return this.getOutputByName('choices', []);
    };
    /**
     * Sets the choice's answer by index position.
     */
    ChoiceCallback.prototype.setChoiceIndex = function (index) {
        var length = this.getChoices().length;
        if (index < 0 || index > length - 1) {
            throw new Error("".concat(index, " is out of bounds"));
        }
        this.setInputValue(index);
    };
    /**
     * Sets the choice's answer by value.
     */
    ChoiceCallback.prototype.setChoiceValue = function (value) {
        var index = this.getChoices().indexOf(value);
        if (index === -1) {
            throw new Error("\"".concat(value, "\" is not a valid choice"));
        }
        this.setInputValue(index);
    };
    return ChoiceCallback;
}(FRCallback));
export default ChoiceCallback;
//# sourceMappingURL=choice-callback.js.map