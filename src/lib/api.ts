const API_BASE_URL = process.env.NEXT_PUBLIC_AI_BACKEND_URL || 'http://localhost:8000'

// Types
export interface Job {
    id: string
    title: string
    company: string
    description: string
    requirements: string
    skills: string
    location: string
    job_type: string
    salary_range: string
    created_at: string
    recruiter_id: string
    benefits?: string
}

export interface ReviewResponse {
    id: string
    status: 'processing' | 'completed' | 'failed'
    analysis?: {
        overall_score: number
        dimensions: {
            [key: string]: {
                score: number
                weight: number
                evidence: string[]
            }
        }
        risk_flags: Array<{
            type: string
            severity: 'low' | 'medium' | 'high'
            description: string
        }>
        hard_filter_failures: Array<{
            criterion: string
            description: string
        }>
        recommendations: string[]
    }
    job?: Job
    created_at: string
    updated_at: string
}

// API utility functions
export class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error('API request failed:', error)
            throw error
        }
    }

    // User Management
    async createUser(userData: {
        email: string
        role: 'recruiter' | 'candidate'
        name: string
    }) {
        return this.request('/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        })
    }

    async getUser(userId: string) {
        return this.request(`/users/${userId}`)
    }

    // Job Management
    async getJobs() {
        return this.request('/jobs')
    }

    async getJob(jobId: string) {
        return this.request(`/jobs/${jobId}`)
    }

    async createJob(jobData: Omit<Job, 'id' | 'created_at'>) {
        return this.request('/jobs', {
            method: 'POST',
            body: JSON.stringify(jobData),
        })
    }

    // Application Management
    async submitApplication(applicationData: {
        jobId: string
        candidateId: string
        resumeFile?: File
        coverLetter?: string
    }) {
        const formData = new FormData()
        formData.append('jobId', applicationData.jobId)
        formData.append('candidateId', applicationData.candidateId)

        if (applicationData.resumeFile) {
            formData.append('resume', applicationData.resumeFile)
        }

        if (applicationData.coverLetter) {
            formData.append('coverLetter', applicationData.coverLetter)
        }

        return fetch(`${this.baseUrl}/applications`, {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
    }

    async getApplications(userId: string, role: 'recruiter' | 'candidate') {
        return this.request(`/applications?userId=${userId}&role=${role}`)
    }

    async getApplication(applicationId: string) {
        return this.request(`/applications/${applicationId}`)
    }

    // Resume Analysis
    async analyzeResume(resumeFile: File, jobId?: string) {
        const formData = new FormData()
        formData.append('resume', resumeFile)
        if (jobId) {
            formData.append('jobId', jobId)
        }

        return fetch(`${this.baseUrl}/analyze-resume`, {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
    }

    // Interview Management
    async createInterview(interviewData: {
        applicationId: string
        scheduledAt: string
        type: string
    }) {
        return this.request('/interviews', {
            method: 'POST',
            body: JSON.stringify(interviewData),
        })
    }

    async getInterviews(userId: string, role: 'recruiter' | 'candidate') {
        return this.request(`/interviews?userId=${userId}&role=${role}`)
    }

    async getInterview(interviewId: string) {
        return this.request(`/interviews/${interviewId}`)
    }

    // AI Interview Session
    async startAIInterview(sessionData: {
        applicationId: string
        jobId: string
        candidateId: string
    }) {
        return this.request('/ai-interview/start', {
            method: 'POST',
            body: JSON.stringify(sessionData),
        })
    }

    async submitAnswer(sessionId: string, answer: string) {
        return this.request(`/ai-interview/${sessionId}/answer`, {
            method: 'POST',
            body: JSON.stringify({ answer }),
        })
    }

    async endSession(sessionId: string) {
        return this.request(`/ai-interview/${sessionId}/end`, {
            method: 'POST',
        })
    }

    async getSessionResults(sessionId: string) {
        return this.request(`/ai-interview/${sessionId}/results`)
    }
}

export const apiClient = new ApiClient()

// WebSocket utilities
export class WebSocketClient {
    private ws: WebSocket | null = null
    private url: string
    private onMessage?: (data: unknown) => void
    private onError?: (error: Event) => void
    private onOpen?: () => void
    private onClose?: () => void

    constructor(endpoint: string, callbacks: {
        onMessage?: (data: unknown) => void
        onError?: (error: Event) => void
        onOpen?: () => void
        onClose?: () => void
    }) {
        const wsUrl = API_BASE_URL.replace('http', 'ws')
        this.url = `${wsUrl}${endpoint}`
        this.onMessage = callbacks.onMessage
        this.onError = callbacks.onError
        this.onOpen = callbacks.onOpen
        this.onClose = callbacks.onClose
    }

    connect() {
        try {
            const wsUrl = API_BASE_URL.replace('http', 'ws')
            this.ws = new WebSocket(`${wsUrl}/ws/ai-interview`)

            this.ws.onopen = () => {
                console.log('WebSocket connected')
                this.onOpen?.()
            }

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data)
                    this.onMessage?.(data)
                } catch (error) {
                    console.error('Failed to parse WebSocket message:', error)
                }
            }

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error)
                this.onError?.(error)
            }

            this.ws.onclose = () => {
                console.log('WebSocket disconnected')
                this.onClose?.()
            }
        } catch (error) {
            console.error('Failed to create WebSocket connection:', error)
            this.onError?.(error as Event)
        }
    }

    send(data: unknown) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data))
        } else {
            console.error('WebSocket is not connected')
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close()
            this.ws = null
        }
    }
}

export function createInterviewWebSocket(callbacks: {
    onMessage?: (data: unknown) => void
    onError?: (error: Event) => void
    onOpen?: () => void
    onClose?: () => void
}) {
    return new WebSocketClient('/ws/ai-interview', callbacks)
}

// API Configuration
export const API_CONFIG = {
    baseUrl: API_BASE_URL,
    timeout: 30000,
    retries: 3,
    ENDPOINTS: {
        JOBS: '/jobs',
        REVIEW_RESUME: '/review-resume',
        REVIEW_BY_ID: (id: string) => `/review/${id}`
    },
    TIMEOUTS: {
        FETCH: 10000,
        UPLOAD: 30000
    }
}

// Utility functions
export function getApiUrl(endpoint: string): string {
    return `${API_BASE_URL}${endpoint}`
}

export function createResumeFormData(fileOrJobId: File | string, secondParam?: File | string): FormData {
    const formData = new FormData()

    // Handle both function signatures: (file, jobId) and (jobId, file)
    if (typeof fileOrJobId === 'string') {
        // First param is jobId, second is file
        formData.append('jobId', fileOrJobId)
        if (secondParam instanceof File) {
            formData.append('resume', secondParam)
        }
    } else {
        // First param is file, second is jobId
        formData.append('resume', fileOrJobId)
        if (typeof secondParam === 'string') {
            formData.append('jobId', secondParam)
        }
    }

    return formData
}

export function validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

    if (file.size > maxSize) {
        return { valid: false, error: 'File size must be less than 10MB' }
    }

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'File must be PDF, DOC, or DOCX format' }
    }

    return { valid: true }
}
