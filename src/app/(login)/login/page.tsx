"use client";

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Briefcase } from 'lucide-react'

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
                    <p className="text-xl text-blue-100">Sign in to your OpenHire account</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Candidate Login */}
                    <Card className="bg-white/10 backdrop-blur-md border-blue-300/30 hover:bg-white/20 transition-all duration-300 group">
                        <CardHeader className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl text-white">Candidate Login</CardTitle>
                            <CardDescription className="text-blue-100">
                                Access your job applications and continue your career journey
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/login/candidate" className="block">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Sign in as Candidate
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Recruiter Login */}
                    <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 hover:bg-white/20 transition-all duration-300 group">
                        <CardHeader className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl text-white">Recruiter Login</CardTitle>
                            <CardDescription className="text-purple-100">
                                Manage your job postings and review candidate applications
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/login/recruiter" className="block">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                    Sign in as Recruiter
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center">
                    <p className="text-blue-100">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-blue-300 hover:text-blue-200 underline">
                            Create one here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
