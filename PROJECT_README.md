# VIRALLY - Instagram Reels & Short-form Content Generator

A Next.js application for generating compelling hooks and scripts for Instagram Reels and short-form video content, powered by OpenAI.

## Features

### 📱 Content Generation

- **Hook Generation**: Create attention-grabbing opening lines for your videos
- **Script Writing**: Generate 15-30 second scripts optimized for short-form content
- **Top Creator Mode**: Use hooks inspired by successful content creators
- **Instant Copy**: One-click copy functionality for hooks and scripts

### 🎯 Strategy Builder

- **2-Step Wizard**: Quick and simple content strategy creation
- **Personalized Recommendations**: Get content ideas tailored to your niche
- **Best Practices**: Receive tips specific to your audience and content type
- **Example Hooks**: Access 5 ready-to-use hooks for your content

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd ai-for-creators
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
# Edit .env.local and add your OpenAI API key
OPENAI_API_KEY=your-openai-api-key-here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── generate-content/ # Content generation endpoint
│   │   └── generate-strategy/ # Strategy generation endpoint
│   ├── strategy/            # Strategy wizard page
│   ├── layout.tsx          # Root layout with sidebar
│   └── page.tsx            # Main content generation page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── strategy/           # Strategy wizard components
│   ├── content-generator.tsx # Main generation interface
│   ├── hook-card.tsx       # Hook display component
│   └── script-card.tsx     # Script display component
├── hooks/
│   └── use-content-generator.ts # Content generation hook
└── lib/
    ├── constants.ts        # Prompts and configuration
    └── types.ts           # TypeScript types
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: shadcn/ui components with Tailwind CSS
- **AI**: OpenAI API (gpt-5-nano by default)
- **State Management**: React Query
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS v4

## Usage

### Generate Content

1. Navigate to the home page
2. Enter your content topic or idea
3. Toggle "Use hooks from top creators" for trending styles
4. Click "Generate Content"
5. Copy the generated hook and script

### Create Strategy

1. Click on "Strategy" in the sidebar
2. Complete Step 1: Define your content type and audience
3. Complete Step 2: Set your style preferences
4. Click "Generate Strategy" to receive personalized recommendations

## API Routes

- `POST /api/generate-content` - Generate hook and script for a topic
- `POST /api/generate-strategy` - Generate content strategy based on profile

## Notes

- The app works without an OpenAI API key (returns mock data)
- No database required - all operations are stateless
- Optimized for quick content ideation and generation

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
