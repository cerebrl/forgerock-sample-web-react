import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to deliver and collect miscellaneous data.
 */
declare class MetadataCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the callback's data.
     */
    getData<T>(): T;
}
export default MetadataCallback;
