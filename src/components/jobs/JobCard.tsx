'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { DollarSign, Clock, Building, Users, Calendar } from 'lucide-react'
import { DatabaseJob } from '@/lib/supabase'

interface JobCardProps {
    job: DatabaseJob
    onApply?: (jobId: string) => void
    showApplyButton?: boolean
}

export function JobCard({ job, onApply, showApplyButton = true }: JobCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleApply = () => {
        onApply?.(job.id)
    }

    const formatSalary = (salary?: string) => {
        if (!salary) return 'Salary not specified'
        return salary.startsWith('$') ? salary : `$${salary}`
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'No deadline'
        return new Date(dateString).toLocaleDateString()
    }

    const getJobTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'full-time':
                return 'bg-green-600'
            case 'part-time':
                return 'bg-blue-600'
            case 'contract':
                return 'bg-purple-600'
            case 'internship':
                return 'bg-orange-600'
            default:
                return 'bg-gray-600'
        }
    }

    const skills = job.skills?.split(',').map(skill => skill.trim()).filter(Boolean) || []

    return (
        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors group">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                        <CardTitle className="text-white text-lg group-hover:text-blue-400 transition-colors">
                            {job.title}
                        </CardTitle>
                        <div className="flex items-center text-gray-400 text-sm">
                            <Building className="w-4 h-4 mr-1" />
                            <span>Company Name</span>
                        </div>
                    </div>
                    <Badge className={`${getJobTypeColor(job.job_type)} text-white`}>
                        {job.job_type?.replace('-', ' ') || 'Full Time'}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    {job.salary && (
                        <div className="flex items-center text-gray-300">
                            <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                            <span>{formatSalary(job.salary)}</span>
                        </div>
                    )}
                    {job.end_date && (
                        <div className="flex items-center text-gray-300">
                            <Calendar className="w-4 h-4 mr-2 text-red-400" />
                            <span>{formatDate(job.end_date)}</span>
                        </div>
                    )}
                </div>

                {/* Description Preview */}
                <CardDescription className="text-gray-400 line-clamp-2">
                    {job.description}
                </CardDescription>

                {/* Skills Preview */}
                {skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-gray-400 border-gray-600">
                                {skill}
                            </Badge>
                        ))}
                        {skills.length > 3 && (
                            <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                                +{skills.length - 3} more
                            </Badge>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                    <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800">
                                View Details
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-xl">{job.title}</DialogTitle>
                                <DialogDescription className="text-gray-400">
                                    Full job description and requirements
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                                {/* Job Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-300">
                                            <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                                            <span>{formatSalary(job.salary)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <Clock className="w-4 h-4 mr-2 text-blue-400" />
                                            <span>{job.job_type?.replace('-', ' ') || 'Full Time'}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-300">
                                            <Calendar className="w-4 h-4 mr-2 text-red-400" />
                                            <span>Apply by {formatDate(job.end_date)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <Users className="w-4 h-4 mr-2 text-purple-400" />
                                            <span>Posted {new Date(job.created_at || '').toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-gray-700" />

                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                                    <div className="text-gray-300 whitespace-pre-wrap">
                                        {job.description}
                                    </div>
                                </div>

                                {/* Skills */}
                                {skills.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill, index) => (
                                                <Badge key={index} className="bg-blue-600 text-white">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Apply Button */}
                                {showApplyButton && (
                                    <div className="flex justify-end pt-4">
                                        <Button
                                            onClick={handleApply}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                                        >
                                            Apply for this Position
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>

                    {showApplyButton && (
                        <Button
                            onClick={handleApply}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Apply Now
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
