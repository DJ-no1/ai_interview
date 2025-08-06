"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Search,
    MapPin,
    DollarSign,
    Clock,
    Filter,
    Briefcase,
    Building2,
    Users,
    Zap,
    Eye,
    Heart,
    ChevronRight,
    Loader2
} from "lucide-react";
import { backendAPI, type Job } from "@/lib/backend-api";

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship"];
const experienceLevels = ["All", "Entry Level", "Mid Level", "Senior Level", "Executive"];
const salaryRanges = ["All", "$40k - $60k", "$60k - $80k", "$80k - $100k", "$100k+"];

export default function JobsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [selectedLevel, setSelectedLevel] = useState("All");
    const [selectedSalary, setSelectedSalary] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [savedJobs, setSavedJobs] = useState<string[]>([]);
    const [appliedJobs] = useState<string[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    // Load jobs from backend on component mount
    useEffect(() => {
        const loadJobs = async () => {
            try {
                setLoading(true);
                console.log('Loading jobs from backend...');
                const backendJobs = await backendAPI.getJobs();
                setJobs(backendJobs);
                console.log(`Loaded ${backendJobs.length} jobs from backend`);
            } catch (error) {
                console.warn('Failed to load jobs from backend:', error);
                // No fallback to mock data - use empty array
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    const toggleSaveJob = (jobId: string) => {
        setSavedJobs(prev =>
            prev.includes(jobId)
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
        );
    };

    const applyToJob = (jobId: string) => {
        // Navigate to application page with the job ID
        router.push(`/candidates/apply/${jobId}`);
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.skills.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === "All" || job.job_type.replace('_', '-') === selectedType.toLowerCase();
        return matchesSearch && matchesType;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Loading available positions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Find Your Dream Job</h1>
                    <p className="text-muted-foreground mt-2">
                        Discover opportunities that match your skills and aspirations
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>
                    <Button>
                        <Zap className="h-4 w-4 mr-2" />
                        AI Match
                    </Button>
                </div>
            </div>

            {/* Search and Stats */}
            <div className="grid gap-6 lg:grid-cols-4">
                <div className="lg:col-span-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search jobs, companies, or skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 text-base"
                        />
                    </div>
                </div>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{filteredJobs.length}</p>
                            <p className="text-sm text-muted-foreground">Jobs Found</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            {showFilters && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Filter Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Job Type</label>
                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jobTypes.map(type => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Experience Level</label>
                                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {experienceLevels.map(level => (
                                            <SelectItem key={level} value={level}>{level}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Salary Range</label>
                                <Select value={selectedSalary} onValueChange={setSelectedSalary}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {salaryRanges.map(range => (
                                            <SelectItem key={range} value={range}>{range}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Job Listings */}
            <div className="space-y-4">
                {filteredJobs.map((job) => {
                    // Parse skills from comma-separated string to array
                    const skillsArray = job.skills ? job.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

                    return (
                        <Card key={job.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold">{job.title}</h3>
                                            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                                                New Position
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-4 text-muted-foreground mb-3">
                                            <div className="flex items-center gap-1">
                                                <Building2 className="h-4 w-4" />
                                                <span className="font-medium">Company</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                Remote/Office
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4" />
                                                {job.salary || 'Competitive'}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Briefcase className="h-4 w-4" />
                                                {job.job_type?.replace('_', ' ')?.toUpperCase() || 'FULL-TIME'}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {new Date(job.created_at).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground mb-3">{job.description}</p>

                                        {skillsArray.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {skillsArray.slice(0, 8).map((skill, index) => (
                                                    <Badge key={index} variant="secondary">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {skillsArray.length > 8 && (
                                                    <Badge variant="secondary">
                                                        +{skillsArray.length - 8} more
                                                    </Badge>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                Multiple applicants
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-4 w-4" />
                                                Recently viewed
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                <Badge variant="outline" className="text-xs">
                                                    Health Insurance
                                                </Badge>
                                                <Badge variant="outline" className="text-xs">
                                                    Remote Work
                                                </Badge>
                                                <Badge variant="outline" className="text-xs">
                                                    401k
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 ml-6">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleSaveJob(job.id)}
                                            className={savedJobs.includes(job.id) ? "bg-red-50 border-red-200 text-red-600" : ""}
                                        >
                                            <Heart className={`h-4 w-4 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                                        </Button>

                                        {appliedJobs.includes(job.id) ? (
                                            <Button disabled size="sm" className="min-w-[100px]">
                                                Applied
                                            </Button>
                                        ) : (
                                            <Button onClick={() => applyToJob(job.id)} size="sm" className="min-w-[100px]">
                                                Apply Now
                                            </Button>
                                        )}

                                        <Button variant="outline" size="sm">
                                            View Details
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Load More */}
            <div className="text-center">
                <Button variant="outline" size="lg">
                    Load More Jobs
                </Button>
            </div>
        </div>
    );
}
