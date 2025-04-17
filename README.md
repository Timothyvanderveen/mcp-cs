# Model Context Protocol - Customer Service (MCP-CS)

## Overview

MCP-CS (Model Context Protocol – Customer Service) is a lightweight system designed to automatically select relevant FAQ items based on customer inquiries. It integrates these items into email templates to generate automated, yet personalized, responses.

For more information about the Model Context Protocol, see the [official documentation](https://modelcontextprotocol.io/introduction).

## Installation

### Requirements
- Node.js (v18 or higher)
- Yarn

### Steps
```bash
# Clone the repository
git clone https://github.com/your-organization/mcp-cs.git
cd mcp-cs

# Install dependencies
yarn install
```

## Configuration

### Setting up the FAQ JSON
Place your FAQ items in `public/faq.json` using the following structure:

```json
[
  {
    "title": "Your question title here",
    "description": "Answer text goes here"
  },
  {
    "title": "Another question",
    "description": "Corresponding answer"
  }
]
```

### Build the service
```bash
# build the service
yarn build

# inspect the service
yarn inspect
```

### Add the MCP server to Claude Desktop

#### Create the config JSON file

```bash
# macOS
touch ~/Library/Application\ Support/Claude/claude_desktop_config.json

# windows
type NUL > %APPDATA%\Claude\claude_desktop_config.json
```

#### Add the MCP server to the config file

```json
{
  "mcpServers": {
    "mcp-cs": {
      "command": "node",
      "args": [
        "[path_to_build/index.js]"
      ]
    }
  }
}
```

## Usage

Open a new Claude Desktop chat and click **Attach from MCP** below the input field. Select **FAQ Items** to include `public/faq.json` in the context.

Now, when you submit a customer service question, Claude will automatically select the relevant FAQ item and include it via the **respondWithFaq** tool (`src/tools/respondWithFaq.ts`).

## License

This project is licensed under the MIT License.
