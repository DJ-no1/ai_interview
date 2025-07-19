export interface User {
    id: string;
    email: string;
    name?: string;
    role: UserRole;
    company?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Job {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    location?: string;
    salary?: string;
    type: JobType;
    status: JobStatus;
    uniqueUrl: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Application {
    id: string;
    candidateName: string;
    candidateEmail: string;
    phone?: string;
    resumeUrl: string;
    resumeScore?: number;
    status: ApplicationStatus;
    jobId: string;
    userId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Interview {
    id: string;
    status: InterviewStatus;
    score?: number;
    feedback?: string;
    transcript?: string;
    duration?: number;
    scheduledAt?: Date;
    completedAt?: Date;
    applicationId: string;
    jobId: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRole {
    RECRUITER = 'RECRUITER',
    ADMIN = 'ADMIN',
    CANDIDATE = 'CANDIDATE',
}

export enum JobType {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    CONTRACT = 'CONTRACT',
    INTERNSHIP = 'INTERNSHIP',
}

export enum JobStatus {
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    CLOSED = 'CLOSED',
}

export enum ApplicationStatus {
    PENDING = 'PENDING',
    REVIEWING = 'REVIEWING',
    INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
    INTERVIEWED = 'INTERVIEWED',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export enum InterviewStatus {
    SCHEDULED = 'SCHEDULED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

// API Response types
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Form types
export interface JobCreateForm {
    title: string;
    description: string;
    requirements: string[];
    location?: string;
    salary?: string;
    type: JobType;
}

export interface ApplicationForm {
    candidateName: string;
    candidateEmail: string;
    phone?: string;
    resume: File;
}

export interface InterviewQuestion {
    id: string;
    question: string;
    expectedAnswer?: string;
    category: QuestionCategory;
}

export enum QuestionCategory {
    TECHNICAL = 'TECHNICAL',
    BEHAVIORAL = 'BEHAVIORAL',
    SITUATIONAL = 'SITUATIONAL',
    GENERAL = 'GENERAL',
}

// LangChain/AI types
export interface ResumeAnalysis {
    score: number;
    strengths: string[];
    weaknesses: string[];
    matchPercentage: number;
    keySkills: string[];
    experience: number; // years
    recommendations: string[];
}

export interface InterviewSession {
    id: string;
    questions: InterviewQuestion[];
    currentQuestionIndex: number;
    responses: InterviewResponse[];
    status: InterviewStatus;
}

export interface InterviewResponse {
    questionId: string;
    response: string;
    score?: number;
    feedback?: string;
    timestamp: Date;
}
