/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { PolicyKey } from './enums';
import defaultMessageCreator from './message-creator';
/**
 * Utility for processing policy failures into human readable messages.
 *
 * Example:
 *
 * ```js
 * // Create message overrides and extensions as needed
 * const messageCreator = {
 *   [PolicyKey.unique]: (property: string) => (
 *     `this is a custom message for "UNIQUE" policy of ${property}`
 *   ),
 *   CUSTOM_POLICY: (property: string, params: any) => (
 *     `this is a custom message for "${params.policyRequirement}" policy of ${property}`
 *   ),
 * };
 *
 * const thisStep = await FRAuth.next(previousStep);
 *
 * if (thisStep.type === StepType.LoginFailure) {
 *   const messagesStepMethod = thisStep.getProcessedMessage(messageCreator);
 *   const messagesClassMethod = FRPolicy.parseErrors(thisStep, messageCreator)
 * }
 */
var FRPolicy = /** @class */ (function () {
    function FRPolicy() {
    }
    /**
     * Parses policy errors and generates human readable error messages.
     *
     * @param {Step} err The step containing the error.
     * @param {MessageCreator} messageCreator
     * Extensible and overridable custom error messages for policy failures.
     * @return {ProcessedPropertyError[]} Array of objects containing all processed policy errors.
     */
    FRPolicy.parseErrors = function (err, messageCreator) {
        var _this = this;
        var errors = [];
        if (err.detail && err.detail.failedPolicyRequirements) {
            err.detail.failedPolicyRequirements.map(function (x) {
                errors.push.apply(errors, [
                    {
                        detail: x,
                        messages: _this.parseFailedPolicyRequirement(x, messageCreator),
                    },
                ]);
            });
        }
        return errors;
    };
    /**
     * Parses a failed policy and returns a string array of error messages.
     *
     * @param {FailedPolicyRequirement} failedPolicy The detail data of the failed policy.
     * @param {MessageCreator} customMessage
     * Extensible and overridable custom error messages for policy failures.
     * @return {string[]} Array of strings with all processed policy errors.
     */
    FRPolicy.parseFailedPolicyRequirement = function (failedPolicy, messageCreator) {
        var _this = this;
        var errors = [];
        failedPolicy.policyRequirements.map(function (policyRequirement) {
            errors.push(_this.parsePolicyRequirement(failedPolicy.property, policyRequirement, messageCreator));
        });
        return errors;
    };
    /**
     * Parses a policy error into a human readable error message.
     *
     * @param {string} property The property with the policy failure.
     * @param {PolicyRequirement} policy The policy failure data.
     * @param {MessageCreator} customMessage
     * Extensible and overridable custom error messages for policy failures.
     * @return {string} Human readable error message.
     */
    FRPolicy.parsePolicyRequirement = function (property, policy, messageCreator) {
        if (messageCreator === void 0) { messageCreator = {}; }
        // AM is returning policy requirement failures as JSON strings
        var policyObject = typeof policy === 'string' ? JSON.parse(policy) : __assign({}, policy);
        var policyRequirement = policyObject.policyRequirement;
        // Determine which message creator function to use
        var effectiveMessageCreator = messageCreator[policyRequirement] ||
            defaultMessageCreator[policyRequirement] ||
            defaultMessageCreator[PolicyKey.UnknownPolicy];
        // Flatten the parameters and create the message
        var params = policyObject.params
            ? __assign(__assign({}, policyObject.params), { policyRequirement: policyRequirement }) : { policyRequirement: policyRequirement };
        var message = effectiveMessageCreator(property, params);
        return message;
    };
    return FRPolicy;
}());
export default FRPolicy;
export { PolicyKey };
//# sourceMappingURL=index.js.map