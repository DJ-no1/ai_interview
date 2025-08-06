"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

interface ResumeAnalysisResultsProps {
    analysis: {
        overall_score: number
        dimensions: {
            [key: string]: {
                score: number
                weight: number
                evidence: string[]
            }
        }
        risk_flags: Array<{
            type: string
            severity: 'low' | 'medium' | 'high'
            description: string
        }>
        hard_filter_failures: Array<{
            criterion: string
            description: string
        }>
        recommendations: string[]
    }
}

export function ResumeAnalysisResults({ analysis }: ResumeAnalysisResultsProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500"
        if (score >= 60) return "text-yellow-500"
        return "text-red-500"
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
            case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
            case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
        }
    }

    return (
        <div className="space-y-6">
            {/* Overall Score */}
            <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <TrendingUp className="w-5 h-5" />
                        Overall Analysis Score
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className={`text-4xl font-bold ${getScoreColor(analysis.overall_score)}`}>
                            {Math.round(analysis.overall_score)}%
                        </div>
                        <div className="flex-1">
                            <Progress
                                value={analysis.overall_score}
                                className="h-3"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Dimensions */}
            <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white">Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(analysis.dimensions).map(([key, dimension]) => (
                        <div key={key} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-white font-medium capitalize">
                                    {key.replace(/_/g, ' ')}
                                </span>
                                <span className={`text-lg font-bold ${getScoreColor(dimension.score)}`}>
                                    {Math.round(dimension.score)}%
                                </span>
                            </div>
                            <Progress
                                value={dimension.score}
                                className="h-2"
                            />
                            <div className="text-sm text-gray-400">
                                Weight: {Math.round(dimension.weight * 100)}%
                            </div>
                            {dimension.evidence.length > 0 && (
                                <div className="space-y-1">
                                    {dimension.evidence.slice(0, 2).map((evidence, idx) => (
                                        <div key={idx} className="text-xs text-gray-500 pl-2 border-l border-gray-700">
                                            {evidence}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Risk Flags */}
            {analysis.risk_flags.length > 0 && (
                <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <AlertTriangle className="w-5 h-5" />
                            Risk Flags
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {analysis.risk_flags.map((flag, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <Badge className={getSeverityColor(flag.severity)}>
                                    {flag.severity.toUpperCase()}
                                </Badge>
                                <div className="flex-1">
                                    <div className="text-white font-medium">{flag.type}</div>
                                    <div className="text-gray-400 text-sm">{flag.description}</div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Hard Filter Failures */}
            {analysis.hard_filter_failures.length > 0 && (
                <Card className="bg-gray-900/50 border-gray-800 border-red-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-400">
                            <AlertTriangle className="w-5 h-5" />
                            Critical Issues
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {analysis.hard_filter_failures.map((failure, idx) => (
                            <div key={idx} className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <div className="text-red-400 font-medium">{failure.criterion}</div>
                                <div className="text-gray-400 text-sm">{failure.description}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Recommendations */}
            {analysis.recommendations.length > 0 && (
                <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <CheckCircle className="w-5 h-5" />
                            Recommendations
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {analysis.recommendations.map((recommendation, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <div className="text-gray-300 text-sm">{recommendation}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
