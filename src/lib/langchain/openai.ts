import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ResumeAnalysis } from '@/types';

export class OpenHireAI {
    private llm: ChatOpenAI;

    constructor() {
        this.llm = new ChatOpenAI({
            modelName: 'gpt-4',
            temperature: 0.7,
            openAIApiKey: process.env.OPENAI_API_KEY,
        });
    }

    async analyzeResume(resumeText: string, jobDescription: string): Promise<ResumeAnalysis> {
        const systemMessage = new SystemMessage(`
      You are an expert HR assistant that analyzes resumes against job descriptions.
      Provide a detailed analysis including:
      1. Overall match score (0-100)
      2. Key strengths that align with the job
      3. Areas of improvement or missing skills
      4. Years of relevant experience
      5. Key skills identified
      6. Specific recommendations for the recruiter
      
      Return the response in JSON format with the following structure:
      {
        "score": number,
        "strengths": string[],
        "weaknesses": string[],
        "matchPercentage": number,
        "keySkills": string[],
        "experience": number,
        "recommendations": string[]
      }
    `);

        const humanMessage = new HumanMessage(`
      Job Description:
      ${jobDescription}
      
      Resume Content:
      ${resumeText}
      
      Please analyze this resume against the job description.
    `);

        try {
            const response = await this.llm.invoke([systemMessage, humanMessage]);
            return JSON.parse(response.content as string);
        } catch (error) {
            console.error('Error analyzing resume:', error);
            throw new Error('Failed to analyze resume');
        }
    }

    async generateInterviewQuestions(jobDescription: string, resumeAnalysis: ResumeAnalysis) {
        const systemMessage = new SystemMessage(`
      You are an expert interviewer. Generate relevant interview questions based on the job description and candidate's resume analysis.
      Create questions that cover:
      1. Technical skills relevant to the job
      2. Behavioral questions
      3. Situational questions
      4. Experience-based questions
      
      Return 8-10 questions in JSON format:
      {
        "questions": [
          {
            "id": "unique_id",
            "question": "question text",
            "category": "TECHNICAL|BEHAVIORAL|SITUATIONAL|GENERAL",
            "expectedAnswer": "brief description of what to look for"
          }
        ]
      }
    `);

        const humanMessage = new HumanMessage(`
      Job Description:
      ${jobDescription}
      
      Resume Analysis:
      ${JSON.stringify(resumeAnalysis)}
      
      Generate appropriate interview questions.
    `);

        try {
            const response = await this.llm.invoke([systemMessage, humanMessage]);
            return JSON.parse(response.content as string);
        } catch (error) {
            console.error('Error generating questions:', error);
            throw new Error('Failed to generate interview questions');
        }
    }

    async evaluateInterviewResponse(question: string, answer: string, jobContext: string) {
        const systemMessage = new SystemMessage(`
      You are an expert interviewer evaluating candidate responses.
      Rate the answer on a scale of 1-10 and provide constructive feedback.
      Consider:
      1. Relevance to the question
      2. Technical accuracy (if applicable)
      3. Communication clarity
      4. Depth of knowledge
      5. Problem-solving approach
      
      Return response in JSON format:
      {
        "score": number (1-10),
        "feedback": "detailed feedback",
        "strengths": string[],
        "improvements": string[]
      }
    `);

        const humanMessage = new HumanMessage(`
      Job Context: ${jobContext}
      Question: ${question}
      Candidate Answer: ${answer}
      
      Please evaluate this response.
    `);

        try {
            const response = await this.llm.invoke([systemMessage, humanMessage]);
            return JSON.parse(response.content as string);
        } catch (error) {
            console.error('Error evaluating response:', error);
            throw new Error('Failed to evaluate interview response');
        }
    }

    async generateJobDescription(title: string, requirements: string[], company?: string) {
        const systemMessage = new SystemMessage(`
      You are an expert HR professional. Create a compelling job description that includes:
      1. Engaging job summary
      2. Key responsibilities
      3. Required qualifications
      4. Preferred qualifications
      5. Company benefits (if company info provided)
      
      Make it professional, clear, and attractive to qualified candidates.
    `);

        const humanMessage = new HumanMessage(`
      Job Title: ${title}
      Requirements: ${requirements.join(', ')}
      Company: ${company || 'Not specified'}
      
      Create a comprehensive job description.
    `);

        try {
            const response = await this.llm.invoke([systemMessage, humanMessage]);
            return response.content as string;
        } catch (error) {
            console.error('Error generating job description:', error);
            throw new Error('Failed to generate job description');
        }
    }
}
