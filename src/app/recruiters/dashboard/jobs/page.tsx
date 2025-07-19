import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Briefcase } from "lucide-react";

export default function RecruiterJobsPage() {
    return (
        <div className="h-full overflow-auto bg-gray-950 p-6">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Manage Jobs</h1>
                    <p className="text-gray-400">Create and manage your job postings</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <Button variant="outline" className="border-gray-800 text-gray-300 hover:bg-gray-800">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                </Button>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
                {/* Empty State */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Briefcase className="w-12 h-12 text-gray-500 mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No jobs posted yet</h3>
                        <p className="text-gray-400 text-center mb-4">
                            Start by creating your first job posting to attract candidates
                        </p>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Create First Job
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
