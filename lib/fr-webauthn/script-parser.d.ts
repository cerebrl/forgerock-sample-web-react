declare function parseWebAuthnRegisterText(text: string): PublicKeyCredentialCreationOptions;
declare function parseWebAuthnAuthenticateText(text: string): PublicKeyCredentialRequestOptions;
export { parseWebAuthnAuthenticateText, parseWebAuthnRegisterText };
