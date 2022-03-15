import { DEFAULT_TIMEOUT } from './constants';
import { ConfigOptions, ServerConfig, ValidConfigOptions } from './interfaces';
/**
 * Utility for merging configuration defaults with one-off options.
 *
 * Example:
 *
 * ```js
 * // Establish configuration defaults
 * Config.set({
 *   clientId: 'myApp',
 *   serverConfig: { baseUrl: 'https://openam-domain.com/am' },
 *   tree: 'UsernamePassword'
 * });
 *
 * // Specify overrides as needed
 * const configOverrides = { tree: 'PasswordlessWebAuthn' };
 * const step = await FRAuth.next(undefined, configOverrides);
 */
declare abstract class Config {
    private static options;
    /**
     * Sets the default options.
     *
     * @param options The options to use as defaults
     */
    static set(options: ConfigOptions): void;
    /**
     * Merges the provided options with the default options.  Ensures a server configuration exists.
     *
     * @param options The options to merge with defaults
     */
    static get(options?: ConfigOptions): ValidConfigOptions;
    private static isValid;
    private static validateServerConfig;
}
export default Config;
export { DEFAULT_TIMEOUT, ConfigOptions, ServerConfig, ValidConfigOptions };
