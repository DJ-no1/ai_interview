import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Users } from "lucide-react";

export default function RecruiterCandidatesPage() {
    return (
        <div className="h-full overflow-auto bg-gray-950 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Candidate Pipeline</h1>
                <p className="text-gray-400">Manage and review candidate applications</p>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search candidates..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <Button variant="outline" className="border-gray-800 text-gray-300 hover:bg-gray-800">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                </Button>
            </div>

            {/* Candidates List */}
            <div className="space-y-4">
                {/* Empty State */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Users className="w-12 h-12 text-gray-500 mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No candidates yet</h3>
                        <p className="text-gray-400 text-center">
                            Candidates will appear here when they apply to your job postings
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
