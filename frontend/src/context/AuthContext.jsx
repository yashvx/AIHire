import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aihire_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('aihire_token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifySession() {
      if (token && !user) {
        try {
          const profile = await authApi.getProfile();
          setUser(profile);
          localStorage.setItem('aihire_user', JSON.stringify(profile));
        } catch (err) {
          console.warn("Session check failed:", err.message);
          logout();
        }
      }
      setIsLoading(false);
    }

    verifySession();

    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    return () => window.removeEventListener('unauthorized', handleUnauthorized);
  }, [token]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await authApi.login({ email, password });
      const accessToken = res.access_token;
      setToken(accessToken);
      localStorage.setItem('aihire_token', accessToken);

      // Fetch user profile after successful token retrieval
      try {
        const profile = await authApi.getProfile();
        setUser(profile);
        localStorage.setItem('aihire_user', JSON.stringify(profile));
        return profile;
      } catch {
        const fallbackUser = { full_name: email.split('@')[0], email };
        setUser(fallbackUser);
        localStorage.setItem('aihire_user', JSON.stringify(fallbackUser));
        return fallbackUser;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({ full_name, email, password, confirm_password }) => {
    setIsLoading(true);
    try {
      await authApi.register({ full_name, email, password, confirm_password });
      return await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('aihire_token');
    localStorage.removeItem('aihire_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
