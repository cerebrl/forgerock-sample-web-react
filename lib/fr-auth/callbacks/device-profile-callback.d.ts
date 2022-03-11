import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
import { DeviceProfileData } from '../../fr-device/interfaces';
/**
 * Represents a callback used to collect device profile data.
 */
declare class DeviceProfileCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the callback's data.
     */
    getMessage(): string;
    /**
     * Does callback require metadata?
     */
    isMetadataRequired(): boolean;
    /**
     * Does callback require location data?
     */
    isLocationRequired(): boolean;
    /**
     * Sets the profile.
     */
    setProfile(profile: DeviceProfileData): void;
}
export default DeviceProfileCallback;
