import { Tokens } from '../shared/interfaces';
/**
 * Provides wrapper for tokens with sessionStorage.
 */
declare abstract class SessionStorageWrapper {
    /**
     * Retrieve tokens.
     */
    static get(clientId: string): Promise<Tokens>;
    /**
     * Saves tokens.
     */
    static set(clientId: string, tokens: Tokens): Promise<void>;
    /**
     * Removes stored tokens.
     */
    static remove(clientId: string): Promise<void>;
}
export default SessionStorageWrapper;
