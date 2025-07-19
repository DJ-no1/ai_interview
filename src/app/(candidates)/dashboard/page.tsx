import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BarChart3, Clock } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="h-full overflow-auto bg-gray-950 p-6">
            {/* Login Status Indicator */}
            <div className="mb-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-600/20 border border-green-600/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-400 text-xs font-medium">Logged in as Candidate</span>
                </div>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Candidate Dashboard</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                    title="My Applications"
                    value="0"
                    description="Total jobs you've applied to"
                    icon={<ExternalLink className="w-5 h-5" />}
                />
                <StatsCard
                    title="Application Success Rate"
                    value="0%"
                    description="Percentage of successful applications"
                    icon={<BarChart3 className="w-5 h-5" />}
                />
                <StatsCard
                    title="Interview Opportunities"
                    value="0"
                    description="Applications in review or accepted status"
                    icon={<Clock className="w-5 h-5" />}
                />
            </div>

            {/* Browse Jobs Section */}
            <div className="mb-8">
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">Browse Available Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white">Explore Opportunities</h3>
                            <p className="text-gray-400">Find and apply to new job openings</p>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                Browse Jobs
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Applications by Status */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">Applications by Status</CardTitle>
                        <p className="text-gray-400 text-sm">Status distribution of your job applications</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-40 flex items-center justify-center">
                            <p className="text-gray-500">No applications yet</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Applications */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Job Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-40 flex items-center justify-center">
                            <p className="text-gray-500">You haven&apos;t applied to any jobs yet</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
