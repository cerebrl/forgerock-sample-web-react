/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
var WebAuthnOutcome;
(function (WebAuthnOutcome) {
    WebAuthnOutcome["Error"] = "ERROR";
    WebAuthnOutcome["Unsupported"] = "unsupported";
})(WebAuthnOutcome || (WebAuthnOutcome = {}));
var WebAuthnOutcomeType;
(function (WebAuthnOutcomeType) {
    WebAuthnOutcomeType["AbortError"] = "AbortError";
    WebAuthnOutcomeType["DataError"] = "DataError";
    WebAuthnOutcomeType["ConstraintError"] = "ConstraintError";
    WebAuthnOutcomeType["EncodingError"] = "EncodingError";
    WebAuthnOutcomeType["InvalidError"] = "InvalidError";
    WebAuthnOutcomeType["NetworkError"] = "NetworkError";
    WebAuthnOutcomeType["NotAllowedError"] = "NotAllowedError";
    WebAuthnOutcomeType["NotSupportedError"] = "NotSupportedError";
    WebAuthnOutcomeType["SecurityError"] = "SecurityError";
    WebAuthnOutcomeType["TimeoutError"] = "TimeoutError";
    WebAuthnOutcomeType["UnknownError"] = "UnknownError";
})(WebAuthnOutcomeType || (WebAuthnOutcomeType = {}));
var WebAuthnStepType;
(function (WebAuthnStepType) {
    WebAuthnStepType[WebAuthnStepType["None"] = 0] = "None";
    WebAuthnStepType[WebAuthnStepType["Authentication"] = 1] = "Authentication";
    WebAuthnStepType[WebAuthnStepType["Registration"] = 2] = "Registration";
})(WebAuthnStepType || (WebAuthnStepType = {}));
export { WebAuthnOutcome, WebAuthnOutcomeType, WebAuthnStepType };
//# sourceMappingURL=enums.js.map