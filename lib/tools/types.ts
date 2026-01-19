/**
 * MCP Tool Definition Types
 *
 * Type definitions for modular tool registration.
 * Each tool exports a definition conforming to this interface.
 */

import { z } from 'zod';

/**
 * Content block types for MCP responses
 * Using literal types to match mcp-handler's expected types
 */
export interface TextContent {
  type: 'text';
  text: string;
  annotations?: {
    audience?: ('user' | 'assistant')[];
    priority?: number;
    lastModified?: string;
  };
  _meta?: Record<string, unknown>;
}

export interface ImageContent {
  type: 'image';
  data: string;
  mimeType: string;
  annotations?: {
    audience?: ('user' | 'assistant')[];
    priority?: number;
    lastModified?: string;
  };
  _meta?: Record<string, unknown>;
}

export type ContentBlock = TextContent | ImageContent;

/**
 * Standard MCP tool response
 * Matches mcp-handler's expected return type
 */
export interface ToolResponse {
  content: ContentBlock[];
  _meta?: Record<string, unknown>;
  structuredContent?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Tool definition with schema and handler
 */
export interface ToolDefinition<TSchema extends z.ZodRawShape = z.ZodRawShape> {
  /** Tool name (snake_case, used in MCP protocol) */
  name: string;

  /** Detailed description shown to LLM for tool selection */
  description: string;

  /** Zod schema for input parameters */
  schema: TSchema;

  /** Handler function that executes the tool */
  handler: (args: z.infer<z.ZodObject<TSchema>>) => Promise<ToolResponse>;
}

/**
 * Helper to create a tool definition with proper typing
 */
export function defineTool<TSchema extends z.ZodRawShape>(
  definition: ToolDefinition<TSchema>
): ToolDefinition<TSchema> {
  return definition;
}

/**
 * Standard JSON response helper for simple tools
 */
export function jsonResponse(data: unknown): ToolResponse {
  return {
    content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
  };
}
