/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
var AttestationType;
(function (AttestationType) {
    AttestationType["Direct"] = "direct";
    AttestationType["Indirect"] = "indirect";
    AttestationType["None"] = "none";
})(AttestationType || (AttestationType = {}));
var UserVerificationType;
(function (UserVerificationType) {
    UserVerificationType["Discouraged"] = "discouraged";
    UserVerificationType["Preferred"] = "preferred";
    UserVerificationType["Required"] = "required";
})(UserVerificationType || (UserVerificationType = {}));
var StepType;
(function (StepType) {
    StepType["DeviceAuthentication"] = "DeviceAuthentication";
    StepType["DeviceRegistration"] = "DeviceRegistration";
    StepType["DeviceRegistrationChoice"] = "DeviceRegistrationChoice";
    StepType["LoginFailure"] = "LoginFailure";
    StepType["LoginSuccess"] = "LoginSuccess";
    StepType["OneTimePassword"] = "OneTimePassword";
    StepType["SecondFactorChoice"] = "SecondFactorChoice";
    StepType["Username"] = "Username";
    StepType["UsernamePassword"] = "UsernamePassword";
    StepType["UserPassword"] = "UserPassword";
})(StepType || (StepType = {}));
export { AttestationType, StepType, UserVerificationType, };
//# sourceMappingURL=interfaces.js.map