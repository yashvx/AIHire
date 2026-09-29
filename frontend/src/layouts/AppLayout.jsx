import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { MobileNav } from '../components/layout/MobileNav';

const routeTitleMap = {
  '/dashboard': 'Candidate Dashboard',
  '/resume': 'Resume & Skill Profile',
  '/resume/analyze': 'Resume Analysis Details',
  '/interview': 'Interview Sessions',
  '/interview/new': 'New Interview Session',
  '/voice-interview': 'Voice Interview Workspace',
  '/coding': 'Coding & System Design Lab',
  '/recommendations': 'AI Career Guidance',
  '/progress': 'Preparation Progress Analytics',
  '/profile': 'Candidate Profile',
  '/settings': 'Account & Interview Preferences'
};

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#090d16',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#84cc16',
          fontWeight: 600,
          fontSize: '16px',
          gap: '12px'
        }}
      >
        <div style={{ width: '24px', height: '24px', border: '3px solid #84cc16', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <span>Initializing AIHire Workspace...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const title = routeTitleMap[location.pathname] || 'AIHire Workspace';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#090d16' }}>
      {/* Sidebar for Desktop */}
      <div style={{ display: 'flex' }}>
        <Sidebar />
      </div>

      {/* Main Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <MobileNav />
        <Header title={title} />
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
