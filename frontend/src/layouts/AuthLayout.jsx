import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BrainCircuit } from 'lucide-react';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#070a11',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative'
      }}
    >
      {/* Background Subtle Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(132, 204, 22, 0.08) 0%, rgba(9, 13, 22, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--accent-lime)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#090d16',
              marginBottom: '12px'
            }}
          >
            <BrainCircuit size={28} strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px 0' }}>
            AI<span style={{ color: 'var(--accent-lime)' }}>Hire</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            Portfolio-grade AI Interview & Career Platform
          </p>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
