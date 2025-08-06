'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/SimpleAuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { ResumeAnalysisResults } from '@/components/resume/resume-analysis-results';
import { Loader2, AlertCircle, FileText, RotateCcw, CheckCircle } from 'lucide-react';

interface Application {
    id: string;
    jobId: string;
    jobTitle: string;
    resumeFileName: string;
    candidateName: string;
    submittedAt: string;
}

interface AnalysisResult {
    overall_score: number;
    passed_hard_filters: boolean;
    dimension_breakdown: {
        skill_match: { score: number; weight: number; evidence: string[] };
        experience_fit: { score: number; weight: number; evidence: string[] };
        impact_outcomes: { score: number; weight: number; evidence: string[] };
        role_alignment: { score: number; weight: number; evidence: string[] };
        project_tech_depth: { score: number; weight: number; evidence: string[] };
        career_trajectory: { score: number; weight: number; evidence: string[] };
        communication_clarity: { score: number; weight: number; evidence: string[] };
        certs_education: { score: number; weight: number; evidence: string[] };
        extras: { score: number; weight: number; evidence: string[] };
    };
    hard_filter_failures: string[];
    risk_flags: string[];
    confidence: number;
}

// Mock analysis result
const generateMockAnalysis = (jobTitle: string): AnalysisResult => ({
    overall_score: 85,
    passed_hard_filters: true,
    confidence: 0.92,
    hard_filter_failures: [],
    risk_flags: [],
    dimension_breakdown: {
        skill_match: {
            score: 88,
            weight: 25,
            evidence: [
                "Strong experience with React and TypeScript",
                "Proficient in modern JavaScript frameworks",
                "Experience with Next.js and state management"
            ]
        },
        experience_fit: {
            score: 82,
            weight: 20,
            evidence: [
                "5+ years of frontend development experience",
                "Led multiple projects from conception to deployment",
                "Experience working in agile environments"
            ]
        },
        impact_outcomes: {
            score: 90,
            weight: 15,
            evidence: [
                "Improved application performance by 40%",
                "Reduced user acquisition cost by 25%",
                "Built scalable components used across multiple products"
            ]
        },
        role_alignment: {
            score: 85,
            weight: 15,
            evidence: [
                "Strong alignment with senior-level responsibilities",
                "Experience mentoring junior developers",
                "Technical leadership in cross-functional teams"
            ]
        },
        project_tech_depth: {
            score: 87,
            weight: 10,
            evidence: [
                "Built complex single-page applications",
                "Integration with RESTful APIs and GraphQL",
                "Experience with testing frameworks and CI/CD"
            ]
        },
        career_trajectory: {
            score: 80,
            weight: 5,
            evidence: [
                "Consistent progression from junior to senior roles",
                "Continuous learning and skill development",
                "Strong track record of project delivery"
            ]
        },
        communication_clarity: {
            score: 85,
            weight: 5,
            evidence: [
                "Clear and well-structured resume",
                "Detailed project descriptions",
                "Professional presentation of achievements"
            ]
        },
        certs_education: {
            score: 75,
            weight: 3,
            evidence: [
                "Computer Science degree",
                "Relevant online certifications",
                "Continuous professional development"
            ]
        },
        extras: {
            score: 85,
            weight: 2,
            evidence: [
                "Open source contributions",
                "Technical blog writing",
                "Conference speaking experience"
            ]
        }
    }
});

export default function ApplicationAnalysisPage() {
    const params = useParams();
    const applicationId = params?.applicationId as string;
    const router = useRouter();
    const { user } = useAuth();

    const [application, setApplication] = useState<Application | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadApplication = async () => {
            try {
                setLoading(true);

                // Get application data from localStorage
                const appData = localStorage.getItem('currentApplication');
                if (!appData) {
                    throw new Error('Application not found');
                }

                const app: Application = JSON.parse(appData);
                setApplication(app);

                // Simulate processing time
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Generate mock analysis
                const mockAnalysis = generateMockAnalysis(app.jobTitle);
                setAnalysis(mockAnalysis);

            } catch (error) {
                setError('Failed to load application analysis');
                console.error('Error loading application:', error);
            } finally {
                setLoading(false);
            }
        };

        if (applicationId) {
            loadApplication();
        }
    }, [applicationId]);

    const handleReturnToDashboard = () => {
        router.push('/candidates/dashboard');
    };

    const handleStartInterview = () => {
        const sessionId = Date.now().toString();
        router.push(`/candidates/interview/${sessionId}?applicationId=${applicationId}&jobId=${application?.jobId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                    <p className="text-white">Analyzing your resume...</p>
                    <p className="text-gray-400 text-sm">This may take a few moments</p>
                </div>
            </div>
        );
    }

    if (error || !application || !analysis) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <Card className="bg-gray-900 border-gray-800 max-w-md">
                    <CardContent className="text-center py-8">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <CardTitle className="text-white mb-2">Analysis Failed</CardTitle>
                        <CardDescription className="text-gray-400 mb-4">
                            {error || 'Unable to load application analysis'}
                        </CardDescription>
                        <Button
                            onClick={handleReturnToDashboard}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Return to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <Card className="bg-gray-900 border-gray-800 mb-8">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <CardTitle className="text-2xl text-white flex items-center">
                                    <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                                    Application Submitted Successfully
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    AI-powered analysis of your application for: <span className="text-white font-medium">{application.jobTitle}</span>
                                </CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-white mb-1">
                                    {analysis.overall_score}%
                                </div>
                                <div className="text-sm text-gray-400">
                                    Overall Score
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <div className="text-white font-medium">Resume Analyzed</div>
                                <div className="text-gray-400 text-sm">{application.resumeFileName}</div>
                            </div>
                            <div className="text-center">
                                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <div className="text-white font-medium">Hard Filters</div>
                                <div className="text-gray-400 text-sm">
                                    {analysis.passed_hard_filters ? 'Passed' : 'Failed'}
                                </div>
                            </div>
                            <div className="text-center">
                                <RotateCcw className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <div className="text-white font-medium">Confidence</div>
                                <div className="text-gray-400 text-sm">
                                    {Math.round(analysis.confidence * 100)}%
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Analysis Results */}
                <ResumeAnalysisResults
                    reviewResponse={{
                        jd: `Job Description for ${application.jobTitle}`,
                        resume: application.resumeFileName,
                        analysis: analysis
                    }}
                    position={application.jobTitle}
                    candidateName={user?.name || 'You'}
                />

                {/* Next Steps */}
                <Card className="bg-gray-900 border-gray-800 mt-8">
                    <CardHeader>
                        <CardTitle className="text-white">Next Steps</CardTitle>
                        <CardDescription className="text-gray-400">
                            Ready to take the next step in your application process?
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button
                                onClick={handleStartInterview}
                                className="bg-blue-600 hover:bg-blue-700 text-white h-12"
                            >
                                Start AI Interview
                            </Button>
                            <Button
                                onClick={handleReturnToDashboard}
                                variant="outline"
                                className="border-gray-700 text-gray-300 hover:bg-gray-800 h-12"
                            >
                                Return to Dashboard
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
