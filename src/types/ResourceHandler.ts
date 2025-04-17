import { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';

export type ResourceHandler = (request: any) => Promise<ReadResourceResult>;
