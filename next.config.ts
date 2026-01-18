import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Explicitly set the workspace root to this directory
  outputFileTracingRoot: path.join(__dirname),

  // Transpile @arcgis/core for proper ESM handling
  transpilePackages: ['@arcgis/core'],

  // Webpack configuration for ESRI ArcGIS SDK
  webpack: (config) => {
    // Handle ESRI's use of @arcgis/core/assets
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },
};

export default nextConfig;
