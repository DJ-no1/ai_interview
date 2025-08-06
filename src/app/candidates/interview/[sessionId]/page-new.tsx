'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/SimpleAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
    Loader2,
    AlertCircle,
    MessageSquare,
    Mic,
    MicOff,
    Send,
    Clock,
    CheckCircle,
    User,
    Bot,
    ArrowLeft
} from 'lucide-react';

interface InterviewMessage {
    id: string;
    type: 'ai' | 'user';
    content: string;
    timestamp: Date;
}

interface InterviewSession {
    id: string;
    applicationId: string;
    jobTitle: string;
    status: 'active' | 'completed' | 'pending';
    startedAt: Date;
    messages: InterviewMessage[];
}

// Mock interview questions based on job type
const getInterviewQuestions = (jobTitle: string): string[] => {
    const baseQuestions = [
        "Tell me about yourself and your background.",
        "What interests you about this position?",
        "Can you describe a challenging project you've worked on?",
        "How do you handle working under pressure?",
        "Where do you see yourself in 5 years?"
    ];

    if (jobTitle.toLowerCase().includes('frontend') || jobTitle.toLowerCase().includes('react')) {
        return [
            "Tell me about yourself and your experience with frontend development.",
            "What interests you about this frontend developer position?",
            "Can you explain the difference between React hooks and class components?",
            "How do you optimize the performance of a React application?",
            "Describe your experience with responsive web design.",
            "How do you handle state management in large applications?",
            "What's your approach to testing frontend applications?"
        ];
    }

    if (jobTitle.toLowerCase().includes('backend')) {
        return [
            "Tell me about yourself and your backend development experience.",
            "What interests you about this backend developer position?",
            "How do you design a scalable API architecture?",
            "Explain your experience with database optimization.",
            "How do you handle security in web applications?",
            "Describe your approach to microservices architecture.",
            "How do you monitor and debug production systems?"
        ];
    }

    if (jobTitle.toLowerCase().includes('ai') || jobTitle.toLowerCase().includes('ml')) {
        return [
            "Tell me about yourself and your experience in AI/ML.",
            "What interests you about this AI/ML engineer position?",
            "Explain the difference between supervised and unsupervised learning.",
            "How do you approach feature engineering for a new dataset?",
            "Describe your experience with model deployment and monitoring.",
            "How do you handle overfitting in machine learning models?",
            "What's your approach to evaluating model performance?"
        ];
    }

    return baseQuestions;
};

