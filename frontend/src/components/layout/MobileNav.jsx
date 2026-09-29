import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BrainCircuit, LayoutDashboard, FileText, MessageSquare, Mic, Code2, Sparkles, TrendingUp, User, Settings as SettingsIcon } from 'lucide-react';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

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
    <div style={{ display: 'none', '@media (max-width: 1024px)': { display: 'block' } }}>
      <div
        style={{
          height: '56px',
          backgroundColor: '#070a11',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          position: 'sticky',
          top: 0,
          zIndex: 70
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BrainCircuit size={22} color="var(--accent-lime)" />
          <span style={{ fontWeight: 800, fontSize: '16px', color: '#f8fafc' }}>
            AI<span style={{ color: 'var(--accent-lime)' }}>Hire</span>
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', color: '#f8fafc', cursor: 'pointer' }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '56px',
            backgroundColor: '#070a11',
            zIndex: 69,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowY: 'auto'
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#f8fafc' : '#94a3b8',
                  backgroundColor: isActive ? '#111726' : 'transparent',
                  textDecoration: 'none'
                })}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}
