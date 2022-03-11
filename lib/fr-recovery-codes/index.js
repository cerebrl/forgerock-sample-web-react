/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { CallbackType } from '../auth/enums';
import { parseDisplayRecoveryCodesText } from './script-parser';
/**
 * Utility for handling recovery code nodes.
 *
 * Example:
 *
 * ```js
 * // Determine if step is Display Recovery Codes step
 * const isDisplayRecoveryCodesStep = FRRecoveryCodes.isDisplayStep(step);
 * if (isDisplayRecoveryCodesStep) {
 *   const recoveryCodes = FRRecoveryCodes.getCodes(step);
 *   // Do the UI needful
 * }
 * ```
 */
var FRRecoveryCodes = /** @class */ (function () {
    function FRRecoveryCodes() {
    }
    /**
     * Retrieves the recovery codes by parsing the JavaScript message text in callback.
     *
     * @param step The step to evaluate
     * @return Recovery Code values in array
     */
    FRRecoveryCodes.getCodes = function (step) {
        var _a;
        var text = (_a = this.getDisplayCallback(step)) === null || _a === void 0 ? void 0 : _a.getOutputByName('message', '');
        return parseDisplayRecoveryCodesText(text || '');
    };
    /**
     * Determines if the given step is a Display Recovery Codes step.
     *
     * @param step The step to evaluate
     * @return Is this step a Display Recovery Codes step
     */
    FRRecoveryCodes.isDisplayStep = function (step) {
        return !!this.getDisplayCallback(step);
    };
    /**
     * Gets the recovery codes step.
     *
     * @param step The step to evaluate
     * @return gets the Display Recovery Codes' callback
     */
    FRRecoveryCodes.getDisplayCallback = function (step) {
        return step
            .getCallbacksOfType(CallbackType.TextOutputCallback)
            .find(function (x) {
            var cb = x.getOutputByName('message', undefined);
            return cb && (cb.includes('Recovery Codes') || cb.includes('recovery codes'));
        });
    };
    return FRRecoveryCodes;
}());
export default FRRecoveryCodes;
//# sourceMappingURL=index.js.map