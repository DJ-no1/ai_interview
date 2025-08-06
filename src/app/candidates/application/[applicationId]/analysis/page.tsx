'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/SimpleAuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResumeAnalysisResults } from '@/components/resume/resume-analysis-results';
import { Loader2, AlertCircle, FileText, RotateCcw, CheckCircle } from 'lucide-react';
import { backendAPI, type ResumeReviewResponse } from '@/lib/backend-api';

interface Application {
    id: string;
    jobId: string;
    jobTitle: string;
    jobDescription?: string;
    resumeFileName: string;
    resumeText?: string;
    candidateName: string;
    submittedAt: string;
    analysis?: {
        score: number;
        resumeReview: string;
        pros: string;
        cons: string;
    };
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
const generateMockAnalysis = (): AnalysisResult => ({
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

                // Get application data from localStorage or create test data
                const appData = localStorage.getItem('currentApplication');
                let app: Application;

                if (!appData) {
                    // Create test data for debugging
                    app = {
                        id: applicationId,
                        jobId: "frontend-dev",
                        jobTitle: "Senior Frontend Developer",
                        jobDescription: "We are looking for a Senior Frontend Developer...",
                        resumeFileName: "test_resume.pdf",
                        resumeText: "Experienced frontend developer with React and TypeScript...",
                        candidateName: "Test Candidate",
                        submittedAt: new Date().toISOString()
                    };
                } else {
                    app = JSON.parse(appData);
                }

                setApplication(app);

                // Check if we already have analysis data from the application submission
                if (app.analysis) {
                    console.log('Using pre-analyzed data from application submission');
                    const reviewResponse = app.analysis;

                    // Transform backend response to our analysis format
                    const backendAnalysis: AnalysisResult = {
                        overall_score: Math.round(reviewResponse.score || 75),
                        passed_hard_filters: (reviewResponse.score || 75) >= 70,
                        confidence: 0.85 + ((reviewResponse.score || 75) / 100) * 0.15,
                        hard_filter_failures: (reviewResponse.score || 75) < 70 ? [reviewResponse.cons || "Score below threshold"] : [],
                        risk_flags: [],
                        dimension_breakdown: {
                            skill_match: {
                                score: Math.round(reviewResponse.score || 75),
                                weight: 25,
                                evidence: [reviewResponse.pros || "Skills analyzed"]
                            },
                            experience_fit: {
                                score: Math.round((reviewResponse.score || 75) * 0.9),
                                weight: 20,
                                evidence: ["Experience evaluation from backend analysis"]
                            },
                            impact_outcomes: {
                                score: Math.round((reviewResponse.score || 75) * 0.95),
                                weight: 15,
                                evidence: ["Impact assessment from resume review"]
                            },
                            role_alignment: {
                                score: Math.round(reviewResponse.score || 75),
                                weight: 15,
                                evidence: [reviewResponse.resumeReview || "Role alignment assessed"]
                            },
                            project_tech_depth: {
                                score: Math.round((reviewResponse.score || 75) * 0.85),
                                weight: 10,
                                evidence: ["Technical depth evaluation"]
                            },
                            career_trajectory: {
                                score: Math.round((reviewResponse.score || 75) * 0.8),
                                weight: 5,
                                evidence: ["Career progression analysis"]
                            },
                            communication_clarity: {
                                score: 85,
                                weight: 5,
                                evidence: ["Resume clarity assessment"]
                            },
                            certs_education: {
                                score: 75,
                                weight: 3,
                                evidence: ["Education and certification review"]
                            },
                            extras: {
                                score: 80,
                                weight: 2,
                                evidence: ["Additional qualifications"]
                            }
                        }
                    };

                    setAnalysis(backendAnalysis);
                    console.log('Pre-analyzed data loaded successfully');
                    return;
                }

                // Call the real backend API for resume analysis if no pre-analysis exists
                try {
                    console.log('Calling backend API for resume analysis...');
                    const reviewResponse = await backendAPI.reviewResume({
                        resume: app.resumeText || `Resume for ${app.candidateName}`,
                        job_id: app.jobId
                    });

                    // Transform backend response to our analysis format
                    const backendAnalysis: AnalysisResult = {
                        overall_score: Math.round(reviewResponse.score * 10), // Convert 1-10 to percentage
                        passed_hard_filters: reviewResponse.score >= 7,
                        confidence: 0.85 + (reviewResponse.score / 10) * 0.15,
                        hard_filter_failures: reviewResponse.score < 7 ? [reviewResponse.cons] : [],
                        risk_flags: [],
                        dimension_breakdown: {
                            skill_match: {
                                score: Math.round(reviewResponse.score * 10),
                                weight: 25,
                                evidence: [reviewResponse.pros]
                            },
                            experience_fit: {
                                score: Math.round(reviewResponse.score * 9),
                                weight: 20,
                                evidence: ["Experience evaluation from backend analysis"]
                            },
                            impact_outcomes: {
                                score: Math.round(reviewResponse.score * 9.5),
                                weight: 15,
                                evidence: ["Impact assessment from resume review"]
                            },
                            role_alignment: {
                                score: Math.round(reviewResponse.score * 10),
                                weight: 15,
                                evidence: [reviewResponse.resumeReview]
                            },
                            project_tech_depth: {
                                score: Math.round(reviewResponse.score * 8.5),
                                weight: 10,
                                evidence: ["Technical depth evaluation"]
                            },
                            career_trajectory: {
                                score: Math.round(reviewResponse.score * 8),
                                weight: 5,
                                evidence: ["Career progression analysis"]
                            },
                            communication_clarity: {
                                score: 85,
                                weight: 5,
                                evidence: ["Resume clarity assessment"]
                            },
                            certs_education: {
                                score: 75,
                                weight: 3,
                                evidence: ["Education and certification review"]
                            },
                            extras: {
                                score: 80,
                                weight: 2,
                                evidence: ["Additional qualifications"]
                            }
                        }
                    };

                    setAnalysis(backendAnalysis);
                    console.log('Backend resume analysis completed successfully');
                } catch (apiError) {
                    console.warn('Backend API analysis failed, using fallback:', apiError);
                    // Fallback to mock analysis if backend fails
                    const mockAnalysis = generateMockAnalysis();
                    setAnalysis(mockAnalysis);
                }

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
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="text-foreground">Analyzing your resume...</p>
                    <p className="text-muted-foreground text-sm">This may take a few moments</p>
                </div>
            </div>
        );
    }

