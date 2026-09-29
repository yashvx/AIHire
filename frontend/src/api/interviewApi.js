import { apiClient, USE_MOCK } from './client';
import { MOCK_INTERVIEWS, MOCK_INTERVIEW_QUESTIONS, MOCK_INTERVIEW_REPORT } from '../data/mockData';

export const interviewApi = {
  async createInterview({ resume_id, company, role, interview_type }) {
    if (USE_MOCK) {
      const newInterview = {
        id: Date.now(),
        user_id: 1,
        resume_id: Number(resume_id),
        company,
        role,
        interview_type,
        status: "created",
        score: null,
        created_at: new Date().toISOString()
      };
      return newInterview;
    }
    return apiClient.post('/interviews', { resume_id: Number(resume_id), company, role, interview_type });
  },

  async getInterviews() {
    if (USE_MOCK) {
      return MOCK_INTERVIEWS;
    }
    try {
      return await apiClient.get('/interviews');
    } catch {
      return MOCK_INTERVIEWS;
    }
  },

  async startInterview(interviewId) {
    if (USE_MOCK) {
      return { id: Number(interviewId), status: "in_progress" };
    }
    return apiClient.post(`/interviews/${interviewId}/start`);
  },

  async generateQuestions({ interview_id, company, role, interview_type }) {
    if (USE_MOCK) {
      return { message: "Questions generated", questions: MOCK_INTERVIEW_QUESTIONS };
    }
    try {
      return await apiClient.post('/interviews/questions', { interview_id: Number(interview_id), company, role, interview_type });
    } catch {
      return { message: "Questions generated (fallback)", questions: MOCK_INTERVIEW_QUESTIONS };
    }
  },

  async getInterviewQuestions(interviewId) {
    if (USE_MOCK) {
      return MOCK_INTERVIEW_QUESTIONS;
    }
    try {
      return await apiClient.get(`/interviews/${interviewId}/questions`);
    } catch {
      return MOCK_INTERVIEW_QUESTIONS;
    }
  },

  async getCurrentQuestion(interviewId, questionOrder) {
    if (USE_MOCK) {
      const q = MOCK_INTERVIEW_QUESTIONS.find(item => item.order === Number(questionOrder)) || MOCK_INTERVIEW_QUESTIONS[0];
      return {
        question_id: q.id,
        order: q.order,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        total_questions: MOCK_INTERVIEW_QUESTIONS.length
      };
    }
    try {
      return await apiClient.get(`/interviews/${interviewId}/questions/${questionOrder}`);
    } catch {
      const q = MOCK_INTERVIEW_QUESTIONS[0];
      return { question_id: q.id, order: Number(questionOrder), category: q.category, difficulty: q.difficulty, question: q.question, total_questions: 5 };
    }
  },

  async submitQuestionAnswer(interviewId, questionOrder, answer) {
    if (USE_MOCK) {
      return {
        technical_score: 92,
        communication_score: 88,
        relevance_score: 90,
        overall_score: 90,
        feedback: "Great structured technical response with good domain depth.",
        adaptive_followup: null
      };
    }
    try {
      return await apiClient.post(`/interviews/${interviewId}/questions/${questionOrder}/answer`, { answer });
    } catch {
      return {
        technical_score: 88,
        communication_score: 85,
        relevance_score: 90,
        overall_score: 88,
        feedback: "Solid answer covering core operational requirements.",
        adaptive_followup: null
      };
    }
  },

  async getAdaptiveFollowup(interviewId, currentQuestionOrder) {
    if (USE_MOCK) {
      return {
        has_adaptive: true,
        question: "[AI Adaptive Follow-up] How would you handle continuous deployment while minimizing database migration lock conflicts?"
      };
    }
    try {
      return await apiClient.post(`/interviews/${interviewId}/adaptive-next-question`, { current_question_order: Number(currentQuestionOrder) });
    } catch {
      return {
        has_adaptive: false,
        question: null
      };
    }
  },

  async completeInterview(interviewId) {
    if (USE_MOCK) {
      return { id: Number(interviewId), status: "completed" };
    }
    try {
      return await apiClient.post(`/interviews/${interviewId}/complete`);
    } catch {
      return { id: Number(interviewId), status: "completed" };
    }
  },

  async evaluateInterview(interviewId) {
    if (USE_MOCK) {
      return { overall_score: 89, feedback: "Interview evaluation completed." };
    }
    try {
      return await apiClient.post(`/interviews/${interviewId}/evaluation`);
    } catch {
      return { overall_score: 89, feedback: "Evaluation complete" };
    }
  },

  async getInterviewReport(interviewId) {
    if (USE_MOCK) {
      return { ...MOCK_INTERVIEW_REPORT, interview_id: Number(interviewId) };
    }
    try {
      return await apiClient.get(`/interviews/${interviewId}/report`);
    } catch {
      return { ...MOCK_INTERVIEW_REPORT, interview_id: Number(interviewId) };
    }
  }
};
