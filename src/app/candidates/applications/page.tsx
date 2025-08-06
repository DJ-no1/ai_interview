"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Search,
    Filter,
    Calendar,
    MapPin,
    DollarSign,
    Clock,
    Eye,
    MessageSquare,
    FileText,
    Building2,
    AlertCircle,
    CheckCircle,
    XCircle,
    MoreHorizontal
} from "lucide-react";

// Mock applications data
const mockApplications = [
    {
        id: 1,
        jobTitle: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        location: "Remote",
        salary: "$90k - $120k",
        appliedDate: "2024-01-15",
        status: "interview",
        stage: "Technical Interview",
        progress: 75,
        nextStep: "Final Round Interview",
        nextStepDate: "2024-01-25",
        recruiterNote: "Great technical skills, moving to final round",
        applicationUrl: "#"
    },
    {
        id: 2,
        jobTitle: "Full Stack Engineer",
        company: "StartupXYZ",
        location: "San Francisco, CA",
        salary: "$80k - $100k",
        appliedDate: "2024-01-10",
        status: "pending",
        stage: "Application Review",
        progress: 25,
        nextStep: "Waiting for review",
        nextStepDate: null,
        recruiterNote: null,
        applicationUrl: "#"
    },
    {
        id: 3,
        jobTitle: "React Developer",
        company: "Digital Agency",
        location: "New York, NY",
        salary: "$70k - $85k",
        appliedDate: "2024-01-08",
        status: "rejected",
        stage: "Application Rejected",
        progress: 100,
        nextStep: "N/A",
        nextStepDate: null,
        recruiterNote: "Looking for more senior experience",
        applicationUrl: "#"
    },
    {
        id: 4,
        jobTitle: "Frontend Lead",
        company: "InnovateCorp",
        location: "Austin, TX",
        salary: "$95k - $130k",
        appliedDate: "2024-01-12",
        status: "offer",
        stage: "Offer Extended",
        progress: 100,
        nextStep: "Decision Required",
        nextStepDate: "2024-01-30",
        recruiterNote: "Excellent fit for the team!",
        applicationUrl: "#"
    },
    {
        id: 5,
        jobTitle: "UI Developer",
        company: "CreativeStudio",
        location: "Remote",
        salary: "$65k - $80k",
        appliedDate: "2024-01-20",
        status: "viewed",
        stage: "Application Viewed",
        progress: 10,
        nextStep: "Waiting for response",
        nextStepDate: null,
        recruiterNote: null,
        applicationUrl: "#"
    }
];

const statusConfig = {
    pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        icon: Clock,
        label: "Pending"
    },
    viewed: {
        color: "bg-blue-100 text-blue-800 border-blue-300", 
        icon: Eye,
        label: "Viewed"
    },
    interview: {
        color: "bg-purple-100 text-purple-800 border-purple-300",
        icon: MessageSquare,
        label: "Interview"
    },
    offer: {
        color: "bg-green-100 text-green-800 border-green-300",
        icon: CheckCircle,
        label: "Offer"
    },
    rejected: {
        color: "bg-red-100 text-red-800 border-red-300",
        icon: XCircle,
        label: "Rejected"
    }
};

export default function ApplicationsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [applications] = useState(mockApplications);

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            app.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStats = () => {
        const stats = {
            total: applications.length,
            pending: applications.filter(app => app.status === "pending").length,
            interview: applications.filter(app => app.status === "interview").length,
            offer: applications.filter(app => app.status === "offer").length,
            rejected: applications.filter(app => app.status === "rejected").length
        };
        return stats;
    };

    const stats = getStatusStats();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getProgressColor = (status: string) => {
        switch (status) {
            case "offer":
                return "bg-green-500";
            case "interview":
                return "bg-purple-500";
            case "viewed":
                return "bg-blue-500";
            case "rejected":
                return "bg-red-500";
            default:
                return "bg-yellow-500";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
                    <p className="text-muted-foreground mt-2">
                        Track and manage your job applications
                    </p>
                </div>
                <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Export Applications
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                            <p className="text-sm text-muted-foreground">Total Applications</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                            <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{stats.interview}</p>
                            <p className="text-sm text-muted-foreground">Interviews</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{stats.offer}</p>
                            <p className="text-sm text-muted-foreground">Offers</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                            <p className="text-sm text-muted-foreground">Rejected</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="viewed">Viewed</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                </Button>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {filteredApplications.map((application) => {
                    const StatusIcon = statusConfig[application.status as keyof typeof statusConfig].icon;
                    
                    return (
                        <Card key={application.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold">{application.jobTitle}</h3>
                                            <Badge 
                                                variant="outline" 
                                                className={statusConfig[application.status as keyof typeof statusConfig].color}
                                            >
                                                <StatusIcon className="h-3 w-3 mr-1" />
                                                {statusConfig[application.status as keyof typeof statusConfig].label}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-4 text-muted-foreground mb-3">
                                            <div className="flex items-center gap-1">
                                                <Building2 className="h-4 w-4" />
                                                <span className="font-medium">{application.company}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {application.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4" />
                                                {application.salary}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                Applied {formatDate(application.appliedDate)}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm font-medium mb-1">Current Stage</p>
                                                <p className="text-sm text-muted-foreground">{application.stage}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium mb-1">Next Step</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {application.nextStep}
                                                    {application.nextStepDate && (
                                                        <span className="text-blue-600 ml-1">
                                                            by {formatDate(application.nextStepDate)}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">Application Progress</span>
                                                <span className="text-sm text-muted-foreground">{application.progress}%</span>
                                            </div>
                                            <Progress 
                                                value={application.progress} 
                                                className={`h-2 ${getProgressColor(application.status)}`}
                                            />
                                        </div>

                                        {application.recruiterNote && (
                                            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                                                <div className="flex items-start">
                                                    <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 mr-2" />
                                                    <div>
                                                        <p className="text-sm font-medium text-blue-800">Recruiter Note</p>
                                                        <p className="text-sm text-blue-700">{application.recruiterNote}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 ml-6">
                                        <Button size="sm">
                                            View Details
                                        </Button>
                                        {application.status === "interview" && (
                                            <Button size="sm" variant="outline">
                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                Interview Prep
                                            </Button>
                                        )}
                                        {application.status === "offer" && (
                                            <Button size="sm" variant="outline" className="bg-green-50 border-green-200 text-green-800">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Review Offer
                                            </Button>
                                        )}
                                        <Button size="sm" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {filteredApplications.length === 0 && (
                <Card>
                    <CardContent className="p-12 text-center">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No applications found</h3>
                        <p className="text-muted-foreground">
                            {searchTerm || statusFilter !== "all" 
                                ? "Try adjusting your search or filters"
                                : "Start applying to jobs to see your applications here"
                            }
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
