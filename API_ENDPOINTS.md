# OpenHire Backend API Documentation

This document provides comprehensive details for every endpoint in the OpenHire backend, including request/response formats, authentication, error handling, and supported features. The backend is built with FastAPI and integrates AI-powered interview and resume review systems, job management, user management, and real-time WebSocket communication.

---

## Table of Contents

- [Authentication & Roles](#authentication--roles)
- [Resume Review](#resume-review)
- [Chat AI](#chat-ai)
- [Job Management](#job-management)
- [User Management](#user-management)
- [AI Interview WebSocket](#ai-interview-websocket)
- [AI Interview REST Endpoints](#ai-interview-rest-endpoints)
- [Test Endpoints](#test-endpoints)
- [Error Handling](#error-handling)
- [Supported Features](#supported-features)

---

## Authentication & Roles

- Some endpoints require role-based access (recruiter/candidate).
- User creation: POST `/users` with role 'recruiter' or 'candidate'.
- Job management: Only recruiters can create, update, and delete jobs.

---

## Resume Review

### POST `/review-resume`

AI-powered resume review and scoring against a job description.

**Request (Form, File Upload, or JSON):**

- `resume`: Resume text (string)
- `job_id`: Job ID (string, required)
- `file`: PDF, DOCX, or TXT file (optional)

**Response:**

```
{
  "score": 8,
  "resumeReview": "The resume matches most job requirements...",
  "pros": "Strong Python and ML experience...",
  "cons": "Lacks AWS deployment experience..."
}
```

**Description:**

- Accepts resume as plain text, file upload, or JSON.
- Returns score, review, pros, and cons.
- Supports PDF, DOCX, and TXT files.
- Validates file type and encoding.
- Fetches job description from Supabase using `job_id`.

---

## Chat AI

### POST `/chat`

Conversational AI assistant for general queries.

**Request:**

```
{
  "user_input": "Hello, what can you do?",
  "messages": [
    {"type": "system", "content": "You are a helpful assistant"},
    {"type": "human", "content": "Previous user message"},
    {"type": "ai", "content": "Previous AI response"}
  ]
}
```

**Response:**

```
{
  "response": "I am an AI assistant. How can I help you today?",
  "sentiment": "continue",
  "messages": [ ... ]
}
```

**Description:**

- Send a `user_input` string and optional conversation history.
- Returns AI response with updated message history.

---

## Job Management

### POST `/jobs`

Create a new job posting (recruiter only).

**Request:**

```
{
  "recruiter_id": "uuid-1234",
  "title": "Software Engineer",
  "description": "Develop and maintain backend services.",
  "salary": "$100k-$120k",
  "skills": "Python, FastAPI, SQL",
  "job_type": "full-time",
  "end_date": "2025-12-31T23:59:59"
}
```

**Response:**

```
{
  "id": "uuid-5678",
  "recruiter_id": "uuid-1234",
  "title": "Software Engineer",
  "description": "Develop and maintain backend services.",
  "salary": "$100k-$120k",
  "skills": "Python, FastAPI, SQL",
  "job_type": "full-time",
  "created_at": "2025-07-23T12:00:00",
  "end_date": "2025-12-31T23:59:59",
  "job_link": "/j/abc123"
}
```

**Description:**

- Only recruiters can create jobs.
- Returns the created job object including a short job link.

---

### GET `/jobs`

List all jobs with optional filters and sorting.

**Query Parameters:**

- `recruiter_id`: Filter by recruiter
- `job_type`: Filter by job type
- `title`: Filter by job title
- `sort_by`: Sort by field (created_at, salary, title)
- `sort_order`: asc or desc

**Response:**
List of job objects.

---

### PUT `/jobs/{job_id}`

Update job details (recruiter only).

**Request:**

```
{
  "recruiter_id": "uuid-1234",
  "title": "Senior Software Engineer",
  "salary": "$120k-$140k"
}
```

**Response:**
Updated job object.

---

### DELETE `/jobs/{job_id}`

Delete a job (recruiter only).

**Query Parameter:**

- `recruiter_id`: Recruiter ID for authorization

**Response:**

```
{"success": true}
```

---

### GET `/j/{short_code}`

Get job details by short link code.

**Response:**
Job object.

---

## User Management

### POST `/users`

Create a new user (recruiter or candidate).

**Request:**

```
{
  "email": "user@example.com",
  "role": "recruiter",
  "name": "John Doe"
}
```

**Response:**

```
{
  "id": "uuid-9876",
  "email": "user@example.com",
  "role": "recruiter",
  "name": "John Doe",
  "created_at": "2025-07-23T12:00:00"
}
```

**Description:**

- Role must be either 'recruiter' or 'candidate'.
- Email must be unique.

---

## AI Interview WebSocket

### WebSocket `/ws/ai-interview`

AI-powered interview WebSocket for real-time interview sessions.

**Connection Example:**
`ws://localhost:8000/ws/ai-interview?session_id=optional&candidate_id=optional`

**Client -> Server Messages:**

- `initialize_interview`: Start interview with job description and resume
- `submit_answer`: Send candidate's answer
- `end_interview`: End interview early
- `ping`: Health check

**Server -> Client Messages:**

- `connection_success`: Connection established
- `welcome`: Instructions
- `question`: Interview question
- `answer_received`: Acknowledgment
- `analysis_started`: Analysis in progress
- `interview_completed`: Final analysis and scores
- `error`: Error message
- `pong`: Ping response

**Interview Structure:**

- 5 structured questions: greeting, resume, follow-up, scenario, scenario follow-up
- Real-time analysis and feedback

---

## AI Interview REST Endpoints

### GET `/ai-interview/status/{session_id}`

Get current interview session status and progress.

**Response:**

```
{
  "session_id": "session_123",
  "status": "active",
  "questions_asked": 3,
  "total_questions": 5,
  "progress_percentage": 60.0,
  "has_feedback": false,
  "timestamp": "2025-01-28T10:45:00"
}
```

---

### GET `/ai-interview/results/{session_id}`

Get completed interview analysis and scores.

**Response:**

```
{
  "session_id": "session_123",
  "analysis": {
    "overall_score": 8.5,
    "technical_score": 8.0,
    "communication_score": 9.0,
    "problem_solving_score": 8.0,
    "cultural_fit_score": 9.0,
    "strengths": ["Strong communication", "Relevant experience"],
    "areas_for_improvement": ["Technical depth", "System design"],
    "overall_feedback": "Strong candidate with good potential...",
    "recommendation": "hire"
  },
  "interview_data": {
    "questions_asked": 5,
    "total_messages": 12,
    "completion_time": "2025-01-28T11:00:00"
  },
  "timestamp": "2025-01-28T11:00:00"
}
```

---

### DELETE `/ai-interview/session/{session_id}`

Manually cleanup an AI interview session.

**Response:**

```
{
  "message": "Session session_123 cleaned up successfully",
  "timestamp": "2025-01-28T11:05:00"
}
```

---

### GET `/ai-interview/health`

AI interview system health check.

**Response:**

```
{
  "status": "healthy",
  "service": "AI Interview WebSocket",
  "active_sessions": 0,
  "timestamp": "2025-01-28T11:00:00",
  "version": "1.0.0"
}
```

---

## Test Endpoints

### POST `/test-chat`

Test chat endpoint for development and debugging.

**Request/Response:** Same as `/chat`, but with test prefix.

---

### WebSocket `/ws/test-chat`

Test WebSocket chat endpoint for development.

**Connection Example:**
`ws://localhost:8000/test/ws/test-chat`

**Description:**

- Supports conversation history and real-time messaging.
- Returns AI responses with `[TEST]` prefix.

---

## Error Handling

- All endpoints return detailed error messages and tracebacks for debugging.
- Common error codes: 400 (bad request), 403 (forbidden), 404 (not found), 409 (conflict), 500 (internal server error).
- Duplicate email errors are handled with status 409.
- File type and encoding errors are handled with status 400.

---

## Supported Features

- AI-powered resume review with job matching
- Real-time AI interviews with structured questions
- Job posting and management system
- User management for recruiters and candidates
- File upload support (PDF, DOCX, TXT)
- WebSocket real-time communication
- Short link generation for job sharing

---

## Models

### User

- `id`: Unique user ID (UUID)
- `email`: User's email address
- `role`: 'recruiter' or 'candidate'
- `name`: Full name
- `created_at`: Timestamp

### Job

- `id`: Unique job ID (UUID)
- `recruiter_id`: Recruiter ID
- `title`: Job title
- `description`: Job description
- `salary`: Salary details
- `skills`: Required skills
- `job_type`: Job type
- `job_link`: Short job link
- `created_at`: Timestamp
- `end_date`: Expiry date

### Application

- `id`: Application ID
- `job_id`: Job ID
- `candidate_id`: Candidate ID
- `resume_url`: Resume file URL
- `status`: Application status
- `score`: AI-generated score
- `created_at`: Timestamp

### InterviewSession

- `id`: Session ID
- `session_id`: WebSocket session identifier
- `candidate_id`: Candidate ID
- `job_id`: Job ID
- `application_id`: Application ID
- `start_time`: Start timestamp
- `end_time`: End timestamp
- `duration_minutes`: Duration
- `questions_asked`: Number of questions
- `interview_phase`: Current phase
- `early_termination`: Whether ended early
- `comfort_level`: Candidate comfort
- `engagement_level`: Engagement
- `technical_score`: Technical score
- `communication_score`: Communication score
- `confidence_score`: Confidence score
- `strengths_identified`: List of strengths
- `areas_to_improve`: Areas to improve
- `red_flags`: Red flags
- `overall_recommendation`: Recommendation
- `final_feedback`: Final feedback
- `conversation_history`: Transcript
- `created_at`: Created timestamp
- `updated_at`: Last update

### InterviewArtifact

- `id`: Artifact ID
- `interview_id`: Interview ID
- `type`: Artifact type
- `file_url`: File URL
- `timestamp`: Timestamp

---

## WebSocket Notes

- WebSocket endpoints do not appear in `/docs` but are fully functional.
- See `/ws/ai-interview` and `/test/ws/test-chat` for real-time features.

---

## API Discovery

### GET `/`

Welcome message and comprehensive API route listing with examples.

---

For further details, see the source code and route implementations.
