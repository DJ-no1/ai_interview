# OpenHire AI Coding Instructions

## Architecture Overview

OpenHire is a Next.js 14 AI recruitment platform with dual authentication flows (candidates/recruiters). The app uses App Router with route groups for role-based layouts:

- `(candidates)/` - Candidate-specific routes with custom sidebar
- `(login)/` - Authentication routes for both roles
- `recruiters/` - Recruiter dashboard with different nav pattern

## Key Patterns & Conventions

### Authentication & Route Protection

- **Dual auth system**: Supabase auth + custom user profiles in database
- **Middleware pattern**: `middleware.ts` handles route protection and role-based redirects
- **Mock client fallback**: `src/lib/supabase.ts` provides mock Supabase client for development
- **Auth context**: `src/contexts/AuthContext.tsx` manages user state globally

```typescript
// Always check user role for route access
const { user, userProfile } = useAuth();
if (userProfile?.role === "RECRUITER") {
  /* recruiter logic */
}
```

### UI Component System

- **shadcn/ui**: New York style with dark mode default, CSS variables enabled
- **Component aliases**: Use `@/components/ui` for base components, `@/components/[domain]` for feature components
- **Floating navigation**: Global navigation except on recruiter pages (`shouldHide` pattern)
- **Role-specific sidebars**: Different navigation for candidates vs recruiters

### AI Integration Architecture

- **LangChain setup**: `src/lib/langchain/openai.ts` - GPT-4 with 0.7 temperature
- **Resume analysis**: Structured JSON responses with scoring (0-100), strengths, weaknesses
- **Type safety**: All AI responses use TypeScript interfaces from `src/types/index.ts`

### Database & State Management

- **Supabase + Prisma**: Double ORM pattern (Supabase for auth, Prisma schema referenced but not found)
- **Type definitions**: Comprehensive enums in `src/types/index.ts` (UserRole, JobStatus, ApplicationStatus, etc.)
- **Mock data pattern**: Components use mock data objects for development/demo

## Development Workflow

### Adding UI Components

```bash
npx shadcn@latest add [component-name]
```

### Database Operations

```bash
npm run db:generate  # After schema changes
npm run db:push      # Development
npm run db:migrate   # Production migrations
npm run db:studio    # Database GUI
```

### Development Server

```bash
npm run dev  # Uses Turbopack for faster builds
```

## Critical Integration Points

### Route Group Layouts

- Each route group has its own `layout.tsx` with role-specific components
- Middleware redirects unauthenticated users: `/dashboard` → `/login/candidate`
- Role detection in middleware determines redirect destination after login

### AI Processing Flow

1. Resume upload → `OpenHireAI.analyzeResume()`
2. Structured prompts with JSON schema enforcement
3. Type-safe responses using `ResumeAnalysis` interface
4. Score calculation and skill extraction

### Component Communication

- Global auth state via React Context
- Navigation state managed per route group
- Theme toggle in floating nav affects document classes

## Environment Setup

Required env vars: `DATABASE_URL`, `NEXTAUTH_SECRET`, `OPENAI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Mock clients activate automatically when credentials are placeholder values.
