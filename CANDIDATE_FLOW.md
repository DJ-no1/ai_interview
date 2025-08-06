# Candidate Application Flow Documentation

## Complete Flow Overview

The candidate application flow has been implemented with the following steps:

### 1. **Login** ✅
- Candidates log in via `/login/candidate`
- Authentication handled by AuthContext

### 2. **Dashboard** ✅ 
- Access via `/candidates/dashboard`
- Shows overview, stats, recent applications
- Contains "Browse Jobs" button linking to jobs page
- Sidebar navigation includes "Job Search" option

### 3. **Job Search** ✅
- Access via `/candidates/jobs` 
- Shows list of available jobs with filtering/search
- Each job has "Apply Now" button
- Jobs display in card format with skills, salary, company info

### 4. **Job Details & Application** ✅
- Clicking "Apply Now" redirects to `/candidates/apply/[jobId]`
- Shows job details at top of application form
- Form includes:
  - Personal info (name, email, phone)
  - Resume upload (PDF, DOC, DOCX, TXT - max 5MB)
  - Optional cover letter
- Upload progress indicator
- Form validation

### 5. **Resume Analysis** ✅
- After successful application submission, redirects to `/candidates/application/[applicationId]/analysis`
- Downloads resume from Supabase storage
- Calls AI backend `/review-resume` API with job_id and resume file
- Shows comprehensive analysis using `ResumeAnalysisResults` component:
  - Overall match score
  - Hard filter pass/fail status
  - Detailed dimension breakdown (9 categories)
  - Evidence for each dimension
  - Risk flags and failure reasons
  - Confidence level

### 6. **Interview Initiation** ✅
- "Start AI Interview" button appears if candidate passes hard filters
- Redirects to `/candidates/interview/[sessionId]?applicationId=[id]&jobId=[id]`
- Interactive chat interface with AI interviewer
- 5 structured questions covering background, experience, and role fit
- Real-time message exchange
- Interview completion tracking

## API Integration

### Resume Review API
```
POST /review-resume
- job_id: string (required)
- file: File (PDF/DOC/DOCX/TXT)
```

### Response Format
```json
{
  "score": 85,
  "resumeReview": "Detailed review text...",
  "pros": "Strong points...",
  "cons": "Areas for improvement..."
}
```

## Database Schema

### Applications Table
```sql
applications (
  id: uuid PRIMARY KEY,
  job_id: uuid REFERENCES jobs(id),
  candidate_id: uuid REFERENCES auth.users(id),
  resume_url: text,
  status: text DEFAULT 'pending',
  score: integer,
  created_at: timestamp
)
```

### Jobs Table
```sql
jobs (
  id: uuid PRIMARY KEY,
  title: text,
  description: text,
  skills: text,
  salary: text,
  job_type: text,
  created_at: timestamp,
  end_date: timestamp
)
```

## File Storage

- Resumes stored in Supabase Storage bucket: `resumes`
- Path format: `resumes/{user_id}/{timestamp}-{filename}`
- Public URLs generated for API access

## Navigation Flow

1. **Login** → **Dashboard**
2. **Dashboard** → **Jobs** (via "Browse Jobs" or sidebar)
3. **Jobs** → **Application Form** (via "Apply Now")
4. **Application Form** → **Analysis Results** (auto-redirect after submission)
5. **Analysis Results** → **Interview** (via "Start AI Interview")
6. **Interview** → **Applications** (after completion)

## Key Components

1. **CandidatesSidebar** - Navigation with application counts
2. **JobCard** - Individual job display with apply functionality  
3. **ResumeAnalysisResults** - Comprehensive analysis display
4. **Application Form** - Resume upload and submission
5. **Interview Interface** - AI chat-based interview system

## Error Handling

- File type validation (PDF, DOC, DOCX, TXT only)
- File size limits (5MB max)
- Resume download error handling
- API call error handling with user feedback
- Authentication state validation
- Database query error handling

The flow is now complete and functional, providing a seamless experience from job discovery to AI interview completion.
