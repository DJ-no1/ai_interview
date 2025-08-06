'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/SimpleAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Mic, MicOff, User, Bot, CheckCircle, AlertTriangle } from 'lucide-react';
import { backendAPI } from '@/lib/backend-api';

interface InterviewMessage {
    type: 'system' | 'human' | 'ai';
    content: string;
    timestamp?: Date;
}

interface WebSocketMessage {
    type: string;
    message?: string;
    question?: string;
    analysis?: any;
    session_id?: string;
    data?: any;
}

export default function AIInterviewPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();

    const sessionId = params?.sessionId as string;
    const applicationId = searchParams?.get('applicationId');
    const jobId = searchParams?.get('jobId');

    const [messages, setMessages] = useState<InterviewMessage[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [interviewStatus, setInterviewStatus] = useState<'connecting' | 'active' | 'completed' | 'error'>('connecting');
    const [progress, setProgress] = useState({ current: 0, total: 5 });
    const [isRecording, setIsRecording] = useState(false);

    const wsRef = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sessionId || !user) return;

        const connectWebSocket = async () => {
            try {
                const wsUrl = backendAPI.getAIInterviewWebSocketUrl(sessionId, user.id);
                console.log('Connecting to AI Interview WebSocket:', wsUrl);

                const ws = new WebSocket(wsUrl);
                wsRef.current = ws;

                ws.onopen = () => {
                    console.log('WebSocket connected');
                    setIsConnected(true);
                    setIsLoading(false);
                    setInterviewStatus('active');

                    // Initialize interview
                    ws.send(JSON.stringify({
                        type: 'initialize_interview',
                        job_description: `Job for ${jobId}`,
                        resume: `Resume for candidate ${user.name}`,
                        candidate_id: user.id,
                        session_id: sessionId
                    }));
                };

                ws.onmessage = (event) => {
                    try {
                        const data: WebSocketMessage = JSON.parse(event.data);
                        handleWebSocketMessage(data);
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                };

                ws.onclose = () => {
                    console.log('WebSocket disconnected');
                    setIsConnected(false);
                    if (interviewStatus === 'active') {
                        setInterviewStatus('error');
                    }
                };

                ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    setInterviewStatus('error');
                    setIsLoading(false);
                };

            } catch (error) {
                console.error('Failed to connect to WebSocket:', error);
                setInterviewStatus('error');
                setIsLoading(false);
            }
        };

        connectWebSocket();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [sessionId, user, jobId, interviewStatus]);

    const handleWebSocketMessage = (data: WebSocketMessage) => {
        console.log('Received WebSocket message:', data);

        switch (data.type) {
            case 'connection_success':
                addMessage('system', 'Connected to AI Interview System');
                break;

            case 'welcome':
                addMessage('ai', data.message || 'Welcome to your AI interview!');
                break;

            case 'question':
                setCurrentQuestion(data.question || '');
                addMessage('ai', data.question || '');
                setProgress(prev => ({ ...prev, current: prev.current + 1 }));
                break;

            case 'answer_received':
                addMessage('system', 'Answer received, analyzing...');
                break;

            case 'analysis_started':
                addMessage('system', 'AI is analyzing your response...');
                break;

            case 'interview_completed':
                setInterviewStatus('completed');
                addMessage('ai', 'Interview completed! Here\'s your analysis:');
                if (data.analysis) {
                    addMessage('system', `Overall Score: ${data.analysis.overall_score}/10`);
                    addMessage('system', `Recommendation: ${data.analysis.recommendation}`);
                }
                setTimeout(() => {
                    router.push(`/candidates/application/${applicationId}/analysis`);
                }, 3000);
                break;

            case 'error':
                addMessage('system', `Error: ${data.message}`);
                break;

            case 'pong':
                // Health check response
                break;

            default:
                console.log('Unknown message type:', data.type);
        }
    };

    const addMessage = (type: 'system' | 'human' | 'ai', content: string) => {
        setMessages(prev => [...prev, {
            type,
            content,
            timestamp: new Date()
        }]);
    };

    const sendMessage = () => {
        if (!currentInput.trim() || !wsRef.current || !isConnected) return;

        const message = currentInput.trim();
        addMessage('human', message);

        wsRef.current.send(JSON.stringify({
            type: 'submit_answer',
            answer: message,
            session_id: sessionId
        }));

        setCurrentInput('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const endInterview = () => {
        if (wsRef.current && isConnected) {
            wsRef.current.send(JSON.stringify({
                type: 'end_interview',
                session_id: sessionId
            }));
        }
        setInterviewStatus('completed');
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
        // Voice recording would be implemented here
        // For now, just toggle the visual state
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="text-foreground">Connecting to AI Interviewer...</p>
                    <p className="text-muted-foreground text-sm">Please wait while we set up your interview</p>
                </div>
            </div>
        );
    }

    if (interviewStatus === 'error') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Card className="bg-card border-border max-w-md">
                    <CardContent className="text-center py-8">
                        <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
                        <CardTitle className="text-card-foreground mb-2">Connection Failed</CardTitle>
                        <p className="text-muted-foreground mb-4">Unable to connect to the AI interview system</p>
                        <Button onClick={() => router.push('/candidates/dashboard')} className="bg-primary hover:bg-primary/90">
                            Return to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 max-w-4xl">
                {/* Header */}
                <Card className="bg-card border-border mb-6">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-card-foreground">AI Interview Session</CardTitle>
                                <p className="text-muted-foreground">
                                    Session ID: {sessionId} •
                                    Status: <Badge variant={isConnected ? 'default' : 'destructive'}>
                                        {isConnected ? 'Connected' : 'Disconnected'}
                                    </Badge>
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-semibold text-card-foreground">
                                    Question {progress.current} of {progress.total}
                                </div>
                                <div className="w-32 bg-muted rounded-full h-2 mt-1">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(progress.current / progress.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Chat Interface */}
                <Card className="bg-card border-border">
                    <CardContent className="p-0">
                        {/* Messages */}
                        <div className="h-96 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className={`flex ${message.type === 'human' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-3 max-w-[80%] ${message.type === 'human' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'human' ? 'bg-primary text-primary-foreground' :
                                                message.type === 'ai' ? 'bg-secondary text-secondary-foreground' :
                                                    'bg-muted text-muted-foreground'
                                            }`}>
                                            {message.type === 'human' ? <User className="w-4 h-4" /> :
                                                message.type === 'ai' ? <Bot className="w-4 h-4" /> :
                                                    <CheckCircle className="w-4 h-4" />}
                                        </div>
                                        <div className={`rounded-lg p-3 ${message.type === 'human' ? 'bg-primary text-primary-foreground' :
                                                message.type === 'ai' ? 'bg-secondary text-secondary-foreground' :
                                                    'bg-muted text-muted-foreground'
                                            }`}>
                                            <p className="text-sm">{message.content}</p>
                                            {message.timestamp && (
                                                <p className="text-xs opacity-70 mt-1">
                                                    {message.timestamp.toLocaleTimeString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        {interviewStatus === 'active' && (
                            <div className="border-t border-border p-4">
                                <div className="flex gap-2">
                                    <Input
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your answer here..."
                                        className="flex-1"
                                        disabled={!isConnected}
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={toggleRecording}
                                        className={isRecording ? 'bg-red-100 text-red-600' : ''}
                                    >
                                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                    </Button>
                                    <Button onClick={sendMessage} disabled={!currentInput.trim() || !isConnected}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-muted-foreground">
                                        Press Enter to send • Click mic for voice input
                                    </p>
                                    <Button variant="outline" size="sm" onClick={endInterview}>
                                        End Interview
                                    </Button>
                                </div>
                            </div>
                        )}

                        {interviewStatus === 'completed' && (
                            <div className="border-t border-border p-4 text-center">
                                <p className="text-card-foreground font-medium">Interview Completed!</p>
                                <p className="text-muted-foreground text-sm">Redirecting to analysis...</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
