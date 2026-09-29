import React from 'react';

export function Badge({ children, variant = 'neutral', size = 'md', style = {} }) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'lime':
        return { background: 'rgba(132, 204, 22, 0.15)', color: '#4d7c0f', border: '1px solid rgba(132, 204, 22, 0.4)' };
      case 'dark-lime':
        return { background: 'rgba(132, 204, 22, 0.15)', color: '#84cc16', border: '1px solid rgba(132, 204, 22, 0.3)' };
      case 'success':
        return { background: 'rgba(22, 163, 74, 0.1)', color: '#15803d', border: '1px solid rgba(22, 163, 74, 0.25)' };
      case 'warning':
        return { background: 'rgba(217, 119, 6, 0.1)', color: '#b45309', border: '1px solid rgba(217, 119, 6, 0.25)' };
      case 'error':
        return { background: 'rgba(220, 38, 38, 0.1)', color: '#b91c1c', border: '1px solid rgba(220, 38, 38, 0.25)' };
      case 'info':
        return { background: 'rgba(37, 99, 235, 0.1)', color: '#1d4ed8', border: '1px solid rgba(37, 99, 235, 0.25)' };
      case 'neutral':
      default:
        return { background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0' };
    }
  };

  const padding = size === 'sm' ? '3px 8px' : '5px 12px';
  const fontSize = size === 'sm' ? '11px' : '12px';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding,
        fontSize,
        fontWeight: 700,
        borderRadius: '9999px',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        ...getVariantStyles(),
        ...style
      }}
    >
      {children}
    </span>
  );
}
