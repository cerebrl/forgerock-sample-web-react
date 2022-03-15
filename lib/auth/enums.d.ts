/**
 * Known errors that can occur during authentication.
 */
declare enum ErrorCode {
    BadRequest = "BAD_REQUEST",
    Timeout = "TIMEOUT",
    Unauthorized = "UNAUTHORIZED",
    Unknown = "UNKNOWN"
}
/**
 * Types of callbacks directly supported by the SDK.
 */
declare enum CallbackType {
    BooleanAttributeInputCallback = "BooleanAttributeInputCallback",
    ChoiceCallback = "ChoiceCallback",
    ConfirmationCallback = "ConfirmationCallback",
    DeviceProfileCallback = "DeviceProfileCallback",
    HiddenValueCallback = "HiddenValueCallback",
    KbaCreateCallback = "KbaCreateCallback",
    MetadataCallback = "MetadataCallback",
    NameCallback = "NameCallback",
    NumberAttributeInputCallback = "NumberAttributeInputCallback",
    PasswordCallback = "PasswordCallback",
    PollingWaitCallback = "PollingWaitCallback",
    ReCaptchaCallback = "ReCaptchaCallback",
    RedirectCallback = "RedirectCallback",
    SelectIdPCallback = "SelectIdPCallback",
    StringAttributeInputCallback = "StringAttributeInputCallback",
    SuspendedTextOutputCallback = "SuspendedTextOutputCallback",
    TermsAndConditionsCallback = "TermsAndConditionsCallback",
    TextOutputCallback = "TextOutputCallback",
    ValidatedCreatePasswordCallback = "ValidatedCreatePasswordCallback",
    ValidatedCreateUsernameCallback = "ValidatedCreateUsernameCallback"
}
export { CallbackType, ErrorCode };
