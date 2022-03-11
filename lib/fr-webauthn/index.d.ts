import HiddenValueCallback from '../fr-auth/callbacks/hidden-value-callback';
import MetadataCallback from '../fr-auth/callbacks/metadata-callback';
import FRStep from '../fr-auth/fr-step';
import { WebAuthnOutcome, WebAuthnStepType } from './enums';
import { RelyingParty, WebAuthnAuthenticationMetadata, WebAuthnCallbacks, WebAuthnRegistrationMetadata } from './interfaces';
import TextOutputCallback from '../fr-auth/callbacks/text-output-callback';
/**
 * Utility for integrating a web browser's WebAuthn API.
 *
 * Example:
 *
 * ```js
 * // Determine if a step is a WebAuthn step
 * const stepType = FRWebAuthn.getWebAuthnStepType(step);
 * if (stepType === WebAuthnStepType.Registration) {
 *   // Register a new device
 *   await FRWebAuthn.register(step);
 * } else if (stepType === WebAuthnStepType.Authentication) {
 *   // Authenticate with a registered device
 *   await FRWebAuthn.authenticate(step);
 * }
 * ```
 */
declare abstract class FRWebAuthn {
    /**
     * Determines if the given step is a WebAuthn step.
     *
     * @param step The step to evaluate
     * @return A WebAuthnStepType value
     */
    static getWebAuthnStepType(step: FRStep): WebAuthnStepType;
    /**
     * Populates the step with the necessary authentication outcome.
     *
     * @param step The step that contains WebAuthn authentication data
     * @return The populated step
     */
    static authenticate(step: FRStep): Promise<FRStep>;
    /**
     * Populates the step with the necessary registration outcome.
     *
     * @param step The step that contains WebAuthn registration data
     * @return The populated step
     */
    static register(step: FRStep): Promise<FRStep>;
    /**
     * Returns an object containing the two WebAuthn callbacks.
     *
     * @param step The step that contains WebAuthn callbacks
     * @return The WebAuthn callbacks
     */
    static getCallbacks(step: FRStep): WebAuthnCallbacks;
    /**
     * Returns the WebAuthn metadata callback containing data to pass to the browser
     * Web Authentication API.
     *
     * @param step The step that contains WebAuthn callbacks
     * @return The metadata callback
     */
    static getMetadataCallback(step: FRStep): MetadataCallback | undefined;
    /**
     * Returns the WebAuthn hidden value callback where the outcome should be populated.
     *
     * @param step The step that contains WebAuthn callbacks
     * @return The hidden value callback
     */
    static getOutcomeCallback(step: FRStep): HiddenValueCallback | undefined;
    /**
     * Returns the WebAuthn metadata callback containing data to pass to the browser
     * Web Authentication API.
     *
     * @param step The step that contains WebAuthn callbacks
     * @return The metadata callback
     */
    static getTextOutputCallback(step: FRStep): TextOutputCallback | undefined;
    /**
     * Retrieves the credential from the browser Web Authentication API.
     *
     * @param options The public key options associated with the request
     * @return The credential
     */
    static getAuthenticationCredential(options: PublicKeyCredentialRequestOptions): Promise<PublicKeyCredential | null>;
    /**
     * Converts an authentication credential into the outcome expected by OpenAM.
     *
     * @param credential The credential to convert
     * @return The outcome string
     */
    static getAuthenticationOutcome(credential: PublicKeyCredential | null): string;
    /**
     * Retrieves the credential from the browser Web Authentication API.
     *
     * @param options The public key options associated with the request
     * @return The credential
     */
    static getRegistrationCredential(options: PublicKeyCredentialCreationOptions): Promise<PublicKeyCredential | null>;
    /**
     * Converts a registration credential into the outcome expected by OpenAM.
     *
     * @param credential The credential to convert
     * @return The outcome string
     */
    static getRegistrationOutcome(credential: PublicKeyCredential | null): string;
    /**
     * Converts authentication tree metadata into options required by the browser
     * Web Authentication API.
     *
     * @param metadata The metadata provided in the authentication tree MetadataCallback
     * @return The Web Authentication API request options
     */
    static createAuthenticationPublicKey(metadata: WebAuthnAuthenticationMetadata): PublicKeyCredentialRequestOptions;
    /**
     * Converts authentication tree metadata into options required by the browser
     * Web Authentication API.
     *
     * @param metadata The metadata provided in the authentication tree MetadataCallback
     * @return The Web Authentication API request options
     */
    static createRegistrationPublicKey(metadata: WebAuthnRegistrationMetadata): PublicKeyCredentialCreationOptions;
}
export default FRWebAuthn;
export { RelyingParty, WebAuthnAuthenticationMetadata, WebAuthnCallbacks, WebAuthnOutcome, WebAuthnRegistrationMetadata, WebAuthnStepType, };