export default function InterviewPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const sessionId = params?.sessionId as string;
    const applicationId = searchParams?.get('applicationId');
    const jobId = searchParams?.get('jobId');

    const { user } = useAuth();
    const router = useRouter();

    const [session, setSession] = useState<InterviewSession | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAiThinking, setIsAiThinking] = useState(false);

    useEffect(() => {
        const initializeInterview = async () => {
            try {
                setLoading(true);

                // Get application data from localStorage
                const appData = localStorage.getItem('currentApplication');
                if (!appData && !applicationId) {
                    throw new Error('No application data found');
                }

                let jobTitle = 'Software Developer';
                if (appData) {
                    const app = JSON.parse(appData);
                    jobTitle = app.jobTitle;
                }

                // Create interview session
                const questions = getInterviewQuestions(jobTitle);
                const newSession: InterviewSession = {
                    id: sessionId,
                    applicationId: applicationId || 'mock-app-id',
                    jobTitle: jobTitle,
                    status: 'active',
                    startedAt: new Date(),
                    messages: [
                        {
                            id: '1',
                            type: 'ai',
                            content: `Hello ${user?.name || 'there'}! Welcome to your AI-powered interview for the ${jobTitle} position. I'm your AI interviewer, and I'll be asking you a series of questions to better understand your qualifications and experience. 

Let's start with our first question: ${questions[0]}`,
                            timestamp: new Date()
                        }
                    ]
                };

                setSession(newSession);

                // Store questions for this session
                localStorage.setItem(`interview_questions_${sessionId}`, JSON.stringify(questions));

            } catch (error) {
                setError('Failed to initialize interview session');
                console.error('Error initializing interview:', error);
            } finally {
                setLoading(false);
            }
        };

        if (sessionId) {
            initializeInterview();
        }
    }, [sessionId, applicationId, user?.name]);

    const handleSendMessage = async () => {
        if (!currentMessage.trim() || !session) return;

        const userMessage: InterviewMessage = {
            id: Date.now().toString(),
            type: 'user',
            content: currentMessage,
            timestamp: new Date()
        };

        // Add user message
        setSession(prev => prev ? {
            ...prev,
            messages: [...prev.messages, userMessage]
        } : null);

        setCurrentMessage('');
        setIsAiThinking(true);

        // Simulate AI thinking time
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Get next question or provide feedback
        const questions = JSON.parse(localStorage.getItem(`interview_questions_${sessionId}`) || '[]');
        const nextIndex = currentQuestionIndex + 1;

        let aiResponse: string;
        if (nextIndex < questions.length) {
            aiResponse = `Thank you for that response. Let me ask you another question: ${questions[nextIndex]}`;
            setCurrentQuestionIndex(nextIndex);
        } else {
            aiResponse = `Thank you for completing the interview! You've provided great insights about your experience and qualifications. Your responses will be reviewed by our team, and we'll get back to you soon with next steps. 

Is there anything else you'd like to add or any questions you have about the role or company?`;
        }

        const aiMessage: InterviewMessage = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: aiResponse,
            timestamp: new Date()
        };

        setSession(prev => prev ? {
            ...prev,
            messages: [...prev.messages, aiMessage]
        } : null);

        setIsAiThinking(false);
    };

    const handleEndInterview = () => {
        if (session) {
            setSession(prev => prev ? { ...prev, status: 'completed' } : null);
        }
        router.push('/candidates/dashboard');
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
        // In a real app, this would start/stop voice recording
        if (!isRecording) {
            // Simulate voice recording feedback
            setTimeout(() => {
                setIsRecording(false);
                setCurrentMessage("This is a simulated voice input. In a real implementation, this would convert speech to text.");
            }, 3000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                    <p className="text-white">Initializing interview session...</p>
                </div>
            </div>
        );
    }

    if (error || !session) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <Card className="bg-gray-900 border-gray-800 max-w-md">
                    <CardContent className="text-center py-8">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <CardTitle className="text-white mb-2">Interview Session Not Found</CardTitle>
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>
                                {error || 'Unable to load interview session'}
                            </AlertDescription>
                        </Alert>
                        <Button
                            onClick={() => router.push('/candidates/applications')}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Return to Applications
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800 p-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.back()}
                                className="text-gray-400 hover:text-white"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <div>
                                <h1 className="text-xl font-semibold text-white">AI Interview</h1>
                                <p className="text-gray-400">{session.jobTitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Badge
                                variant={session.status === 'active' ? 'default' : 'secondary'}
                                className="bg-green-600 text-white"
                            >
                                <Clock className="w-3 h-3 mr-1" />
                                {session.status === 'active' ? 'In Progress' : 'Completed'}
                            </Badge>
                            <Button
                                variant="outline"
                                onClick={handleEndInterview}
                                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                            >
                                End Interview
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Interface */}
            <div className="container mx-auto max-w-4xl p-4">
                <Card className="bg-gray-900 border-gray-800 h-[calc(100vh-200px)]">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Interview Conversation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                            {session.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-800 text-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center mb-1">
                                            {message.type === 'user' ? (
                                                <User className="w-4 h-4 mr-2" />
                                            ) : (
                                                <Bot className="w-4 h-4 mr-2" />
                                            )}
                                            <span className="text-xs opacity-75">
                                                {message.type === 'user' ? 'You' : 'AI Interviewer'}
                                            </span>
                                        </div>
                                        <p className="whitespace-pre-wrap">{message.content}</p>
                                        <p className="text-xs opacity-50 mt-1">
                                            {message.timestamp.toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* AI Thinking Indicator */}
                            {isAiThinking && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg">
                                        <div className="flex items-center">
                                            <Bot className="w-4 h-4 mr-2" />
                                            <span className="text-xs opacity-75">AI Interviewer</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            <span>Thinking...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        {session.status === 'active' && (
                            <div className="border-t border-gray-800 pt-4">
                                <div className="flex space-x-2">
                                    <Textarea
                                        value={currentMessage}
                                        onChange={(e) => setCurrentMessage(e.target.value)}
                                        placeholder="Type your response here..."
                                        className="flex-1 bg-gray-800 border-gray-700 text-white resize-none"
                                        rows={3}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                    />
                                    <div className="flex flex-col space-y-2">
                                        <Button
                                            onClick={toggleRecording}
                                            variant={isRecording ? "destructive" : "outline"}
                                            className={isRecording ? "animate-pulse" : "border-gray-700 text-gray-300 hover:bg-gray-800"}
                                        >
                                            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                        </Button>
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!currentMessage.trim() || isAiThinking}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Press Enter to send, Shift+Enter for new line
                                </p>
                            </div>
                        )}

                        {session.status === 'completed' && (
                            <div className="border-t border-gray-800 pt-4">
                                <div className="text-center">
                                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <p className="text-white font-medium">Interview Completed</p>
                                    <p className="text-gray-400 text-sm">Thank you for your time!</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
