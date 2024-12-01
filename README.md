# Claude Chat Interface

A modern chat interface for Claude AI models, built with Next.js and TypeScript. This project provides a clean, responsive UI for interacting with various Claude models through the Anthropic API.

## Upcoming features
- ⬛Save conversations locally or to a database
- ⬛Loading animations/typing indicators
- ⬛Voice input/output
- 🔃File upload support for document analysis
- ⬛Code editor with syntax highlighting for code-related queries
- ⬛Collapsible sidebar for saved conversations
- ⬛Loading animations/typing indicators
- ⬛Export chat history as PDF/Markdown
- ⬛Pin important conversations

-----
✅ - Update Pushed 
🔃 - Next Week Update
⬛ - Upconming in Future 

_____________________________________________________________________________________________________________________________________________________

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18.17 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- An [Anthropic API key](https://console.anthropic.com/)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/claude-chat.git
   cd claude-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your configuration:
   ```env
   NEXT_PUBLIC_DEFAULT_MODEL=claude-3-5-sonnet-20241022
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Models

The following Claude models are supported:
- Claude 3.5 Sonnet (Latest) - `claude-3-5-sonnet-20241022`
- Claude 3.5 Sonnet - `claude-3-5-sonnet-20240620`
- Claude 3.5 Haiku - `claude-3-5-haiku`
- Claude 3 Opus - `claude-3-opus`
- Claude 3 Sonnet - `claude-3-sonnet`
- Claude 3 Haiku - `claude-3-haiku`

## Using the Chat Interface

1. **Enter your API key**
   - Paste your Anthropic API key in the input field at the top
   - The key is never stored on our servers
   - For security, use environment variables in production

2. **Select a model**
   - Choose your preferred Claude model from the dropdown
   - Each model shows its context window and output token limits

3. **Start chatting**
   - Type your message in the input field
   - Press Enter or click the send button
   - Messages are displayed in real-time

4. **Theme Toggle**
   - Click the sun/moon icon to switch between light and dark modes
   - Theme preference is saved locally

## Project Structure

```
claudecb/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── chat/         # Chat endpoint
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main chat interface
├── components/            # React components
│   ├── ui/               # UI components
│   ├── chat-message.tsx  # Message component
│   └── theme-toggle.tsx  # Theme switcher
├── lib/                   # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Theme**: next-themes
- **API**: Anthropic Claude API

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Customization

### Changing the Default Model
Edit `.env.local`:
```env
NEXT_PUBLIC_DEFAULT_MODEL=claude-3-5-sonnet-20241022
```

### Styling
- Modify `tailwind.config.ts` for theme customization
- Edit component styles in `components/ui/`
- Global styles are in `app/globals.css`

## Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure your Anthropic API key is valid
   - Check for any leading/trailing spaces

2. **Model Not Found**
   - Verify the model ID in your requests
   - Check available models in the dropdown

3. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run dev
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- AI powered by [Anthropic's Claude](https://www.anthropic.com/claude)

---

Made with ❤️ by originlhibrid
