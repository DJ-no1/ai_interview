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

interface LoginFormProps {
    userType: 'candidate' | 'recruiter'
}

export function LoginForm({ userType }: LoginFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            // Simulate login - replace with actual auth logic
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Redirect based on user type
            if (userType === 'candidate') {
                router.push('/candidates/dashboard')
            } else {
                router.push('/recruiters/dashboard')
            }
        } catch (err) {
            setError('Invalid email or password')
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
                        {userType === 'candidate' ? 'Candidate Login' : 'Recruiter Login'}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400 pr-10"
                                    placeholder="Enter your password"
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
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                href={`/register/${userType}`}
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
