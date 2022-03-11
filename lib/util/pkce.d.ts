/**
 * Helper class for generating verifier, challenge and state strings used for
 * Proof Key for Code Exchange (PKCE).
 */
declare abstract class PKCE {
    /**
     * Creates a random state.
     */
    static createState(): string;
    /**
     * Creates a random verifier.
     */
    static createVerifier(): string;
    /**
     * Creates a SHA-256 hash of the verifier.
     *
     * @param verifier The verifier to hash
     */
    static createChallenge(verifier: string): Promise<string>;
    /**
     * Creates a base64 encoded, URL-friendly version of the specified array.
     *
     * @param array The array of numbers to encode
     */
    static base64UrlEncode(array: Uint8Array): string;
    /**
     * Creates a SHA-256 hash of the specified string.
     *
     * @param value The string to hash
     */
    static sha256(value: string): Promise<Uint8Array>;
    /**
     * Creates a random string.
     *
     * @param size The number for entropy (default: 32)
     */
    private static createRandomString;
}
export default PKCE;
