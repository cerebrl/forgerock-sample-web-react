/*
 * @forgerock/javascript-sdk
 *
 * kba-create-callback.ts
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
 * Represents a callback used to collect KBA-style security questions and answers.
 */
var KbaCreateCallback = /** @class */ (function (_super) {
    __extends(KbaCreateCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function KbaCreateCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the callback prompt.
     */
    KbaCreateCallback.prototype.getPrompt = function () {
        return this.getOutputByName('prompt', '');
    };
    /**
     * Gets the callback's list of pre-defined security questions.
     */
    KbaCreateCallback.prototype.getPredefinedQuestions = function () {
        return this.getOutputByName('predefinedQuestions', []);
    };
    /**
     * Sets the callback's security question.
     */
    KbaCreateCallback.prototype.setQuestion = function (question) {
        this.setValue('question', question);
    };
    /**
     * Sets the callback's security question answer.
     */
    KbaCreateCallback.prototype.setAnswer = function (answer) {
        this.setValue('answer', answer);
    };
    KbaCreateCallback.prototype.setValue = function (type, value) {
        if (!this.payload.input) {
            throw new Error('KBA payload is missing input');
        }
        var input = this.payload.input.find(function (x) { return x.name.endsWith(type); });
        if (!input) {
            throw new Error("No input has name ending in \"".concat(type, "\""));
        }
        input.value = value;
    };
    return KbaCreateCallback;
}(FRCallback));
export default KbaCreateCallback;
//# sourceMappingURL=kba-create-callback.js.map