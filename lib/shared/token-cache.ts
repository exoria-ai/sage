/**
 * Token Cache Utility
 *
 * Generic OAuth token caching with configurable TTL.
 * Used by ArcGIS routing and other OAuth-authenticated services.
 */

import { ESRI_TOKEN_ENDPOINT, TIMEOUTS, env } from '@/lib/config';

interface TokenData {
  token: string;
  expiry: number;
}

interface TokenCacheOptions {
  /** Buffer time before expiry to refresh token (in milliseconds) */
  bufferMs?: number;
}

/**
 * Create a token cache for OAuth client credentials flow
 */
export function createTokenCache(options: TokenCacheOptions = {}) {
  const { bufferMs = TIMEOUTS.tokenRefreshBuffer } = options;

  let cached: TokenData | null = null;

  return {
    /**
     * Get cached token if still valid
     */
    get(): string | null {
      if (!cached) return null;
      if (Date.now() >= cached.expiry - bufferMs) return null;
      return cached.token;
    },

    /**
     * Store a new token with expiry
     * @param token The access token
     * @param expiresIn Token lifetime in seconds
     */
    set(token: string, expiresIn: number): void {
      cached = {
        token,
        expiry: Date.now() + expiresIn * 1000,
      };
    },

    /**
     * Clear the cached token
     */
    clear(): void {
      cached = null;
    },

    /**
     * Check if cache has a valid token
     */
    isValid(): boolean {
      return this.get() !== null;
    },
  };
}

// Shared ArcGIS token cache
const arcgisTokenCache = createTokenCache();

/**
 * Get an ArcGIS access token using OAuth 2.0 client credentials flow.
 * Tokens are cached and reused until close to expiry.
 *
 * Requires environment variables:
 * - ARCGIS_CLIENT_ID
 * - ARCGIS_CLIENT_SECRET
 */
export async function getArcGISToken(): Promise<string | null> {
  if (!env.hasArcGISAuth) {
    return null;
  }

  const clientId = env.arcgisClientId!;
  const clientSecret = env.arcgisClientSecret!;

  // Return cached token if still valid
  const cached = arcgisTokenCache.get();
  if (cached) {
    return cached;
  }

  try {
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    });

    const response = await fetch(ESRI_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.error) {
      console.error('ArcGIS OAuth token error:', data.error);
      return null;
    }

    // Cache the token
    arcgisTokenCache.set(data.access_token, data.expires_in);

    return data.access_token;
  } catch (error) {
    console.error('Failed to get ArcGIS access token:', error);
    return null;
  }
}
