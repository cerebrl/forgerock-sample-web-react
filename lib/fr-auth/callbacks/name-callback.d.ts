import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to collect a username.
 */
declare class NameCallback extends FRCallback {
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
     * Sets the username.
     */
    setName(name: string): void;
}
export default NameCallback;
