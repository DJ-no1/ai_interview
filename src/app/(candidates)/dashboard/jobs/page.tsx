import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Briefcase } from "lucide-react";

export default function JobsPage() {
    return (
        <div className="h-full overflow-auto bg-gray-950 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Available Jobs</h1>
                <p className="text-gray-400">Find and apply to new job opportunities</p>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <h3 className="text-lg font-semibold text-white mb-2">No jobs available</h3>
                        <p className="text-gray-400 text-center">
                            Check back later for new job opportunities
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
