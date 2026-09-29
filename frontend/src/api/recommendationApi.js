import { apiClient, USE_MOCK } from './client';
import { MOCK_RECOMMENDATIONS, MOCK_PROGRESS_STATS } from '../data/mockData';

export const recommendationApi = {
  async getRecommendations() {
    if (USE_MOCK) {
      return MOCK_RECOMMENDATIONS;
    }
    try {
      return await apiClient.get('/recommendations');
    } catch {
      return MOCK_RECOMMENDATIONS;
    }
  },

  async getProgressStats() {
    if (USE_MOCK) {
      return MOCK_PROGRESS_STATS;
    }
    try {
      return await apiClient.get('/progress');
    } catch {
      return MOCK_PROGRESS_STATS;
    }
  }
};