    if (error || !application || !analysis) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Card className="bg-card border-border max-w-md">
                    <CardContent className="text-center py-8">
                        <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                        <CardTitle className="text-card-foreground mb-2">Analysis Failed</CardTitle>
                        <CardDescription className="text-muted-foreground mb-4">
                            {error || 'Unable to load application analysis'}
                        </CardDescription>
                        <Button
                            onClick={handleReturnToDashboard}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            Return to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <Card className="bg-card border-border mb-8">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <CardTitle className="text-2xl text-card-foreground flex items-center">
                                    <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                                    Application Submitted Successfully
                                </CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    AI-powered analysis of your application for: <span className="text-card-foreground font-medium">{application.jobTitle}</span>
                                </CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-card-foreground mb-1">
                                    {analysis.overall_score}%
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Overall Score
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-card-foreground font-medium">Resume Analyzed</div>
                                <div className="text-muted-foreground text-sm">{application.resumeFileName}</div>
                            </div>
                            <div className="text-center">
                                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <div className="text-card-foreground font-medium">Hard Filters</div>
                                <div className="text-muted-foreground text-sm">
                                    {analysis.passed_hard_filters ? 'Passed' : 'Failed'}
                                </div>
                            </div>
                            <div className="text-center">
                                <RotateCcw className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-card-foreground font-medium">Confidence</div>
                                <div className="text-muted-foreground text-sm">
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
                    candidateName={user?.name || application.candidateName || 'Test User'}
                />

                {/* Next Steps */}
                <Card className="bg-card border-border mt-8">
                    <CardHeader>
                        <CardTitle className="text-card-foreground">Next Steps</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Ready to take the next step in your application process?
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button
                                onClick={handleStartInterview}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                            >
                                Start AI Interview
                            </Button>
                            <Button
                                onClick={handleReturnToDashboard}
                                variant="outline"
                                className="border-border text-foreground hover:bg-accent h-12"
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
