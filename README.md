# OpenHire - AI-Powered Recruitment Platform

OpenHire is an intelligent recruitment platform that revolutionizes hiring with automation. Recruiters can post their requirements, and our AI system will recruit people for them, merging AI interviews and agent notifications when necessary.

## Features

### 🚀 Core Features

- **Smart Job Posting**: AI-powered job description generation
- **Unique Application Links**: Generate unique URLs for each job posting
- **Resume Analysis**: Automated resume scoring and analysis using AI
- **AI-Powered Interviews**: Conduct interviews with intelligent AI agents
- **Comprehensive Feedback**: Detailed candidate evaluations and recommendations
- **Data-Driven Insights**: Analytics and reporting for recruitment metrics

### 🛠 Technology Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: LangChain, LangGraph, LangSmith
- **LLM**: OpenAI GPT-4
- **Authentication**: NextAuth.js
- **File Handling**: Resume parsing and storage

### 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components
│   └── forms/             # Form components
├── lib/
│   ├── langchain/         # AI/LangChain utilities
│   ├── database/          # Database utilities
│   └── auth/              # Authentication utilities
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions

prisma/
└── schema.prisma          # Database schema
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**
   Update the following variables in `.env.local`:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/openhire"
   NEXTAUTH_SECRET="your-secret-key-here"
   OPENAI_API_KEY="your-openai-api-key"
   LANGCHAIN_API_KEY="your-langsmith-api-key" # Optional
   ```

3. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development Workflow

### Database Changes

```bash
# After modifying schema.prisma
npx prisma generate
npx prisma db push

# For production migrations
npx prisma migrate dev
```

### Adding UI Components

```bash
# Add shadcn/ui components
npx shadcn@latest add [component-name]
```

### AI Integration

The project uses LangChain for AI integration:

- **Resume Analysis**: Automated scoring and matching
- **Interview Questions**: Dynamic question generation
- **Response Evaluation**: AI-powered interview assessment
- **Job Description Generation**: AI-assisted job posting creation

## Project Roadmap

### Phase 1: Core Foundation ✅

- [x] Project setup with Next.js 14
- [x] shadcn/ui integration
- [x] Database schema design
- [x] LangChain integration
- [x] Basic project structure

### Phase 2: Authentication & Basic Features

- [ ] User authentication system
- [ ] Recruiter dashboard
- [ ] Job posting functionality
- [ ] Basic resume upload

### Phase 3: AI Integration

- [ ] Resume analysis with AI
- [ ] AI interview system
- [ ] Question generation
- [ ] Response evaluation

### Phase 4: Advanced Features

- [ ] Analytics dashboard
- [ ] Notification system
- [ ] Advanced reporting
- [ ] Integration APIs

### Phase 5: Landing Page & Polish

- [ ] Landing page implementation
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Testing and deployment
