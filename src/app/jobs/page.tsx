'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/SimpleAuthContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { JobCard } from '@/components/jobs/JobCard'
import { Search, Filter, Briefcase, AlertCircle } from 'lucide-react'

// Simple job type definition
interface Job {
    id: string
    title: string
    description: string
    skills: string
    job_type: string
    company: string
    location: string
    salary_range?: string
    created_at: string
    recruiter_id: string
    requirements?: string
    benefits?: string
}

// Jobs data - this should come from API
const mockJobs: Job[] = [
    // No dummy data - will be loaded from API
]

export default function JobListingPage() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [jobTypeFilter, setJobTypeFilter] = useState('all')
    const [sortBy, setSortBy] = useState('created_at')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

    const { user } = useAuth()
    const router = useRouter()

    // Fetch jobs from mock data
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))
                setJobs(mockJobs)
                setFilteredJobs(mockJobs)
            } catch (error) {
                setError('Failed to fetch jobs. Please try again.')
                console.error('Error fetching jobs:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [sortBy, sortOrder])

    // Filter and search jobs
    useEffect(() => {
        let filtered = [...jobs]

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.skills?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Job type filter
        if (jobTypeFilter !== 'all') {
            filtered = filtered.filter(job => job.job_type === jobTypeFilter)
        }

        setFilteredJobs(filtered)
    }, [jobs, searchTerm, jobTypeFilter])

    const handleApply = (jobId: string) => {
        if (!user) {
            router.push('/login/candidate')
            return
        }

        if (user?.role !== 'candidate') {
            setError('Only candidates can apply for jobs')
            return
        }

        // Navigate to application page
        router.push(`/candidates/apply/${jobId}`)
    }

    const jobTypes = [
        { value: 'all', label: 'All Types' },
        { value: 'full-time', label: 'Full Time' },
        { value: 'part-time', label: 'Part Time' },
        { value: 'contract', label: 'Contract' },
        { value: 'internship', label: 'Internship' }
    ]

    const sortOptions = [
        { value: 'created_at', label: 'Date Posted' },
        { value: 'title', label: 'Job Title' },
        { value: 'salary', label: 'Salary' }
    ]

    return (
        <div className="min-h-screen bg-gray-950 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">Find Your Dream Job</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Discover amazing career opportunities and apply with AI-powered interviews
                    </p>
                </div>

                {/* Filters */}
                <Card className="bg-gray-900 border-gray-800 mb-8">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center">
                            <Filter className="w-5 h-5 mr-2" />
                            Filter & Search Jobs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="relative md:col-span-2">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search jobs, skills, or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                                />
                            </div>

                            {/* Job Type Filter */}
                            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                    <SelectValue placeholder="Job Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    {jobTypes.map(type => (
                                        <SelectItem key={type.value} value={type.value} className="text-white">
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Sort */}
                            <div className="flex gap-2">
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-700">
                                        {sortOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value} className="text-white">
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant="outline"
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                                >
                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-gray-400">
                        <Briefcase className="w-5 h-5 mr-2" />
                        <span>
                            {loading ? 'Loading...' : `${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''} found`}
                        </span>
                    </div>
                    {searchTerm && (
                        <Button
                            variant="ghost"
                            onClick={() => setSearchTerm('')}
                            className="text-gray-400 hover:text-white"
                        >
                            Clear search
                        </Button>
                    )}
                </div>

                {/* Job Listings */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <Card key={index} className="bg-gray-900 border-gray-800">
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4 bg-gray-700" />
                                    <Skeleton className="h-4 w-1/2 bg-gray-700" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                                    <Skeleton className="h-4 w-2/3 bg-gray-700 mb-4" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-20 bg-gray-700" />
                                        <Skeleton className="h-8 w-20 bg-gray-700" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="text-center py-12">
                            <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <CardTitle className="text-white mb-2">No jobs found</CardTitle>
                            <CardDescription className="text-gray-400">
                                {searchTerm || jobTypeFilter !== 'all'
                                    ? 'Try adjusting your search criteria or filters'
                                    : 'No jobs are currently available. Check back later!'
                                }
                            </CardDescription>
                            {(searchTerm || jobTypeFilter !== 'all') && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchTerm('')
                                        setJobTypeFilter('all')
                                    }}
                                    className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800"
                                >
                                    Clear all filters
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onApply={handleApply}
                                showApplyButton={user?.role === 'candidate'}
                            />
                        ))}
                    </div>
                )}

                {/* Load More Button (for pagination) */}
                {filteredJobs.length > 0 && filteredJobs.length % 10 === 0 && (
                    <div className="text-center mt-8">
                        <Button
                            variant="outline"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                            Load More Jobs
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
