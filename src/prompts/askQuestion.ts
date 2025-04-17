import { Prompt } from '@modelcontextprotocol/sdk/types.js';
import { PromptHandler } from '~/types/PromptHandler.js';

const schema: Prompt = {
  name: 'ask_question',
  description: 'Ask a customer service question.',
  arguments: [
    {
      name: 'question',
      description: 'Question ',
      required: true,
    },
  ],
};

const handler: PromptHandler = async (request) => {
  const { question } = request.arguments;

  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `
              Respond to the following question by using the respondWithFaq tool and faq resource.
              
              "${question}"
          `,
        },
      },
    ],
  };
};

export default {
  schema,
  handler,
};
