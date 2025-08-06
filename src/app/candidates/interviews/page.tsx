"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Clock,
    Video,
    MapPin,
    User,
    Building2,
    Mail,
    FileText,
    CheckCircle,
    AlertTriangle,
    Plus,
    Edit,
    ExternalLink,
    Zap,
    MessageSquare
} from "lucide-react";

// Interviews data - this should come from API
const upcomingInterviews: any[] = [
    // No dummy data - will be loaded from API
];

const pastInterviews: any[] = [
    // No dummy data - will be loaded from API
];

const interviewTypes = [
    { value: "screening", label: "Initial Screening", color: "bg-blue-100 text-blue-800" },
    { value: "technical", label: "Technical Interview", color: "bg-purple-100 text-purple-800" },
    { value: "behavioral", label: "Behavioral Interview", color: "bg-green-100 text-green-800" },
    { value: "final", label: "Final Round", color: "bg-orange-100 text-orange-800" },
    { value: "portfolio", label: "Portfolio Review", color: "bg-pink-100 text-pink-800" }
];

const statusConfig = {
    confirmed: { color: "bg-green-100 text-green-800", label: "Confirmed" },
    tentative: { color: "bg-yellow-100 text-yellow-800", label: "Tentative" },
    cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" },
    completed: { color: "bg-gray-100 text-gray-800", label: "Completed" }
};

