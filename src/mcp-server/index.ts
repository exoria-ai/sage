/**
 * SAGE MCP Server
 *
 * Model Context Protocol server providing GIS tools for Solano County data.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { tools, handleToolCall } from './tools/index.js';

export function createMcpServer() {
  const server = new Server(
    {
      name: 'sage-gis',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    return handleToolCall(name, args);
  });

  return {
    start: async () => {
      const transport = new StdioServerTransport();
      await server.connect(transport);
      console.error('SAGE MCP server running on stdio');
    },
  };
}
