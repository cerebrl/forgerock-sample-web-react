import FRCallback from '.';
import { Callback, PolicyRequirement } from '../../auth/interfaces';
/**
 * Represents a callback used to collect a password.
 */
declare class PasswordCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the callback's failed policies.
     */
    getFailedPolicies(): PolicyRequirement[];
    /**
     * Gets the callback's applicable policies.
     */
    getPolicies(): string[];
    /**
     * Gets the callback's prompt.
     */
    getPrompt(): string;
    /**
     * Sets the password.
     */
    setPassword(password: string): void;
}
export default PasswordCallback;
