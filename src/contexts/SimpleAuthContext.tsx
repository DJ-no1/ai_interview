'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    id: string
    email: string
    name: string
    role: 'candidate' | 'recruiter'
}

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string, role: 'candidate' | 'recruiter') => Promise<void>
    signUp: (name: string, email: string, password: string, role: 'candidate' | 'recruiter') => Promise<void>
    signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check for existing session in localStorage
        const savedUser = localStorage.getItem('openhire_user')
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            } catch (error) {
                console.error('Error parsing saved user:', error)
                localStorage.removeItem('openhire_user')
            }
        }
        setLoading(false)
    }, [])

    const signIn = async (email: string, password: string, role: 'candidate' | 'recruiter') => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
            role
        }

        setUser(mockUser)
        localStorage.setItem('openhire_user', JSON.stringify(mockUser))

        // Redirect based on role
        if (role === 'candidate') {
            router.push('/candidates/dashboard')
        } else {
            router.push('/recruiters/dashboard')
        }
    }

    const signUp = async (name: string, email: string, password: string, role: 'candidate' | 'recruiter') => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            role
        }

        setUser(mockUser)
        localStorage.setItem('openhire_user', JSON.stringify(mockUser))

        // Redirect based on role
        if (role === 'candidate') {
            router.push('/candidates/dashboard')
        } else {
            router.push('/recruiters/dashboard')
        }
    }

    const signOut = () => {
        setUser(null)
        localStorage.removeItem('openhire_user')
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signIn,
            signUp,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
