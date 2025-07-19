import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ApplicationsPage() {
    return (
        <div className="h-full overflow-auto bg-gray-950 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
                <p className="text-gray-400">Track your job application status</p>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {/* Empty State */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <FileText className="w-12 h-12 text-gray-500 mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No applications yet</h3>
                        <p className="text-gray-400 text-center">
                            Start applying to jobs to see your applications here
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
