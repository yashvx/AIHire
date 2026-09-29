import React from 'react';

export function ProgressBar({ progress = 0, color = 'var(--accent-lime)', height = 8 }) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  return (
    <div style={{ width: '100%', backgroundColor: '#1e293b', borderRadius: '9999px', height: `${height}px`, overflow: 'hidden' }}>
      <div
        style={{
          width: `${clampedProgress}%`,
          backgroundColor: color,
          height: '100%',
          borderRadius: '9999px',
          transition: 'width 0.3s ease'
        }}
      />
    </div>
  );
}

export function Skeleton({ width = '100%', height = '20px', borderRadius = '6px', style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#162032',
        animation: 'pulse 1.5s ease-in-out infinite',
        ...style
      }}
    />
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {Icon && (
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#162032', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', marginBottom: '16px' }}>
          <Icon size={28} />
        </div>
      )}
      <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#f8fafc', marginBottom: '6px' }}>{title}</h4>
      {description && <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '400px', marginBottom: '20px' }}>{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div style={{ padding: '36px 24px', textAlign: 'center', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
      <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px', fontWeight: 500 }}>
        {message || 'An error occurred while loading data.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: 'transparent',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
