import { ConfigOptions } from '../config';
import { OAuth2Tokens } from '../oauth2-client';
import { StringDict } from '../shared/interfaces';
interface GetTokensOptions extends ConfigOptions {
    forceRenew?: boolean;
    login?: 'embedded' | 'redirect' | undefined;
    query?: StringDict<string>;
}
declare abstract class TokenManager {
    /**
     * Token Manager class that provides high-level abstraction for Authorization Code flow,
     * PKCE value generation, token exchange and token storage.
     *
     * Supports both embedded authentication as well as external authentication via redirects
     *
     Example 1:
  
     ```js
     const tokens = forgerock.TokenManager.getTokens({
       forceRenew: true, // If you want to get new tokens, despite existing ones
       login: 'embedded', // If user authentication is handled in-app
       support: 'legacy', // Set globally or locally; `"legacy"` or `undefined` will use iframe
       serverConfig: {
         timeout: 5000, // If using "legacy", use a short timeout to catch error
       },
     });
     ```
  
     Example 2:
  
     ```js
     const tokens = forgerock.TokenManager.getTokens({
       forceRenew: false, // Will immediately return stored tokens, if they exist
       login: 'redirect', // If user authentication is handled in external Web app
       support: 'modern', // Set globally or locally; `"modern"` will use native fetch
     });
     ```
  
     Example 3:
  
     ```js
     const tokens = forgerock.TokenManager.getTokens({
       query: {
         code: 'lFJQYdoQG1u7nUm8 ... ', // Authorization code from redirect URL
         state: 'MTY2NDkxNTQ2Nde3D ... ', // State from redirect URL
       },
     });
     ```
     */
    static getTokens(options?: GetTokensOptions): Promise<OAuth2Tokens | void>;
    static deleteTokens(): Promise<void>;
    private static tokenExchange;
}
export default TokenManager;
export { GetTokensOptions };
