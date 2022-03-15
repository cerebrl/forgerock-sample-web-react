import { ConfigurablePaths, CustomPathConfig } from '../config/interfaces';
import { StringDict } from '../shared/interfaces';
/**
 * Returns the base URL including protocol, hostname and any non-standard port.
 * The returned URL does not include a trailing slash.
 */
declare function getBaseUrl(url: URL): string;
declare function getEndpointPath(endpoint: ConfigurablePaths, realmPath?: string, customPaths?: CustomPathConfig): string;
declare function resolve(baseUrl: string, path: string): string;
declare function parseQuery(fullUrl: string): StringDict<string>;
declare function stringify(data: StringDict<string | undefined>): string;
export { getBaseUrl, getEndpointPath, parseQuery, resolve, stringify };
