import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to instruct the system to poll while a backend process completes.
 */
declare class PollingWaitCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the message to display while polling.
     */
    getMessage(): string;
    /**
     * Gets the polling interval in seconds.
     */
    getWaitTime(): number;
}
export default PollingWaitCallback;
