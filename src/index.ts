import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import askQuestion from '~/prompts/askQuestion.js';
import faq from '~/resources/faq.js';
import respondWithFaq from '~/tools/respondWithFaq.js';

const mcpServer = new Server(
  {
    name: 'mcp-cs',
    version: '1.0.0',
  },
  {
    capabilities: {
      prompts: {},
      resources: {},
      tools: {},
    },
  },
);

// List Prompts

mcpServer.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      askQuestion.schema,
    ],
  };
});

// Get Prompt

mcpServer.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name === askQuestion.schema.name) {
    return askQuestion.handler(request.params);
  }

  throw new Error('Prompt not found');
});

// List Resources

mcpServer.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      faq.schema,
    ],
  };
});

// Read Resource

mcpServer.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === faq.schema.uri) {
    return faq.handler(request.params);
  }

  throw new Error('Resource not found');
});

// Get Tools

mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      respondWithFaq.schema,
    ],
  };
});

// Read Tools

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === respondWithFaq.schema.name) {
    return respondWithFaq.handler(request.params);
  }

  throw new Error('Tool not found');
});

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
