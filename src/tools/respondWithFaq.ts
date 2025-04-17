import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolHandler } from '~/types/ToolHandler.js';

const schema: Tool = {
  name: 'respond_with_faq',
  description: 'Respond to a customer service question using a relevant FAQ item specified in the FAQ resource.',
  inputSchema: {
    type: 'object',
    properties: {
      customerName: { type: 'string' },
      faqTitle: { type: 'string' },
      faqDescription: { type: 'string' },
    },
    required: ['faqTitle', 'faqDescription'],
  },
};

const handler: ToolHandler = async (request) => {
  const { customerName, faqTitle, faqDescription } = request.arguments;
  const greeting = customerName ? `Hello ${customerName}` : 'Hello dear customer';

  return {
    content: [
      {
        type: 'text',
        text: `
          ${greeting},
          
          Thank you for reaching out to us.
          
          Here’s some information that might help regarding your question:
          
          <b>${faqTitle}</b>
          
          <i>${faqDescription}</i>
          
          If you have any further questions or need additional assistance, feel free to reply to this email — we’re happy to help.
          
          Best regards,
          Support Team
        `,
      },
    ],
  };
};

export default {
  schema,
  handler,
};