export default function InterviewsPage() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [showNotes, setShowNotes] = useState<{ [key: number]: boolean }>({});

    const toggleNotes = (interviewId: number) => {
        setShowNotes(prev => ({
            ...prev,
            [interviewId]: !prev[interviewId]
        }));
    };

    const getInterviewTypeColor = (type: string) => {
        const typeConfig = interviewTypes.find(t =>
            type.toLowerCase().includes(t.value)
        );
        return typeConfig?.color || "bg-gray-100 text-gray-800";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isUpcoming = (dateString: string) => {
        return new Date(dateString) > new Date();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Interviews & Meetings</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your interview schedule and preparation
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Interview Prep Guide
                    </Button>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Interview
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{upcomingInterviews.length}</p>
                            <p className="text-sm text-muted-foreground">Upcoming</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                                {upcomingInterviews.filter(i => i.status === "confirmed").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Confirmed</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{pastInterviews.length}</p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-600">
                                {pastInterviews.filter(i => i.result === "passed").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Success Rate</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tab Navigation */}
            <div className="border-b">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab("upcoming")}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "upcoming"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-muted-foreground hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        Upcoming Interviews ({upcomingInterviews.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("past")}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "past"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-muted-foreground hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        Past Interviews ({pastInterviews.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("prep")}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "prep"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-muted-foreground hover:text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        Interview Prep
                    </button>
                </nav>
            </div>

            {/* Upcoming Interviews */}
            {activeTab === "upcoming" && (
                <div className="space-y-4">
                    {upcomingInterviews.map((interview) => (
                        <Card key={interview.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold">{interview.jobTitle}</h3>
                                            <Badge variant="outline" className={getInterviewTypeColor(interview.type)}>
                                                {interview.type}
                                            </Badge>
                                            <Badge variant="outline" className={statusConfig[interview.status as keyof typeof statusConfig].color}>
                                                {statusConfig[interview.status as keyof typeof statusConfig].label}
                                            </Badge>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Building2 className="h-4 w-4" />
                                                    <span className="font-medium">{interview.company}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(interview.date)}
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    {interview.time} ({interview.duration})
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    {interview.meetingLink ? (
                                                        <Video className="h-4 w-4" />
                                                    ) : (
                                                        <MapPin className="h-4 w-4" />
                                                    )}
                                                    {interview.location}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <User className="h-4 w-4" />
                                                    <span>{interview.interviewer}</span>
                                                </div>
                                                <div className="text-sm text-muted-foreground ml-6">
                                                    {interview.interviewerTitle}
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Mail className="h-4 w-4" />
                                                    <a href={`mailto:${interview.interviewerEmail}`} className="text-blue-600 hover:underline text-sm">
                                                        {interview.interviewerEmail}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {interview.notes && (
                                            <div className="mb-4">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleNotes(interview.id)}
                                                    className="mb-2"
                                                >
                                                    <FileText className="h-4 w-4 mr-2" />
                                                    {showNotes[interview.id] ? "Hide" : "Show"} Notes
                                                </Button>
                                                {showNotes[interview.id] && (
                                                    <div className="bg-gray-50 border rounded-lg p-3">
                                                        <p className="text-sm">{interview.notes}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {isUpcoming(interview.date) && (
                                            <div className="flex items-center gap-2 text-sm">
                                                {interview.status === "confirmed" ? (
                                                    <div className="flex items-center gap-1 text-green-600">
                                                        <CheckCircle className="h-4 w-4" />
                                                        Interview confirmed
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-yellow-600">
                                                        <AlertTriangle className="h-4 w-4" />
                                                        Awaiting confirmation
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 ml-6">
                                        {interview.meetingLink && (
                                            <Button size="sm">
                                                <Video className="h-4 w-4 mr-2" />
                                                Join Meeting
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                            </Button>
                                        )}
                                        <Button size="sm" variant="outline">
                                            <Zap className="h-4 w-4 mr-2" />
                                            AI Prep
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                        <Button size="sm" variant="ghost">
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            Contact
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {upcomingInterviews.length === 0 && (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No upcoming interviews</h3>
                                <p className="text-muted-foreground">
                                    Your scheduled interviews will appear here
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* Past Interviews */}
            {activeTab === "past" && (
                <div className="space-y-4">
                    {pastInterviews.map((interview) => (
                        <Card key={interview.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold">{interview.jobTitle}</h3>
                                            <Badge variant="outline" className={getInterviewTypeColor(interview.type)}>
                                                {interview.type}
                                            </Badge>
                                            <Badge variant="outline" className={
                                                interview.result === "passed"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }>
                                                {interview.result === "passed" ? "Passed" : "Not Selected"}
                                            </Badge>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Building2 className="h-4 w-4" />
                                                    <span className="font-medium">{interview.company}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(interview.date)}
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Clock className="h-4 w-4" />
                                                    {interview.time} ({interview.duration})
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <User className="h-4 w-4" />
                                                    <span>{interview.interviewer}</span>
                                                </div>
                                                <div className="text-sm text-muted-foreground ml-6">
                                                    {interview.interviewerTitle}
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    ⭐ Rating: {interview.rating}/5
                                                </div>
                                            </div>
                                        </div>

                                        {interview.feedback && (
                                            <div className="bg-gray-50 border rounded-lg p-3">
                                                <p className="text-sm font-medium mb-1">Feedback:</p>
                                                <p className="text-sm text-muted-foreground">{interview.feedback}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 ml-6">
                                        <Button size="sm" variant="outline">
                                            View Details
                                        </Button>
                                        <Button size="sm" variant="ghost">
                                            Add Notes
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Interview Prep */}
            {activeTab === "prep" && (
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Interview Prep</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Get personalized interview preparation based on your upcoming interviews
                            </p>
                            <Button className="w-full">
                                <Zap className="h-4 w-4 mr-2" />
                                Start AI Prep Session
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Common Questions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-2">
                                <p className="text-sm">• Tell me about yourself</p>
                                <p className="text-sm">• Why are you interested in this role?</p>
                                <p className="text-sm">• What are your strengths and weaknesses?</p>
                                <p className="text-sm">• Describe a challenging project</p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-3">
                                View All Questions
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Technical Prep</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                Practice coding challenges and system design
                            </p>
                            <Button variant="outline" className="w-full">
                                <FileText className="h-4 w-4 mr-2" />
                                Coding Practice
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Interview Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-2">
                                <p className="text-sm">• Research the company thoroughly</p>
                                <p className="text-sm">• Prepare specific examples (STAR method)</p>
                                <p className="text-sm">• Test your tech setup for video calls</p>
                                <p className="text-sm">• Prepare thoughtful questions</p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-3">
                                More Tips
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
