import { RecruiterStatsCard } from "@/components/recruiters/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, FileText, Clock } from "lucide-react";

export default function RecruiterDashboard() {
    return (
        <div className="h-full overflow-auto bg-gray-950 p-6">
            {/* Login Status Indicator */}
            <div className="mb-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-600/20 border border-purple-600/30">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-purple-400 text-xs font-medium">Logged in as Recruiter</span>
                </div>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Recruiter Dashboard</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <RecruiterStatsCard
                    title="Active Jobs"
                    value="0"
                    description="Currently posted job openings"
                    icon={<Briefcase className="w-5 h-5" />}
                />
                <RecruiterStatsCard
                    title="Total Candidates"
                    value="0"
                    description="Candidates in your pipeline"
                    icon={<Users className="w-5 h-5" />}
                />
                <RecruiterStatsCard
                    title="Applications Received"
                    value="0"
                    description="Total applications for all jobs"
                    icon={<FileText className="w-5 h-5" />}
                />
                <RecruiterStatsCard
                    title="Pending Reviews"
                    value="0"
                    description="Applications awaiting review"
                    icon={<Clock className="w-5 h-5" />}
                />
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white h-12">
                                Post New Job
                            </Button>
                            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 h-12">
                                View All Candidates
                            </Button>
                            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 h-12">
                                Review Applications
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Applications */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Applications</CardTitle>
                        <p className="text-gray-400 text-sm">Latest candidate applications</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-40 flex items-center justify-center">
                            <p className="text-gray-500">No applications yet</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Job Performance */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white">Job Performance</CardTitle>
                        <p className="text-gray-400 text-sm">Application rates and job visibility</p>
                    </CardHeader>
                    <CardContent>
                        <div className="h-40 flex items-center justify-center">
                            <p className="text-gray-500">No active jobs</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
