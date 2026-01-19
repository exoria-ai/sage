/**
 * SAGE MCP Route Handler (LIVE PRODUCTION)
 *
 * Provides Streamable HTTP transport for MCP tools.
 * Deploy to Vercel for remote MCP server access.
 *
 * Tool definitions are modular - see lib/tools/definitions/ for implementations.
 * Each tool group is defined in its own file for maintainability.
 */

import { createMcpHandler } from 'mcp-handler';
import { allTools, getToolStats } from '@/lib/tools/definitions';

const handler = createMcpHandler(
  (server) => {
    // Register all tools from modular definitions
    for (const tool of allTools) {
      server.tool(
        tool.name,
        tool.description,
        tool.schema,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (args: any) => {
          const result = await tool.handler(args);
          return result;
        }
      );
    }

    // Log tool registration stats (dev only)
    if (process.env.NODE_ENV === 'development') {
      const stats = getToolStats();
      console.log(`[MCP] Registered ${stats.total} tools:`, stats.byCategory);
    }
  },
  {
    serverInfo: {
      name: 'sage-gis',
      version: '0.1.0',
    },
  },
  { basePath: '/api' }
);

export { handler as GET, handler as POST, handler as DELETE };
