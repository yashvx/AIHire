import { apiClient, USE_MOCK } from './client';
import { MOCK_USER } from '../data/mockData';

export const authApi = {
  async register({ full_name, email, password, confirm_password }) {
    if (USE_MOCK) {
      return { message: "User registered successfully", user: { ...MOCK_USER, full_name, email } };
    }
    return apiClient.post('/register', { full_name, email, password, confirm_password });
  },

  async login({ email, password }) {
    if (USE_MOCK) {
      return { access_token: "mock_jwt_token_12345", token_type: "bearer" };
    }
    // FastAPI OAuth2PasswordRequestForm expects form-urlencoded body with username & password
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const token = localStorage.getItem('aihire_token');
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.detail || 'Invalid login credentials');
    }
    return data;
  },

  async getProfile() {
    if (USE_MOCK) {
      return MOCK_USER;
    }
    return apiClient.get('/profile');
  }
};
