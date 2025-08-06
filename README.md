# OpenHire - AI-Powered Recruitment Platform

A modern, intelligent recruitment platform that revolutionizes hiring with AI automation.

## Features

- **AI-Powered Matching**: Advanced algorithms match candidates with perfect job opportunities
- **Instant Screening**: Automated resume analysis saves hours of manual review time
- **Smart Interviews**: AI-driven interviews provide deeper candidate insights
- **Comprehensive Dashboard**: Separate interfaces for candidates and recruiters

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **AI Integration**: LangChain ecosystem
- **Database**: PostgreSQL with Prisma ORM (planned)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── auth/              # Authentication components
│   ├── candidates/        # Candidate-specific components
│   └── recruiters/        # Recruiter-specific components
├── lib/                   # Utility functions and configurations
└── types/                 # TypeScript type definitions
```

## License

MIT License
