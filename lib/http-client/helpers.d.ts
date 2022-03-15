/**
 * @module
 * @ignore
 * These are private utility functions for HttpClient
 */
import { CustomPathConfig } from '../config/interfaces';
import { Advices, HttpClientRequestOptions, RequiresNewTokenFn, AuthorizationJSON } from './interfaces';
import { Tokens } from '../shared/interfaces';
export declare function addAuthzInfoToHeaders(init: RequestInit, advices: Advices, tokens?: Tokens): Headers;
export declare function addAuthzInfoToURL(url: string, advices: Advices, tokens?: Tokens): string;
export declare function buildAuthzOptions(authzObj: AuthorizationJSON, baseURL: string, timeout: number, realmPath?: string, customPaths?: CustomPathConfig): HttpClientRequestOptions;
export declare function examineForIGAuthz(res: Response): boolean;
export declare function examineForRESTAuthz(res: Response): Promise<boolean>;
export declare function hasAuthzAdvice(json: AuthorizationJSON): boolean;
export declare function isAuthzStep(res: Response): Promise<boolean>;
export declare function newTokenRequired(res: Response, requiresNewToken?: RequiresNewTokenFn): boolean;
export declare function normalizeIGJSON(res: Response): AuthorizationJSON;
export declare function normalizeRESTJSON(res: Response): Promise<AuthorizationJSON>;
