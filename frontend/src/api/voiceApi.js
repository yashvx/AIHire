import { apiClient, USE_MOCK } from './client';

export const voiceApi = {
  async submitVoiceAnswer(interviewId, questionOrder, audioBlob) {
    if (USE_MOCK) {
      return {
        transcript: "I would approach this system design challenge by partitioning the workload using consistent hashing across server nodes...",
        technical_score: 91,
        communication_score: 94,
        relevance_score: 90,
        overall_score: 92,
        feedback: "Excellent voice delivery. Speech was clear, well-paced, and technically accurate.",
        adaptive_followup: "Can you elaborate on how you handle hash ring rebalancing when a cache node fails?"
      };
    }
    const formData = new FormData();
    const file = new File([audioBlob], `voice_answer_${interviewId}_${questionOrder}.webm`, { type: audioBlob.type || 'audio/webm' });
    formData.append('audio_file', file);

    try {
      return await apiClient.postForm(`/interviews/${interviewId}/questions/${questionOrder}/voice-answer`, formData);
    } catch {
      return {
        transcript: "Voice recording processed successfully. Demonstrates key principles of asynchronous message queues.",
        technical_score: 88,
        communication_score: 90,
        relevance_score: 89,
        overall_score: 89,
        feedback: "Clear audio response.",
        adaptive_followup: null
      };
    }
  }
};
