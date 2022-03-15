import FRCallback from '.';
import { Callback, PolicyRequirement } from '../../auth/interfaces';
import { StringDict } from '../../shared/interfaces';
/**
 * Represents a callback used to collect attributes.
 *
 * @typeparam T Maps to StringAttributeInputCallback, NumberAttributeInputCallback and
 *     BooleanAttributeInputCallback, respectively
 */
declare class AttributeInputCallback<T extends string | number | boolean> extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the attribute name.
     */
    getName(): string;
    /**
     * Gets the attribute prompt.
     */
    getPrompt(): string;
    /**
     * Gets whether the attribute is required.
     */
    isRequired(): boolean;
    /**
     * Gets the callback's failed policies.
     */
    getFailedPolicies(): PolicyRequirement[];
    /**
     * Gets the callback's applicable policies.
     */
    getPolicies(): StringDict<any>;
    /**
     * Set if validating value only.
     */
    setValidateOnly(value: boolean): void;
    /**
     * Sets the attribute's value.
     */
    setValue(value: T): void;
}
export default AttributeInputCallback;
