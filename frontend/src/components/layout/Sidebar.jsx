import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Mic,
  Code2,
  Sparkles,
  TrendingUp,
  User,
  Settings as SettingsIcon,
  LogOut,
  BrainCircuit,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Resume', path: '/resume', icon: FileText },
    { label: 'Interviews', path: '/interview', icon: MessageSquare },
    { label: 'Voice Mode', path: '/voice-interview', icon: Mic },
    { label: 'Coding Lab', path: '/coding', icon: Code2 },
    { label: 'AI Guidance', path: '/recommendations', icon: Sparkles },
    { label: 'Progress', path: '/progress', icon: TrendingUp },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <aside
      style={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        zIndex: 60
      }}
    >
      {/* Brand Header */}
      <div
        onClick={() => navigate('/dashboard')}
        style={{
          padding: '22px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f172a',
            boxShadow: '0 4px 10px rgba(101, 163, 13, 0.25)'
          }}
        >
          <BrainCircuit size={20} strokeWidth={2.5} />
        </div>
        <div>
          <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a' }}>
            AI<span style={{ color: '#65a30d' }}>Hire</span>
          </span>
          <span style={{ display: 'block', fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            Candidate Engine
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#0f172a' : '#64748b',
                  backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                  borderLeft: isActive ? '3.5px solid #65a30d' : '3.5px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                })}
              >
                <Icon size={18} color={item.path === window.location.pathname ? '#65a30d' : '#64748b'} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer / Sign Out */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0' }}>
        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            color: '#475569',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            borderRadius: '8px'
          }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
