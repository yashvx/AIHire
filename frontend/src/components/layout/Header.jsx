import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Search, Bell, LogOut, PlusCircle, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Header({ title = "Overview" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      style={{
        height: '70px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
          {title}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Search */}
        <div style={{ position: 'relative', width: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search interview prep..."
            style={{
              width: '100%',
              padding: '8px 14px 8px 40px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              color: '#0f172a',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>

        {/* Start Interview Quick CTA */}
        <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => navigate('/interview/new')}>
          Start Session
        </Button>

        {/* Notifications */}
        <button
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '9px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Bell size={18} />
        </button>

        {/* User Profile */}
        <div
          onClick={() => navigate('/profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 10px',
            borderRadius: '10px',
            cursor: 'pointer',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a',
              fontWeight: 800,
              fontSize: '14px'
            }}
          >
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'A'}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
            {user?.full_name || 'Alex Vance'}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          title="Sign out"
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '6px'
          }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
