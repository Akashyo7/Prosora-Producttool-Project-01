# Product Idea Assistant

An AI-powered tool for generating innovative product ideas using Google Gemini and modern web technologies. Built as part of the prosora.in personal branding ecosystem.

## Features

- 🤖 **AI-Powered Ideation**: Generate creative product ideas using Google Gemini
- 💬 **Interactive Chat**: Refine ideas through conversational interface
- 🎯 **Context-Aware**: Maintains conversation history for better suggestions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🔓 **Open Source**: Full source code available for learning and contribution
- ⚡ **Fast & Free**: Uses Gemini's generous free tier

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd product-idea-assistant
npm install
```

### 2. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:
```
GOOGLE_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Usage Examples

Try these prompts to get started:

- "Generate product ideas for sustainable fashion"
- "What are some fintech solutions for small businesses?"
- "AI tools for remote team collaboration"
- "Healthcare apps for elderly care"
- "EdTech solutions for skill-based learning"

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **AI Model**: Google Gemini Pro
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## API Usage & Limits

This app uses Google Gemini's free tier which includes:
- 60 requests per minute
- 1,500 requests per day
- No cost for personal/development use

For production deployment, consider:
- Implementing rate limiting
- Adding user authentication
- Monitoring API usage
- Upgrading to paid tier if needed

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add `GOOGLE_API_KEY` environment variable
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Node.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Roadmap

- [ ] Add web search integration via MCP
- [ ] Export ideas to PDF/Markdown
- [ ] Idea refinement through follow-up questions
- [ ] Usage analytics and insights
- [ ] Multi-language support
- [ ] Integration with project management tools

## License

MIT License - see LICENSE file for details.

## Links

- **Live Demo**: [Your deployment URL]
- **Main Website**: [prosora.in](https://prosora.in)
- **GitHub**: [Repository URL]

---

Built with ❤️ as part of the prosora.in AI-powered personal branding ecosystem.