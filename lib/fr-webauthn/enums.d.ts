declare enum WebAuthnOutcome {
    Error = "ERROR",
    Unsupported = "unsupported"
}
declare enum WebAuthnOutcomeType {
    AbortError = "AbortError",
    DataError = "DataError",
    ConstraintError = "ConstraintError",
    EncodingError = "EncodingError",
    InvalidError = "InvalidError",
    NetworkError = "NetworkError",
    NotAllowedError = "NotAllowedError",
    NotSupportedError = "NotSupportedError",
    SecurityError = "SecurityError",
    TimeoutError = "TimeoutError",
    UnknownError = "UnknownError"
}
declare enum WebAuthnStepType {
    None = 0,
    Authentication = 1,
    Registration = 2
}
export { WebAuthnOutcome, WebAuthnOutcomeType, WebAuthnStepType };
