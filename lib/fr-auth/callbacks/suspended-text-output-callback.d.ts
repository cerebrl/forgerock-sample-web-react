import TextOutputCallback from './text-output-callback';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to display a message.
 */
declare class SuspendedTextOutputCallback extends TextOutputCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
}
export default SuspendedTextOutputCallback;
