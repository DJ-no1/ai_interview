'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Loader2, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/SimpleAuthContext'

interface LoginFormProps {
    userType: 'candidate' | 'recruiter'
}

export function LoginForm({ userType }: LoginFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { signIn } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await signIn(email, password, userType)
        } catch {
            setError('Invalid email or password')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-card border-border">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">OpenHire</span>
                    </div>
                    <CardTitle className="text-2xl text-card-foreground">
                        {userType === 'candidate' ? 'Candidate Login' : 'Recruiter Login'}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-foreground">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-input border-border text-foreground placeholder:text-muted-foreground pr-10"
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
                                        <EyeOff className="h-4 w-4 text-muted-foreground" /> :
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    }
                                </Button>
                            </div>
                        </div>

                        {error && (
                            <Alert className="bg-destructive/10 border-destructive/50">
                                <AlertDescription className="text-destructive">{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
                        <p className="text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link
                                href={`/register/${userType}`}
                                className="text-primary hover:text-primary/80 font-medium"
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
