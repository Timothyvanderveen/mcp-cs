import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export type ToolHandler = (request: any) => Promise<CallToolResult>;
