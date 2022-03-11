import { ParsedCredential } from './interfaces';
declare function ensureArray(arr: RegExpMatchArray | null): string[];
declare function arrayBufferToString(arrayBuffer: ArrayBuffer): string;
declare function getIndexOne(arr: RegExpMatchArray | null): string;
declare function parseCredentials(value: string): ParsedCredential[];
declare function parseNumberArray(value: string): number[];
declare function parsePubKeyArray(value: string | unknown[]): PublicKeyCredentialParameters[] | undefined;
declare function parseAllowCredentialsArray(value: string | unknown[]): PublicKeyCredentialDescriptor[] | undefined;
/**
 * AM is currently serializing RP as one of the following formats, depending on
 * whether RP ID has been configured:
 *   "relyingPartyId":""
 *   "relyingPartyId":"rpId: \"foo\","
 * This regex handles both formats, but should be removed once AM is fixed.
 */
declare function parseRelyingPartyId(relyingPartyId: string): string;
export { ensureArray, arrayBufferToString, getIndexOne, parseCredentials, parseNumberArray, parseAllowCredentialsArray, parsePubKeyArray, parseRelyingPartyId, };
