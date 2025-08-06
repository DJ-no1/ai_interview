'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Zap,
    Brain,
    Users,
    Clock,
    Star,
    ArrowRight,
    TrendingUp,
    Shield,
    Award
} from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "AI-Powered Matching",
        description: "Advanced algorithms match candidates with perfect job opportunities based on skills, experience, and culture fit."
    },
    {
        icon: Zap,
        title: "Instant Screening",
        description: "Automated resume analysis and candidate screening saves hours of manual review time."
    },
    {
        icon: Users,
        title: "Smart Interviews",
        description: "AI-driven interview questions and real-time analysis provide deeper candidate insights."
    },
    {
        icon: Clock,
        title: "Fast Hiring",
        description: "Reduce time-to-hire from weeks to days with streamlined processes and instant feedback."
    }
];

const stats = [
    { number: "10,000+", label: "Successful Hires", icon: Users },
    { number: "85%", label: "Time Saved", icon: Clock },
    { number: "95%", label: "Match Accuracy", icon: TrendingUp },
    { number: "4.9/5", label: "User Rating", icon: Star }
];

const testimonials = [
    {
        name: "Sarah Chen",
        role: "HR Director, TechCorp",
        content: "OpenHire transformed our hiring process. We reduced time-to-hire by 70% while improving candidate quality."
    },
    {
        name: "Michael Rodriguez",
        role: "Software Engineer",
        content: "As a candidate, the AI-powered matching helped me find my dream job in just 2 weeks. The process was seamless."
    },
    {
        name: "Lisa Park",
        role: "Startup Founder",
        content: "For a small team, OpenHire was game-changing. We found top talent without needing a dedicated HR team."
    }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation Header */}
            <nav className="border-b border-gray-800 bg-black/20 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">OpenHire</span>
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                            AI-Powered
                        </Badge>
                    </div>
                    <div className="flex space-x-4">
                        <Link href="/login/candidate">
                            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                                Candidate Login
                            </Button>
                        </Link>
                        <Link href="/login/recruiter">
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                                Recruiter Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center text-white mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
                        <Award className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-300 text-sm font-medium">#1 AI Hiring Platform</span>
                    </div>
                    <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        Revolutionizing Hiring with{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            AI Intelligence
                        </span>
                    </h1>
                    <p className="text-xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Transform your recruitment process with cutting-edge AI technology. Match the perfect candidates
                        with ideal opportunities in minutes, not weeks. Experience the future of hiring today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/register/recruiter">
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg shadow-2xl">
                                Start Recruiting
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/register/candidate">
                            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-white/10 px-10 py-4 text-lg">
                                Find Your Dream Job
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <Card key={index} className="bg-white/5 border-gray-800 backdrop-blur-sm hover:bg-white/10 transition-all">
                            <CardContent className="p-6 text-center">
                                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Powered by Advanced AI Technology
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Our intelligent platform leverages cutting-edge machine learning to revolutionize
                        every aspect of the hiring process.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-white/5 border-gray-800 backdrop-blur-sm hover:bg-white/10 transition-all group">
                            <CardHeader>
                                <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-400">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        See how OpenHire has transformed hiring for companies and candidates worldwide.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-white/5 border-gray-800 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-white font-bold">
                                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                        <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Transform Your Hiring?
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of companies and candidates who have already discovered
                            the power of AI-driven recruitment. Start your journey today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register/recruiter">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4">
                                    Get Started as Recruiter
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/register/candidate">
                                <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-white/10 px-8 py-4">
                                    Join as Candidate
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 bg-black/20 backdrop-blur-md">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">OpenHire</span>
                            </div>
                            <p className="text-gray-400">
                                Revolutionizing recruitment with AI-powered solutions for a smarter hiring future.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Platform</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><span className="text-gray-500">Features (Coming Soon)</span></li>
                                <li><span className="text-gray-500">Pricing (Coming Soon)</span></li>
                                <li><span className="text-gray-500">Integrations (Coming Soon)</span></li>
                                <li><span className="text-gray-500">API (Coming Soon)</span></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><span className="text-gray-500">About (Coming Soon)</span></li>
                                <li><span className="text-gray-500">Careers (Coming Soon)</span></li>
                                <li><span className="text-gray-500">Press (Coming Soon)</span></li>
                                <li><span className="text-gray-500">Contact (Coming Soon)</span></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><span className="text-gray-500">Help Center (Coming Soon)</span></li>
                                <li><span className="text-gray-500">Documentation (Coming Soon)</span></li>
                                <li><span className="text-gray-500">Status (Coming Soon)</span></li>
                                <li><span className="text-gray-500">Security (Coming Soon)</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400">© 2025 OpenHire. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <span className="text-gray-500">Privacy (Coming Soon)</span>
                            <span className="text-gray-500">Terms (Coming Soon)</span>
                            <span className="text-gray-500">Cookies (Coming Soon)</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
