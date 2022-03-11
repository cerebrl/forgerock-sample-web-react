import { BaseProfileConfig, CollectParameters, DeviceProfileData, Geolocation, ProfileConfigOptions } from './interfaces';
import Collector from './collector';
/**
 * @class FRDevice - Collects user device metadata
 *
 * Example:
 *
 * ```js
 * // Instantiate new device object (w/optional config, if needed)
 * const device = new forgerock.FRDevice(
 *   // optional configuration
 * );
 * // override any instance methods, if needed
 * // e.g.: device.getDisplayMeta = () => {};
 *
 * // Call getProfile with required argument obj of boolean properties
 * // of location and metadata
 * const profile = await device.getProfile({
 *   location: isLocationRequired,
 *   metadata: isMetadataRequired,
 * });
 * ```
 */
declare class FRDevice extends Collector {
    config: BaseProfileConfig;
    constructor(config?: ProfileConfigOptions);
    getBrowserMeta(): {
        [key: string]: string;
    };
    getBrowserPluginsNames(): string;
    getDeviceName(): string;
    getDisplayMeta(): {
        [key: string]: string | number | null;
    };
    getHardwareMeta(): {
        [key: string]: string;
    };
    getIdentifier(): string;
    getInstalledFonts(): string;
    getLocationCoordinates(): Promise<Geolocation | Record<string, unknown>>;
    getOSMeta(): {
        [key: string]: string;
    };
    getProfile({ location, metadata }: CollectParameters): Promise<DeviceProfileData>;
    getTimezoneOffset(): number | null;
}
export default FRDevice;
