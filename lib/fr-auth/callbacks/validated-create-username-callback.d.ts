import FRCallback from '.';
import { Callback, PolicyRequirement } from '../../auth/interfaces';
import { StringDict } from '../../shared/interfaces';
/**
 * Represents a callback used to collect a valid platform username.
 */
declare class ValidatedCreateUsernameCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the callback's prompt.
     */
    getPrompt(): string;
    /**
     * Gets the callback's failed policies.
     */
    getFailedPolicies(): PolicyRequirement[];
    /**
     * Gets the callback's applicable policies.
     */
    getPolicies(): StringDict<any>;
    /**
     * Gets whether the username is required.
     */
    isRequired(): boolean;
    /**
     * Sets the callback's username.
     */
    setName(name: string): void;
    /**
     * Set if validating value only.
     */
    setValidateOnly(value: boolean): void;
}
export default ValidatedCreateUsernameCallback;
