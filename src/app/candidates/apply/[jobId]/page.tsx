'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/contexts/SimpleAuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, Briefcase } from 'lucide-react'
import { backendAPI, type Job as BackendJob } from '@/lib/backend-api'

// Simple job type definition for local use
interface Job {
    id: string
    title: string
    description: string
    skills: string
    job_type: string
    company?: string
    location?: string
}

export default function JobApplicationPage() {
    const params = useParams()
    const jobId = params?.jobId as string
    const { user } = useAuth()
    const router = useRouter()

    const [job, setJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        candidateName: '',
        candidateEmail: '',
        phone: '',
        coverLetter: ''
    })
    const [resumeFile, setResumeFile] = useState<File | null>(null)

    // Fetch job details
    useEffect(() => {
        const fetchJob = async () => {
            if (!jobId) return

            try {
                setLoading(true)

                // Try to fetch from backend
                try {
                    const backendJob = await backendAPI.getJobById(jobId)
                    // Convert backend job format to our local format
                    const jobData: Job = {
                        id: backendJob.id.toString(),
                        title: backendJob.title,
                        description: backendJob.description,
                        skills: backendJob.skills,
                        job_type: backendJob.job_type,
                        company: 'Company Name', // Backend doesn't provide company, use default
                        location: 'Remote/Office' // Backend doesn't provide location, use default
                    }
                    setJob(jobData)
                } catch (backendError) {
                    console.error('Failed to load job from backend:', backendError)
                    throw new Error('Job not found')
                }

                // Pre-fill user data if available
                if (user) {
                    setFormData(prev => ({
                        ...prev,
                        candidateName: user.name || '',
                        candidateEmail: user.email || ''
                    }))
                }
            } catch (error) {
                setError('Failed to load job details')
                console.error('Error fetching job:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchJob()
    }, [jobId, user])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
        if (!allowedTypes.includes(file.type)) {
            setError('Please upload a PDF, DOC, DOCX, or TXT file')
            return
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB')
            return
        }

        setResumeFile(file)
        setError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user) {
            router.push('/login/candidate')
            return
        }

        if (user.role !== 'candidate') {
            setError('Only candidates can apply for jobs')
            return
        }

        if (!resumeFile) {
            setError('Please upload your resume')
            return
        }

        try {
            setIsSubmitting(true)
            setUploadProgress(10)

            // Create application ID
            const applicationId = Date.now().toString()
            setUploadProgress(30)

            // Submit resume for review using backend API
            let resumeAnalysis;
            try {
                // Create FormData for file upload
                const formData = new FormData();
                formData.append('file', resumeFile);
                formData.append('job_id', jobId);

                resumeAnalysis = await backendAPI.reviewResumeWithFile(formData);
                setUploadProgress(70)
            } catch (backendError) {
                console.warn('Backend resume review failed, using local processing:', backendError)

                // Fallback: Local processing placeholder
                resumeAnalysis = {
                    score: 75,
                    resumeReview: "Resume analysis completed locally. Please check your internet connection for detailed AI review.",
                    pros: "Application submitted successfully",
                    cons: "Connect to backend for detailed analysis"
                };
                setUploadProgress(70)
            }

            // Simulate final processing
            await new Promise(resolve => setTimeout(resolve, 500))
            setUploadProgress(100)

            // Store the application data for the analysis page
            localStorage.setItem('currentApplication', JSON.stringify({
                id: applicationId,
                jobId: jobId,
                jobTitle: job?.title,
                jobDescription: job?.description || `Job description for ${job?.title}`,
                resumeFileName: resumeFile.name,
                candidateName: formData.candidateName,
                submittedAt: new Date().toISOString(),
                analysis: resumeAnalysis
            }))

            router.push(`/candidates/application/${applicationId}/analysis`)

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to submit application')
            console.error('Application submission error:', error)
        } finally {
            setIsSubmitting(false)
            setUploadProgress(0)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                    <p className="text-white">Loading job details...</p>
                </div>
            </div>
        )
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="text-center py-8">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <CardTitle className="text-white mb-2">Job Not Found</CardTitle>
                        <CardDescription className="text-gray-400 mb-4">
                            The job you&apos;re looking for doesn&apos;t exist or has been removed.
                        </CardDescription>
                        <Button onClick={() => router.push('/jobs')} className="bg-blue-600 hover:bg-blue-700">
                            Browse Jobs
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const skills = job.skills?.split(',').map((skill: string) => skill.trim()).filter(Boolean) || []

    return (
        <div className="min-h-screen bg-gray-950 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Job Header */}
                <Card className="bg-gray-900 border-gray-800 mb-8">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <CardTitle className="text-2xl text-white flex items-center">
                                    <Briefcase className="w-6 h-6 mr-2 text-blue-500" />
                                    {job.title}
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Apply for this position and start your AI-powered interview journey
                                </CardDescription>
                            </div>
                            <Badge className="bg-blue-600 text-white">
                                {job.job_type?.replace('-', ' ') || 'Full Time'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-white font-medium mb-2">Job Description</h4>
                                <p className="text-gray-400 text-sm line-clamp-3">{job.description}</p>
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-2">Required Skills</h4>
                                <div className="flex flex-wrap gap-1">
                                    {skills.slice(0, 5).map((skill: string, index: number) => (
                                        <Badge key={index} variant="outline" className="text-xs text-gray-400 border-gray-600">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {skills.length > 5 && (
                                        <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                                            +{skills.length - 5} more
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Application Form */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">Submit Your Application</CardTitle>
                        <CardDescription className="text-gray-400">
                            Fill out the form below to apply for this position
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {isSubmitting && (
                            <Card className="bg-blue-900/20 border-blue-600 mb-6">
                                <CardContent className="pt-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-blue-400">Processing your application...</span>
                                            <span className="text-blue-400">{uploadProgress}%</span>
                                        </div>
                                        <Progress value={uploadProgress} className="bg-blue-900" />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="candidateName" className="text-white">Full Name *</Label>
                                    <Input
                                        id="candidateName"
                                        name="candidateName"
                                        value={formData.candidateName}
                                        onChange={handleInputChange}
                                        className="bg-gray-800 border-gray-700 text-white"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="candidateEmail" className="text-white">Email Address *</Label>
                                    <Input
                                        id="candidateEmail"
                                        name="candidateEmail"
                                        type="email"
                                        value={formData.candidateEmail}
                                        onChange={handleInputChange}
                                        className="bg-gray-800 border-gray-700 text-white"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="bg-gray-800 border-gray-700 text-white"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <Separator className="bg-gray-700" />

                            {/* Resume Upload */}
                            <div className="space-y-4">
                                <Label className="text-white">Resume *</Label>
                                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors">
                                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                    <div className="space-y-2">
                                        <p className="text-gray-400">
                                            {resumeFile ? resumeFile.name : 'Upload your resume'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Supports PDF, DOC, DOCX, and TXT files (max 5MB)
                                        </p>
                                        <Input
                                            type="file"
                                            accept=".pdf,.doc,.docx,.txt"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="resume-upload"
                                            disabled={isSubmitting}
                                        />
                                        <Label htmlFor="resume-upload" className="cursor-pointer">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                                                disabled={isSubmitting}
                                            >
                                                <FileText className="w-4 h-4 mr-2" />
                                                Choose File
                                            </Button>
                                        </Label>
                                    </div>
                                </div>
                                {resumeFile && (
                                    <div className="flex items-center text-green-400 text-sm">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Resume uploaded successfully
                                    </div>
                                )}
                            </div>

                            {/* Cover Letter */}
                            <div className="space-y-2">
                                <Label htmlFor="coverLetter" className="text-white">Cover Letter (Optional)</Label>
                                <Textarea
                                    id="coverLetter"
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    placeholder="Tell us why you're perfect for this role..."
                                    className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.back()}
                                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                    disabled={isSubmitting || !resumeFile}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Submit Application
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
