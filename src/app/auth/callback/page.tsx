'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const userType = searchParams.get('userType')

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                const { data, error } = await supabase.auth.getSession()

                if (error) {
                    console.error('Auth error:', error)
                    router.push('/login/candidate')
                    return
                }

                if (data.session?.user) {
                    const user = data.session.user

                    // Check if user exists in our database
                    const { data: existingUser } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', user.id)
                        .single()

                    if (!existingUser) {
                        // Create user profile in our database
                        const { error: insertError } = await supabase
                            .from('users')
                            .insert({
                                id: user.id,
                                email: user.email!,
                                name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
                                role: userType || 'candidate'
                            })

                        if (insertError) {
                            console.error('Error creating user profile:', insertError)
                        }
                    }

                    // Redirect based on role
                    const role = existingUser?.role || userType || 'candidate'
                    if (role === 'recruiter') {
                        router.push('/recruiters/dashboard')
                    } else {
                        router.push('/dashboard') // Use the grouped route for candidates
                    }
                } else {
                    router.push('/login/candidate')
                }
            } catch (error) {
                console.error('Auth callback error:', error)
                router.push('/login/candidate')
            }
        }

        handleAuthCallback()
    }, [router, userType])

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="text-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                <p className="text-white">Completing authentication...</p>
            </div>
        </div>
    )
}
