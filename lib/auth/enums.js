/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Known errors that can occur during authentication.
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["BadRequest"] = "BAD_REQUEST";
    ErrorCode["Timeout"] = "TIMEOUT";
    ErrorCode["Unauthorized"] = "UNAUTHORIZED";
    ErrorCode["Unknown"] = "UNKNOWN";
})(ErrorCode || (ErrorCode = {}));
/**
 * Types of callbacks directly supported by the SDK.
 */
var CallbackType;
(function (CallbackType) {
    CallbackType["BooleanAttributeInputCallback"] = "BooleanAttributeInputCallback";
    CallbackType["ChoiceCallback"] = "ChoiceCallback";
    CallbackType["ConfirmationCallback"] = "ConfirmationCallback";
    CallbackType["DeviceProfileCallback"] = "DeviceProfileCallback";
    CallbackType["HiddenValueCallback"] = "HiddenValueCallback";
    CallbackType["KbaCreateCallback"] = "KbaCreateCallback";
    CallbackType["MetadataCallback"] = "MetadataCallback";
    CallbackType["NameCallback"] = "NameCallback";
    CallbackType["NumberAttributeInputCallback"] = "NumberAttributeInputCallback";
    CallbackType["PasswordCallback"] = "PasswordCallback";
    CallbackType["PollingWaitCallback"] = "PollingWaitCallback";
    CallbackType["ReCaptchaCallback"] = "ReCaptchaCallback";
    CallbackType["RedirectCallback"] = "RedirectCallback";
    CallbackType["SelectIdPCallback"] = "SelectIdPCallback";
    CallbackType["StringAttributeInputCallback"] = "StringAttributeInputCallback";
    CallbackType["SuspendedTextOutputCallback"] = "SuspendedTextOutputCallback";
    CallbackType["TermsAndConditionsCallback"] = "TermsAndConditionsCallback";
    CallbackType["TextOutputCallback"] = "TextOutputCallback";
    CallbackType["ValidatedCreatePasswordCallback"] = "ValidatedCreatePasswordCallback";
    CallbackType["ValidatedCreateUsernameCallback"] = "ValidatedCreateUsernameCallback";
})(CallbackType || (CallbackType = {}));
export { CallbackType, ErrorCode };
//# sourceMappingURL=enums.js.map