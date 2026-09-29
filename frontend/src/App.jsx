import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Resume from './pages/Resume';
import ResumeAnalyze from './pages/ResumeAnalyze';
import InterviewList from './pages/InterviewList';
import InterviewNew from './pages/InterviewNew';
import InterviewSession from './pages/InterviewSession';
import InterviewReport from './pages/InterviewReport';
import VoiceInterview from './pages/VoiceInterview';
import CodingLab from './pages/CodingLab';
import CodingProblem from './pages/CodingProblem';
import Recommendations from './pages/Recommendations';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Authentication Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Main Application Shell (Protected Routes) */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/resume/analyze" element={<ResumeAnalyze />} />
            <Route path="/interview" element={<InterviewList />} />
            <Route path="/interview/new" element={<InterviewNew />} />
            <Route path="/interview/:id" element={<InterviewSession />} />
            <Route path="/interview/:id/session" element={<InterviewSession />} />
            <Route path="/interview/:id/report" element={<InterviewReport />} />
            <Route path="/voice-interview" element={<VoiceInterview />} />
            <Route path="/voice-interview/:id" element={<VoiceInterview />} />
            <Route path="/coding" element={<CodingLab />} />
            <Route path="/coding/:problemId" element={<CodingProblem />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
