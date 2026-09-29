import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'danger', 'ghost', 'dark'
  size = 'md', // 'sm', 'md', 'lg'
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  style = {},
  ...props
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
          color: '#0f172a',
          border: 'none',
          fontWeight: 700,
          boxShadow: '0 4px 14px rgba(101, 163, 13, 0.35)',
        };
      case 'secondary':
        return {
          background: '#ffffff',
          color: '#0f172a',
          border: '1px solid #cbd5e1',
          fontWeight: 600,
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
        };
      case 'dark':
        return {
          background: '#0f172a',
          color: '#ffffff',
          border: '1px solid #1e293b',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: '#65a30d',
          border: '1.5px solid #84cc16',
          fontWeight: 600,
        };
      case 'danger':
        return {
          background: '#dc2626',
          color: '#ffffff',
          border: 'none',
          fontWeight: 600,
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#475569',
          border: 'none',
          fontWeight: 500,
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '8px 14px', fontSize: '13px', borderRadius: '8px' };
      case 'lg':
        return { padding: '14px 28px', fontSize: '16px', borderRadius: '10px' };
      case 'md':
      default:
        return { padding: '11px 20px', fontSize: '14px', borderRadius: '9px' };
    }
  };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    outline: 'none',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
      className={className}
      {...props}
    >
      {isLoading ? (
        <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : null}
      {children}
    </button>
  );
}
