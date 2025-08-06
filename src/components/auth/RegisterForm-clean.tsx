'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Loader2, Zap } from 'lucide-react'

interface RegisterFormProps {
    userType: 'candidate' | 'recruiter'
}

export function RegisterForm({ userType }: RegisterFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            setIsLoading(false)
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            setIsLoading(false)
            return
        }

        try {
            // TODO: Replace this simulated registration with actual Supabase/Prisma auth logic
            // Example: await supabase.auth.signUp({ email: formData.email, password: formData.password })
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Redirect to login after successful registration
            router.push(`/login/${userType}`)
        } catch (error) {
            console.error('Registration error:', error)
            setError('Registration failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white/5 border-gray-800 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">OpenHire</span>
                    </div>
                    <CardTitle className="text-2xl text-white">
                        {userType === 'candidate' ? 'Create Candidate Account' : 'Create Recruiter Account'}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Sign up to get started with OpenHire
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400 pr-10"
                                    placeholder="Create a password"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ?
                                        <EyeOff className="h-4 w-4 text-gray-400" /> :
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    }
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
                                placeholder="Confirm your password"
                            />
                        </div>

                        {error && (
                            <Alert className="bg-red-900/20 border-red-800">
                                <AlertDescription className="text-red-300">{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <Link
                                href={`/login/${userType}`}
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
