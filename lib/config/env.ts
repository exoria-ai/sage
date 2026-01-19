/**
 * Environment variable validation and access
 *
 * Validates required environment variables at startup and provides
 * typed access to configuration values. Fails fast on misconfiguration.
 */

// =============================================================================
// Environment Variable Definitions
// =============================================================================

/**
 * Required environment variables that must be set for the app to function
 */
const REQUIRED_VARS = [] as const; // Currently none are strictly required at startup

/**
 * Optional environment variables with their default values
 */
const OPTIONAL_VARS = {
  NODE_ENV: 'development',
  NEXT_PUBLIC_BASE_URL: '',
  VERCEL_URL: '',
} as const;

/**
 * Environment variables required for ArcGIS OAuth (optional feature)
 * These are only validated when ArcGIS token operations are attempted
 */
const ARCGIS_AUTH_VARS = ['ARCGIS_CLIENT_ID', 'ARCGIS_CLIENT_SECRET'] as const;

// =============================================================================
// Validation Functions
// =============================================================================

/**
 * Check if a required environment variable is set
 */
function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Please set it in your .env.local file or deployment environment.`
    );
  }
  return value;
}

/**
 * Get an optional environment variable with a default value
 */
function getOptionalEnv(name: string, defaultValue: string): string {
  return process.env[name] ?? defaultValue;
}

/**
 * Validate all required environment variables at startup
 * Call this early in your app initialization
 */
export function validateEnvironment(): void {
  const missing: string[] = [];

  for (const name of REQUIRED_VARS) {
    if (!process.env[name]) {
      missing.push(name);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
        `Please configure these in your .env.local file or deployment environment.`
    );
  }
}

/**
 * Validate ArcGIS OAuth credentials are present
 * Call this before attempting token operations
 */
export function validateArcGISAuth(): void {
  const missing: string[] = [];

  for (const name of ARCGIS_AUTH_VARS) {
    if (!process.env[name]) {
      missing.push(name);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing ArcGIS OAuth credentials: ${missing.join(', ')}. ` +
        `These are required for authenticated ArcGIS operations. ` +
        `Register an application at developers.arcgis.com to obtain credentials.`
    );
  }
}

// =============================================================================
// Environment Configuration Object
// =============================================================================

/**
 * Typed environment configuration
 *
 * Access environment variables through this object for type safety.
 * Values are resolved at access time (not cached) to support testing.
 */
export const env = {
  /** Current Node environment */
  get nodeEnv(): string {
    return getOptionalEnv('NODE_ENV', OPTIONAL_VARS.NODE_ENV);
  },

  /** Whether running in development mode */
  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  },

  /** Whether running in production mode */
  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  },

  /** Whether running in test mode */
  get isTest(): boolean {
    return this.nodeEnv === 'test';
  },

  /** Base URL for the application (client-side accessible) */
  get baseUrl(): string {
    // Priority: explicit setting > Vercel URL > empty
    const explicit = process.env.NEXT_PUBLIC_BASE_URL;
    if (explicit) return explicit;

    const vercelUrl = process.env.VERCEL_URL;
    if (vercelUrl) return `https://${vercelUrl}`;

    return '';
  },

  /** ArcGIS OAuth client ID (may be undefined) */
  get arcgisClientId(): string | undefined {
    return process.env.ARCGIS_CLIENT_ID;
  },

  /** ArcGIS OAuth client secret (may be undefined) */
  get arcgisClientSecret(): string | undefined {
    return process.env.ARCGIS_CLIENT_SECRET;
  },

  /** ArcGIS API key for simple authentication (may be undefined) */
  get arcgisApiKey(): string | undefined {
    return process.env.ARCGIS_API_KEY;
  },

  /** Whether ArcGIS OAuth credentials are configured */
  get hasArcGISAuth(): boolean {
    return !!(this.arcgisClientId && this.arcgisClientSecret);
  },

  /** Whether ArcGIS API key is configured */
  get hasArcGISApiKey(): boolean {
    return !!this.arcgisApiKey;
  },
} as const;

// =============================================================================
// Startup Validation
// =============================================================================

// Validate on module load in non-test environments
// This ensures we fail fast if required vars are missing
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'test') {
  try {
    validateEnvironment();
  } catch (error) {
    // Log but don't throw during module load to support build-time imports
    console.warn('[config/env] Environment validation warning:', error);
  }
}
