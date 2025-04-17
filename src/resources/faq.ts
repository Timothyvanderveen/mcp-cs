import { Resource } from '@modelcontextprotocol/sdk/types.js';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ResourceHandler } from '~/types/ResourceHandler.js';

const schema: Resource = {
  uri: 'file:///public/faq.json',
  name: 'FAQ items',
  mimeType: 'text/plain',
};

const handler: ResourceHandler = async (request) => {
  const faqFilePath = path.resolve(process.argv[1], '../../public/faq.json');
  const faqFile = readFileSync(faqFilePath);

  return {
    contents: [
      {
        uri: request.uri,
        mimeType: request.mimeType,
        text: faqFile.toString(),
      },
    ],
  };
};

export default {
  schema,
  handler,
};
