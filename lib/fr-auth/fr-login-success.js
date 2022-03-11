/*
 * @forgerock/javascript-sdk
 *
 * fr-login-success.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import Config from '../config';
import { StepType } from './enums';
var FRLoginSuccess = /** @class */ (function () {
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function FRLoginSuccess(payload) {
        this.payload = payload;
        /**
         * The type of step.
         */
        this.type = StepType.LoginSuccess;
        var serverConfig = Config.get().serverConfig;
        var sessionCookieName = serverConfig.sessionCookieName || 'iPlanetDirectoryPro';
        window.localStorage.setItem(sessionCookieName, payload.tokenId || '');
    }
    /**
     * Gets the step's realm.
     */
    FRLoginSuccess.prototype.getRealm = function () {
        return this.payload.realm;
    };
    /**
     * Gets the step's session token.
     */
    FRLoginSuccess.prototype.getSessionToken = function () {
        return this.payload.tokenId;
    };
    /**
     * Gets the step's success URL.
     */
    FRLoginSuccess.prototype.getSuccessUrl = function () {
        return this.payload.successUrl;
    };
    return FRLoginSuccess;
}());
export default FRLoginSuccess;
//# sourceMappingURL=fr-login-success.js.map