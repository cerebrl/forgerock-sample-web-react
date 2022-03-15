import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to display a message.
 */
declare class TextOutputCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the message content.
     */
    getMessage(): string;
    /**
     * Gets the message type.
     */
    getMessageType(): string;
}
export default TextOutputCallback;
