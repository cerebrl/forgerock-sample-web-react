import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
interface IdPValue {
    provider: string;
    uiConfig: {
        [key: string]: string;
    };
}
/**
 * Represents a callback used to collect an answer to a choice.
 */
declare class SelectIdPCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the available providers.
     */
    getProviders(): IdPValue[];
    /**
     * Sets the provider by name.
     */
    setProvider(value: string): void;
}
export default SelectIdPCallback;
export { IdPValue };
