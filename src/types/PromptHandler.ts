import { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';

export type PromptHandler = (request: any) => Promise<GetPromptResult>;
