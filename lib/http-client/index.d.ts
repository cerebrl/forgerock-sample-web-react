import Dispatcher from '../event';
import { HttpClientRequestOptions, RequiresNewTokenFn } from './interfaces';
/**
 * HTTP client that includes bearer token injection and refresh.
 * This module also supports authorization for policy protected endpoints.
 *
 * Example:
 *
 * ```js
 * return forgerock.HttpClient.request({
 *   url: `https://example.com/protected/resource`,
 *   init: {
 *     method: 'GET',
 *     credentials: 'include',
 *   },
 *   authorization: {
 *     handleStep: async (step) => {
 *       step.getCallbackOfType('PasswordCallback').setPassword(pw);
 *       return Promise.resolve(step);
 *     },
 *   },
 * });
 * ```
 */
declare abstract class HttpClient extends Dispatcher {
    /**
     * Makes a request using the specified options.
     *
     * @param options The options to use when making the request
     */
    static request(options: HttpClientRequestOptions): Promise<Response>;
    private static setAuthHeaders;
    private static stepIterator;
    private static _request;
}
export default HttpClient;
export { HttpClientRequestOptions, RequiresNewTokenFn };
