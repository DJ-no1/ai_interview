// Backend API client for OpenHire
const BACKEND_URL = process.env.NEXT_PUBLIC_AI_BACKEND_URL || 'http://localhost:8000';

interface BackendResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Types from backend API
interface ResumeReviewRequest {
    resume: string;
    job_id: string;
}

interface ResumeReviewResponse {
    score: number;
    resumeReview: string;
    pros: string;
    cons: string;
}

interface JobRequest {
    recruiter_id: string;
    title: string;
    description: string;
    salary: string;
    skills: string;
    job_type: string;
    end_date: string;
}

interface Job {
    id: string;
    recruiter_id: string;
    title: string;
    description: string;
    salary: string;
    skills: string;
    job_type: string;
    created_at: string;
    end_date: string;
    job_link: string;
}

interface UserRequest {
    email: string;
    role: 'recruiter' | 'candidate';
    name: string;
}

interface User {
    id: string;
    email: string;
    role: 'recruiter' | 'candidate';
    name: string;
    created_at: string;
}

interface ChatRequest {
    user_input: string;
    messages?: Array<{
        type: 'system' | 'human' | 'ai';
        content: string;
    }>;
}

interface ChatResponse {
    response: string;
    sentiment: string;
    messages: Array<{
        type: 'system' | 'human' | 'ai';
        content: string;
    }>;
}

interface InterviewSessionStatus {
    session_id: string;
    status: string;
    questions_asked: number;
    total_questions: number;
    progress_percentage: number;
    has_feedback: boolean;
    timestamp: string;
}

interface InterviewResults {
    session_id: string;
    analysis: {
        overall_score: number;
        technical_score: number;
        communication_score: number;
        problem_solving_score: number;
        cultural_fit_score: number;
        strengths: string[];
        areas_for_improvement: string[];
        overall_feedback: string;
        recommendation: string;
    };
    interview_data: {
        questions_asked: number;
        total_messages: number;
        completion_time: string;
    };
    timestamp: string;
}

class BackendAPI {
    private baseUrl: string;

    constructor() {
        this.baseUrl = BACKEND_URL;
    }

    private async makeRequest<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers: defaultHeaders,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    // Resume Review
    async reviewResume(data: ResumeReviewRequest): Promise<ResumeReviewResponse> {
        return this.makeRequest<ResumeReviewResponse>('/review-resume', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async reviewResumeWithFile(formData: FormData): Promise<ResumeReviewResponse> {
        return fetch(`${this.baseUrl}/review-resume`, {
            method: 'POST',
            body: formData, // FormData sets its own Content-Type
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        });
    }

    // Chat AI
    async chat(data: ChatRequest): Promise<ChatResponse> {
        return this.makeRequest<ChatResponse>('/chat', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Job Management
    async createJob(data: JobRequest): Promise<Job> {
        return this.makeRequest<Job>('/jobs', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getJobs(filters?: {
        recruiter_id?: string;
        job_type?: string;
        title?: string;
        sort_by?: string;
        sort_order?: 'asc' | 'desc';
    }): Promise<Job[]> {
        const queryParams = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) queryParams.set(key, value);
            });
        }

        const queryString = queryParams.toString();
        const endpoint = queryString ? `/jobs?${queryString}` : '/jobs';

        return this.makeRequest<Job[]>(endpoint);
    }

    async updateJob(jobId: string, data: Partial<JobRequest>): Promise<Job> {
        return this.makeRequest<Job>(`/jobs/${jobId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteJob(jobId: string, recruiterId: string): Promise<{ success: boolean }> {
        return this.makeRequest<{ success: boolean }>(`/jobs/${jobId}?recruiter_id=${recruiterId}`, {
            method: 'DELETE',
        });
    }

    async getJobByShortCode(shortCode: string): Promise<Job> {
        return this.makeRequest<Job>(`/j/${shortCode}`);
    }

    // Get job by ID (assumes job ID can be used as shortCode or we fetch from jobs list)
    async getJobById(jobId: string): Promise<Job> {
        // First try to get by shortCode (if jobId is a shortCode)
        try {
            return await this.getJobByShortCode(jobId);
        } catch (err) {
            console.error('Error getting job by shortCode:', err);
            // If that fails, fetch all jobs and find by ID
            const jobs = await this.getJobs();
            const job = jobs.find(j => j.id.toString() === jobId);
            if (!job) {
                throw new Error(`Job with ID ${jobId} not found`);
            }
            return job;
        }
    }

    // User Management
    async createUser(data: UserRequest): Promise<User> {
        return this.makeRequest<User>('/users', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // AI Interview REST Endpoints
    async getInterviewStatus(sessionId: string): Promise<InterviewSessionStatus> {
        return this.makeRequest<InterviewSessionStatus>(`/ai-interview/status/${sessionId}`);
    }

    async getInterviewResults(sessionId: string): Promise<InterviewResults> {
        return this.makeRequest<InterviewResults>(`/ai-interview/results/${sessionId}`);
    }

    async cleanupInterviewSession(sessionId: string): Promise<{ message: string; timestamp: string }> {
        return this.makeRequest<{ message: string; timestamp: string }>(`/ai-interview/session/${sessionId}`, {
            method: 'DELETE',
        });
    }

    async getInterviewHealth(): Promise<{
        status: string;
        service: string;
        active_sessions: number;
        timestamp: string;
        version: string;
    }> {
        return this.makeRequest('/ai-interview/health');
    }

    // WebSocket URLs
    getAIInterviewWebSocketUrl(sessionId?: string, candidateId?: string): string {
        const wsUrl = this.baseUrl.replace('http', 'ws');
        const params = new URLSearchParams();
        if (sessionId) params.set('session_id', sessionId);
        if (candidateId) params.set('candidate_id', candidateId);

        const queryString = params.toString();
        return `${wsUrl}/ws/ai-interview${queryString ? `?${queryString}` : ''}`;
    }

    getTestChatWebSocketUrl(): string {
        const wsUrl = this.baseUrl.replace('http', 'ws');
        return `${wsUrl}/test/ws/test-chat`;
    }

    // Health check
    async healthCheck(): Promise<boolean> {
        try {
            await this.makeRequest('/');
            return true;
        } catch {
            return false;
        }
    }
}

// Export singleton instance
export const backendAPI = new BackendAPI();

// Export types
export type {
    ResumeReviewRequest,
    ResumeReviewResponse,
    JobRequest,
    Job,
    UserRequest,
    User,
    ChatRequest,
    ChatResponse,
    InterviewSessionStatus,
    InterviewResults,
    BackendResponse,
};
