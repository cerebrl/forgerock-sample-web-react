/*
 * @forgerock/javascript-sdk
 *
 * fr-login-failure.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import FRPolicy from '../fr-policy';
import { StepType } from './enums';
var FRLoginFailure = /** @class */ (function () {
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function FRLoginFailure(payload) {
        this.payload = payload;
        /**
         * The type of step.
         */
        this.type = StepType.LoginFailure;
    }
    /**
     * Gets the error code.
     */
    FRLoginFailure.prototype.getCode = function () {
        return Number(this.payload.code);
    };
    /**
     * Gets the failure details.
     */
    FRLoginFailure.prototype.getDetail = function () {
        return this.payload.detail;
    };
    /**
     * Gets the failure message.
     */
    FRLoginFailure.prototype.getMessage = function () {
        return this.payload.message;
    };
    /**
     * Gets processed failure message.
     */
    FRLoginFailure.prototype.getProcessedMessage = function (messageCreator) {
        return FRPolicy.parseErrors(this.payload, messageCreator);
    };
    /**
     * Gets the failure reason.
     */
    FRLoginFailure.prototype.getReason = function () {
        return this.payload.reason;
    };
    return FRLoginFailure;
}());
export default FRLoginFailure;
//# sourceMappingURL=fr-login-failure.js.map