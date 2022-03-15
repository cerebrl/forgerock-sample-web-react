/*
 * @forgerock/javascript-sdk
 *
 * fr-step.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import createCallback from './callbacks/factory';
import { StepType } from './enums';
/**
 * Represents a single step of an authentication tree.
 */
var FRStep = /** @class */ (function () {
    /**
     * @param payload The raw payload returned by OpenAM
     * @param callbackFactory A function that returns am implementation of FRCallback
     */
    function FRStep(payload, callbackFactory) {
        this.payload = payload;
        /**
         * The type of step.
         */
        this.type = StepType.Step;
        /**
         * The callbacks contained in this step.
         */
        this.callbacks = [];
        if (payload.callbacks) {
            this.callbacks = this.convertCallbacks(payload.callbacks, callbackFactory);
        }
    }
    /**
     * Gets the first callback of the specified type in this step.
     *
     * @param type The type of callback to find.
     */
    FRStep.prototype.getCallbackOfType = function (type) {
        var callbacks = this.getCallbacksOfType(type);
        if (callbacks.length !== 1) {
            throw new Error("Expected 1 callback of type \"".concat(type, "\", but found ").concat(callbacks.length));
        }
        return callbacks[0];
    };
    /**
     * Gets all callbacks of the specified type in this step.
     *
     * @param type The type of callback to find.
     */
    FRStep.prototype.getCallbacksOfType = function (type) {
        return this.callbacks.filter(function (x) { return x.getType() === type; });
    };
    /**
     * Sets the value of the first callback of the specified type in this step.
     *
     * @param type The type of callback to find.
     * @param value The value to set for the callback.
     */
    FRStep.prototype.setCallbackValue = function (type, value) {
        var callbacks = this.getCallbacksOfType(type);
        if (callbacks.length !== 1) {
            throw new Error("Expected 1 callback of type \"".concat(type, "\", but found ").concat(callbacks.length));
        }
        callbacks[0].setInputValue(value);
    };
    /**
     * Gets the step's description.
     */
    FRStep.prototype.getDescription = function () {
        return this.payload.description;
    };
    /**
     * Gets the step's header.
     */
    FRStep.prototype.getHeader = function () {
        return this.payload.header;
    };
    /**
     * Gets the step's stage.
     */
    FRStep.prototype.getStage = function () {
        return this.payload.stage;
    };
    FRStep.prototype.convertCallbacks = function (callbacks, callbackFactory) {
        var converted = callbacks.map(function (x) {
            // This gives preference to the provided factory and falls back to our default implementation
            return (callbackFactory || createCallback)(x) || createCallback(x);
        });
        return converted;
    };
    return FRStep;
}());
export default FRStep;
//# sourceMappingURL=fr-step.js.map