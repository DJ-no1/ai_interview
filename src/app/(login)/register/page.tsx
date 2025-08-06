"use client";

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Briefcase } from 'lucide-react'

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">Join OpenHire</h1>
                    <p className="text-xl text-blue-100">Choose your account type to get started</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Candidate Registration */}
                    <Card className="bg-white/10 backdrop-blur-md border-blue-300/30 hover:bg-white/20 transition-all duration-300 group">
                        <CardHeader className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl text-white">I&apos;m a Candidate</CardTitle>
                            <CardDescription className="text-blue-100">
                                Looking for your next opportunity? Find amazing jobs and showcase your skills through AI-powered interviews.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-2 text-blue-100 text-sm">
                                <li>• Search and apply to jobs</li>
                                <li>• AI-powered resume analysis</li>
                                <li>• Practice with mock interviews</li>
                                <li>• Get detailed feedback</li>
                            </ul>
                            <Link href="/register/candidate" className="block">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Join as Candidate
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Recruiter Registration */}
                    <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 hover:bg-white/20 transition-all duration-300 group">
                        <CardHeader className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                            <CardTitle className="text-2xl text-white">I&apos;m a Recruiter</CardTitle>
                            <CardDescription className="text-purple-100">
                                Streamline your hiring process with AI-powered candidate screening and intelligent interviews.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-2 text-purple-100 text-sm">
                                <li>• Post and manage job listings</li>
                                <li>• AI-powered candidate screening</li>
                                <li>• Automated interview scheduling</li>
                                <li>• Comprehensive candidate reports</li>
                            </ul>
                            <Link href="/register/recruiter" className="block">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                    Join as Recruiter
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center">
                    <p className="text-blue-100">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-300 hover:text-blue-200 underline">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
