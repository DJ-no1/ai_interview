"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Brain,
    Target,
    Award,
    Users,
    Code,
    Briefcase,
    MessageSquare,
    GraduationCap,
    Star,
    RotateCcw
} from "lucide-react"

interface DimensionScore {
    score: number;
    weight: number;
    evidence: string[];
}

interface AnalysisResult {
    overall_score: number;
    passed_hard_filters: boolean;
    dimension_breakdown: {
        skill_match: DimensionScore;
        experience_fit: DimensionScore;
        impact_outcomes: DimensionScore;
        role_alignment: DimensionScore;
        project_tech_depth: DimensionScore;
        career_trajectory: DimensionScore;
        communication_clarity: DimensionScore;
        certs_education: DimensionScore;
        extras: DimensionScore;
    };
    hard_filter_failures: string[];
    risk_flags: string[];
    confidence: number;
}

interface ReviewResponse {
    jd: string;
    resume: string;
    analysis: AnalysisResult;
}

interface ResumeAnalysisResultsProps {
    reviewResponse: ReviewResponse;
    candidateName?: string;
    position?: string;
    onStartInterview?: () => void;
    isLoading?: boolean;
}

const DIMENSION_CONFIG = {
    skill_match: {
        label: "Skills Match",
        icon: Code,
        description: "Alignment of technical skills with job requirements"
    },
    experience_fit: {
        label: "Experience Fit",
        icon: Briefcase,
        description: "Relevance and seniority of experience"
    },
    impact_outcomes: {
        label: "Impact & Outcomes",
        icon: TrendingUp,
        description: "Demonstrated business impact and achievements"
    },
    role_alignment: {
        label: "Role Alignment",
        icon: Target,
        description: "Suitability for specific role responsibilities"
    },
    project_tech_depth: {
        label: "Technical Depth",
        icon: Brain,
        description: "Technical complexity and depth of projects"
    },
    career_trajectory: {
        label: "Career Growth",
        icon: Award,
        description: "Professional growth and development pattern"
    },
    communication_clarity: {
        label: "Communication",
        icon: MessageSquare,
        description: "Quality of resume presentation and clarity"
    },
    certs_education: {
        label: "Education & Certs",
        icon: GraduationCap,
        description: "Educational background and certifications"
    },
    extras: {
        label: "Additional Value",
        icon: Star,
        description: "Extra qualifications, contributions, and value adds"
    }
};

export function ResumeAnalysisResults({
    reviewResponse,
    candidateName = "Candidate",
    position = "Position",
    onStartInterview,
    isLoading = false
}: ResumeAnalysisResultsProps) {
    const { analysis } = reviewResponse;

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600 bg-green-100";
        if (score >= 60) return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
    };

    const getScoreIcon = (score: number) => {
        if (score >= 80) return CheckCircle;
        if (score >= 60) return AlertTriangle;
        return XCircle;
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded mb-4"></div>
                    <div className="grid gap-6">
                        <div className="h-48 bg-gray-300 rounded"></div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="h-32 bg-gray-300 rounded"></div>
                            <div className="h-32 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Resume Analysis Results
                </h1>
                <p className="text-gray-600">
                    AI-powered analysis for {candidateName} applying to {position}
                </p>
            </div>

            {/* Overall Score Card */}
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreColor(analysis.overall_score)}`}>
                            {React.createElement(getScoreIcon(analysis.overall_score), {
                                className: "w-6 h-6"
                            })}
                        </div>
                        Overall Match Score
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                        {analysis.overall_score}%
                    </div>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Badge variant={analysis.passed_hard_filters ? "default" : "destructive"}>
                            {analysis.passed_hard_filters ? "Passed Hard Filters" : "Failed Hard Filters"}
                        </Badge>
                        <Badge variant="outline">
                            Confidence: {analysis.confidence}%
                        </Badge>
                    </div>
                    <Progress value={analysis.overall_score} className="w-full max-w-md mx-auto" />
                </CardContent>
            </Card>

            {/* Dimension Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        Detailed Analysis Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(analysis.dimension_breakdown).map(([key, dimension]) => {
                            const config = DIMENSION_CONFIG[key as keyof typeof DIMENSION_CONFIG];
                            const IconComponent = config.icon;

                            return (
                                <div key={key} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getScoreColor(dimension.score)}`}>
                                            <IconComponent className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                {config.label}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                Weight: {dimension.weight}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Score</span>
                                            <span className="font-medium">{dimension.score}%</span>
                                        </div>
                                        <Progress value={dimension.score} className="h-2" />
                                    </div>

                                    <p className="text-xs text-gray-600 mb-2">
                                        {config.description}
                                    </p>

                                    {dimension.evidence.length > 0 && (
                                        <div className="space-y-1">
                                            <h4 className="text-xs font-medium text-gray-700">Evidence:</h4>
                                            {dimension.evidence.slice(0, 2).map((evidence, idx) => (
                                                <p key={idx} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                                                    {evidence}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Risk Flags & Hard Filter Failures */}
            {(analysis.risk_flags.length > 0 || analysis.hard_filter_failures.length > 0) && (
                <div className="grid md:grid-cols-2 gap-6">
                    {analysis.hard_filter_failures.length > 0 && (
                        <Card className="border-red-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-700">
                                    <XCircle className="w-5 h-5" />
                                    Hard Filter Failures
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {analysis.hard_filter_failures.map((failure, idx) => (
                                        <div key={idx} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-red-700">{failure}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {analysis.risk_flags.length > 0 && (
                        <Card className="border-yellow-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-yellow-700">
                                    <AlertTriangle className="w-5 h-5" />
                                    Risk Flags
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {analysis.risk_flags.map((risk, idx) => (
                                        <div key={idx} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                                            <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-yellow-700">{risk}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-6">
                <Button variant="outline" size="lg">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Re-analyze Resume
                </Button>

                {onStartInterview && analysis.passed_hard_filters && (
                    <Button
                        size="lg"
                        onClick={onStartInterview}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        <Users className="w-4 h-4 mr-2" />
                        Start AI Interview
                    </Button>
                )}
            </div>
        </div>
    );
}
