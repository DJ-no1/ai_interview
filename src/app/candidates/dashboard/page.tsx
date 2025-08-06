"use client";

import { useAuth } from "@/contexts/SimpleAuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Search,
    FileText,
    Calendar,
    Users,
    Target,
    Award,
    Clock,
    MapPin,
    DollarSign,
    Star,
    ArrowRight,
    Eye,
    MessageSquare,
    Zap,
    Bell
} from "lucide-react";
import Link from "next/link";

// Mock data for demo
const dashboardStats = {
    applications: 12,
    interviews: 3,
    offers: 1,
    profileViews: 45
};

const recentApplications = [
    {
        id: 1,
        jobTitle: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        status: "interview",
        appliedDate: "2 days ago",
        salary: "$90k - $120k",
        location: "Remote"
    },
    {
        id: 2,
        jobTitle: "Full Stack Engineer",
        company: "StartupXYZ",
        status: "pending",
        appliedDate: "1 week ago",
        salary: "$80k - $100k",
        location: "San Francisco, CA"
    },
    {
        id: 3,
        jobTitle: "React Developer",
        company: "Digital Agency",
        status: "viewed",
        appliedDate: "2 weeks ago",
        salary: "$70k - $85k",
        location: "New York, NY"
    }
];

const upcomingInterviews = [
    {
        id: 1,
        jobTitle: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        date: "Tomorrow",
        time: "2:00 PM",
        type: "Technical Interview",
        interviewer: "Sarah Johnson"
    },
    {
        id: 2,
        jobTitle: "Product Manager",
        company: "InnovateCorp",
        date: "Friday",
        time: "10:00 AM",
        type: "Final Round",
        interviewer: "Mike Chen"
    }
];

const recommendedJobs = [
    {
        id: 1,
        title: "Senior React Developer",
        company: "Meta",
        location: "Remote",
        salary: "$140k - $180k",
        match: 95,
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "Frontend Lead",
        company: "Google",
        location: "Mountain View, CA",
        salary: "$150k - $200k",
        match: 88,
        posted: "1 week ago"
    }
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-300";
        case "interview":
            return "bg-blue-100 text-blue-800 border-blue-300";
        case "offer":
            return "bg-green-100 text-green-800 border-green-300";
        case "viewed":
            return "bg-purple-100 text-purple-800 border-purple-300";
        default:
            return "bg-gray-100 text-gray-800 border-gray-300";
    }
};

export default function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <Card className="bg-white/5 border-gray-800 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-xl text-white mb-4">Access Denied</h2>
                        <p className="text-gray-400 mb-4">Please log in to access the dashboard.</p>
                        <Link href="/login/candidate">
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                Go to Login
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {user?.name || 'Candidate'}!
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Here&apos;s your job search overview and recent activity
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                    </Button>
                    <Button size="sm">
                        <Zap className="h-4 w-4 mr-2" />
                        AI Job Match
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                        <FileText className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{dashboardStats.applications}</div>
                        <p className="text-xs text-muted-foreground">+2 from last week</p>
                        <Progress value={75} className="mt-2" />
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                        <Calendar className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{dashboardStats.interviews}</div>
                        <p className="text-xs text-muted-foreground">+1 scheduled</p>
                        <Progress value={60} className="mt-2" />
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Job Offers</CardTitle>
                        <Award className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">{dashboardStats.offers}</div>
                        <p className="text-xs text-muted-foreground">1 pending response</p>
                        <Progress value={100} className="mt-2" />
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                        <Eye className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{dashboardStats.profileViews}</div>
                        <p className="text-xs text-muted-foreground">+8 this week</p>
                        <Progress value={85} className="mt-2" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Applications */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Recent Applications
                                    </CardTitle>
                                    <CardDescription>
                                        Track your latest job applications and their status
                                    </CardDescription>
                                </div>
                                <Link href="/candidates/applications">
                                    <Button variant="outline" size="sm">
                                        View All
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentApplications.map((application) => (
                                    <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{application.jobTitle}</h4>
                                            <p className="text-sm text-muted-foreground">{application.company}</p>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {application.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <DollarSign className="h-3 w-3" />
                                                    {application.salary}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {application.appliedDate}
                                                </span>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={getStatusColor(application.status)}>
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions & Upcoming Interviews */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/candidates/jobs">
                                <Button className="w-full justify-start" variant="outline">
                                    <Search className="h-4 w-4 mr-2" />
                                    Browse Jobs
                                </Button>
                            </Link>
                            <Link href="/candidates/profile">
                                <Button className="w-full justify-start" variant="outline">
                                    <Users className="h-4 w-4 mr-2" />
                                    Update Profile
                                </Button>
                            </Link>
                            <Link href="/candidates/resume">
                                <Button className="w-full justify-start" variant="outline">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Upload Resume
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Upcoming Interviews */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Upcoming Interviews
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {upcomingInterviews.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingInterviews.map((interview) => (
                                        <div key={interview.id} className="p-3 border rounded-lg">
                                            <h4 className="font-medium text-sm">{interview.jobTitle}</h4>
                                            <p className="text-xs text-muted-foreground">{interview.company}</p>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-xs">
                                                    <strong>{interview.date}</strong> at {interview.time}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {interview.type} with {interview.interviewer}
                                                </p>
                                            </div>
                                            <Button size="sm" className="mt-2 w-full" variant="outline">
                                                <MessageSquare className="h-3 w-3 mr-2" />
                                                Join Interview
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No upcoming interviews
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* AI Recommendations */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-blue-600" />
                                AI-Powered Job Recommendations
                            </CardTitle>
                            <CardDescription>
                                Jobs perfectly matched to your skills and preferences
                            </CardDescription>
                        </div>
                        <Link href="/candidates/jobs">
                            <Button variant="outline" size="sm">
                                View More
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        {recommendedJobs.map((job) => (
                            <div key={job.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-semibold">{job.title}</h4>
                                        <p className="text-sm text-muted-foreground">{job.company}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        <span className="text-sm font-medium">{job.match}%</span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-muted-foreground mb-3">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="h-3 w-3" />
                                        {job.salary}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Posted {job.posted}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" className="flex-1">
                                        Apply Now
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Eye className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
