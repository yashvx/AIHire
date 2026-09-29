import { apiClient, USE_MOCK } from './client';
import { MOCK_RESUMES, MOCK_RESUME_ANALYSIS } from '../data/mockData';

export const resumeApi = {
  async uploadResume(file) {
    if (USE_MOCK) {
      const newResume = {
        id: Date.now(),
        filename: file.name,
        created_at: new Date().toISOString(),
        status: "analyzed"
      };
      return newResume;
    }
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.postForm('/upload-resume', formData);
  },

  async getResumes() {
    if (USE_MOCK) {
      return MOCK_RESUMES;
    }
    try {
      return await apiClient.get('/resumes');
    } catch {
      return MOCK_RESUMES;
    }
  },

  async getResumeDetail(resumeId) {
    if (USE_MOCK) {
      return MOCK_RESUMES.find(r => r.id === Number(resumeId)) || MOCK_RESUMES[0];
    }
    try {
      return await apiClient.get(`/resume/${resumeId}`);
    } catch {
      return MOCK_RESUMES[0];
    }
  },

  async getResumeAnalysis(resumeId) {
    if (USE_MOCK) {
      return { ...MOCK_RESUME_ANALYSIS, resume_id: Number(resumeId) };
    }
    try {
      return await apiClient.get(`/resume/${resumeId}/analysis`);
    } catch {
      return { ...MOCK_RESUME_ANALYSIS, resume_id: Number(resumeId) };
    }
  }
};
