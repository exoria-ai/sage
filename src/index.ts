/**
 * SAGE - Solano Agent for Geographic Enquiry
 *
 * AI-powered GIS assistant for Solano County, California.
 * Provides MCP server with tools for querying geographic and property information.
 */

import { createMcpServer } from './mcp-server/index.js';

async function main() {
  const server = createMcpServer();
  await server.start();
}

main().catch((error) => {
  console.error('Failed to start SAGE:', error);
  process.exit(1);
});
