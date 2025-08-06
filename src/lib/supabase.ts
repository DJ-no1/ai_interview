/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create a real client if we have valid credentials
let supabase: any;

try {
    if (supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key') {
        supabase = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true,
            },
        })
    } else {
        console.warn('Running in development mode - Supabase client not initialized')
        // Create a mock client for development
        supabase = {
            auth: {
                getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                getSession: () => Promise.resolve({ data: { session: null }, error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
                signOut: () => Promise.resolve({ error: null })
            },
            from: (table: string) => ({
                select: (columns?: string) => ({
                    eq: (column: string, value: any) => ({
                        single: () => Promise.resolve({ data: null, error: { message: 'Development mode' } })
                    })
                }),
                insert: (data: any) => Promise.resolve({ data: null, error: { message: 'Development mode - insert not implemented' } })
            })
        }
    }
} catch (error) {
    console.error('Failed to initialize Supabase client:', error)
    // Fallback mock client
    supabase = {
        auth: {
            getUser: () => Promise.resolve({ data: { user: null }, error: null }),
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signOut: () => Promise.resolve({ error: null })
        },
        from: (table: string) => ({
            select: (columns?: string) => ({
                eq: (column: string, value: any) => ({
                    single: () => Promise.resolve({ data: null, error: { message: 'Client initialization failed' } })
                })
            }),
            insert: (data: any) => Promise.resolve({ data: null, error: { message: 'Client initialization failed - insert not implemented' } })
        })
    }
}

export { supabase }

// Types for our database tables
export interface DatabaseUser {
    id: string
    email: string
    role: 'recruiter' | 'candidate'
    name?: string
    created_at?: string
}

export interface DatabaseJob {
    id: string
    recruiter_id: string
    title: string
    description: string
    salary?: string
    skills: string
    job_type: string
    job_link?: string
    created_at?: string
    end_date?: string
}

export interface DatabaseApplication {
    id: string
    job_id: string
    candidate_id: string
    resume_url: string
    status: string
    score?: number
    created_at?: string
}

export interface DatabaseInterview {
    id: string
    application_id: string
    start_time?: string
    end_time?: string
    ai_summary?: string
    confidence?: number
    knowledge_score?: number
    result?: string
    created_at?: string
}
