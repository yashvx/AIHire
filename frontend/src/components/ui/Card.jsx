import React from 'react';

export function Card({
  children,
  className = '',
  style = {},
  onClick,
  hoverable = false,
  dark = false,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: dark ? '#111827' : '#ffffff',
        border: `1px solid ${dark ? '#1e293b' : '#e2e8f0'}`,
        borderRadius: '16px',
        padding: '24px',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: onClick || hoverable ? 'pointer' : 'default',
        boxShadow: dark ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'var(--shadow-md)',
        color: dark ? '#f8fafc' : '#0f172a',
        ...style
      }}
      onMouseEnter={(e) => {
        if (hoverable || onClick) {
          e.currentTarget.style.borderColor = dark ? '#334155' : '#cbd5e1';
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = dark
            ? '0 20px 40px rgba(0, 0, 0, 0.6)'
            : 'var(--shadow-lg)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable || onClick) {
          e.currentTarget.style.borderColor = dark ? '#1e293b' : '#e2e8f0';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = dark
            ? '0 10px 30px rgba(0, 0, 0, 0.4)'
            : 'var(--shadow-md)';
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, dark = false, style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', ...style }}>
      <div>
        {title && <h3 style={{ fontSize: '18px', fontWeight: 700, color: dark ? '#f8fafc' : '#0f172a', letterSpacing: '-0.01em' }}>{title}</h3>}
        {subtitle && <p style={{ fontSize: '14px', color: dark ? '#94a3b8' : '#64748b', marginTop: '3px' }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
