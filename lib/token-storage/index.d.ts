import { Tokens } from '../shared/interfaces';
/**
 * Provides access to the token storage API.
 * The type of storage (localStorage, sessionStorage, etc) can be configured
 * through `tokenStore` object on the SDK configuration.
 */
declare abstract class TokenStorage {
    /**
     * Gets stored tokens.
     */
    static get(): Promise<Tokens>;
    /**
     * Saves tokens.
     */
    static set(tokens: Tokens): Promise<void>;
    /**
     * Removes stored tokens.
     */
    static remove(): Promise<void>;
    private static getClientConfig;
}
export default TokenStorage;
