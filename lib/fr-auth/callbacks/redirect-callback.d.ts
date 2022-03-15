import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to collect an answer to a choice.
 */
declare class RedirectCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the redirect URL.
     */
    getRedirectUrl(): string;
}
export default RedirectCallback;
