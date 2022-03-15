import { Callback } from '../../auth/interfaces';
/**
 * Base class for authentication tree callback wrappers.
 */
declare class FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the name of this callback type.
     */
    getType(): string;
    /**
     * Gets the value of the specified input element, or the first element if `selector` is not
     * provided.
     *
     * @param selector The index position or name of the desired element
     */
    getInputValue(selector?: number | string): unknown;
    /**
     * Sets the value of the specified input element, or the first element if `selector` is not
     * provided.
     *
     * @param selector The index position or name of the desired element
     */
    setInputValue(value: unknown, selector?: number | string | RegExp): void;
    /**
     * Gets the value of the specified output element, or the first element if `selector`
     * is not provided.
     *
     * @param selector The index position or name of the desired element
     */
    getOutputValue(selector?: number | string): unknown;
    /**
     * Gets the value of the first output element with the specified name or the
     * specified default value.
     *
     * @param name The name of the desired element
     */
    getOutputByName<T>(name: string, defaultValue: T): T;
    private getArrayElement;
}
export default FRCallback;
