import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-white">OpenHire</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/login/candidate">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Candidate Login
              </Button>
            </Link>
            <Link href="/login/recruiter">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Recruiter Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white mb-20">
          <h1 className="text-6xl font-bold mb-8 leading-tight">
            Revolutionizing Your Hiring with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Automation
            </span>
          </h1>
          <p className="text-xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our AI-driven platform streamlines the recruitment process from job posting to final selection,
            saving you time and finding the perfect candidates automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register/recruiter">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Start Recruiting
              </Button>
            </Link>
            <Link href="/register/candidate">
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-8 py-3">
                Find Jobs
              </Button>
            </Link>
          </div>
        </div>

        {/* Intelligent Recruitment Platform Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">Intelligent Recruitment Platform</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Our advanced AI-driven process eliminates manual screening, saving you time while finding the best talent
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <Card className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 transition-colors">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">Smart Job Posting</CardTitle>
              <CardDescription className="text-gray-400">
                Create compelling job descriptions using advanced AI technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our intelligent system generates professional job descriptions tailored to attract the right candidates with precision.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 transition-colors">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">Unique Application Links</CardTitle>
              <CardDescription className="text-gray-400">
                Generate secure, trackable application URLs for each position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Each job posting gets a unique link for seamless application tracking and candidate management.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 transition-colors">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">Resume Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                AI-powered resume scoring and candidate matching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Automatically analyze and score resumes based on job requirements with detailed compatibility insights.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 transition-colors">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">AI-Powered Interviews</CardTitle>
              <CardDescription className="text-gray-400">
                Conduct intelligent interviews with comprehensive evaluation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our AI conducts professional interviews and provides detailed candidate assessments automatically.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 transition-colors">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">Comprehensive Feedback</CardTitle>
              <CardDescription className="text-gray-400">
                Detailed reports and actionable hiring recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Get comprehensive evaluation reports with clear recommendations for informed hiring decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 transition-colors">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl">Data-Driven Insights</CardTitle>
              <CardDescription className="text-gray-400">
                Advanced analytics and recruitment performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Track recruitment metrics and gain insights to continuously improve your hiring process.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-white mb-6">Powered by Advanced Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
              <p className="font-semibold text-white text-lg">Next.js 14</p>
              <p className="text-sm text-gray-400">Modern Framework</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
              <p className="font-semibold text-white text-lg">LangChain</p>
              <p className="text-sm text-gray-400">AI Integration</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
              <p className="font-semibold text-white text-lg">OpenAI GPT-4</p>
              <p className="text-sm text-gray-400">Intelligence</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
              <p className="font-semibold text-white text-lg">PostgreSQL</p>
              <p className="text-sm text-gray-400">Secure Database</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Hiring Process?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of companies using OpenHire to find the perfect candidates efficiently and effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register/recruiter">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login/recruiter">
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-8 py-3">
                Login as Recruiter
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; 2025 OpenHire. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
