import React from 'react';

export function Input({
  label,
  error,
  icon: Icon,
  type = 'text',
  className = '',
  style = {},
  ...props
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative', width: '100%' }}>
        {Icon && (
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          style={{
            width: '100%',
            padding: Icon ? '10px 14px 10px 38px' : '10px 14px',
            backgroundColor: '#0d1320',
            border: `1px solid ${error ? '#ef4444' : '#1e293b'}`,
            borderRadius: '8px',
            color: '#f8fafc',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.15s ease',
            ...style
          }}
          onFocus={(e) => (e.target.style.borderColor = error ? '#ef4444' : 'var(--accent-lime)')}
          onBlur={(e) => (e.target.style.borderColor = error ? '#ef4444' : '#1e293b')}
          {...props}
        />
      </div>
      {error && <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>}
    </div>
  );
}

export function Select({
  label,
  options = [],
  error,
  style = {},
  ...props
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>
          {label}
        </label>
      )}
      <select
        style={{
          width: '100%',
          padding: '10px 14px',
          backgroundColor: '#0d1320',
          border: `1px solid ${error ? '#ef4444' : '#1e293b'}`,
          borderRadius: '8px',
          color: '#f8fafc',
          fontSize: '14px',
          outline: 'none',
          cursor: 'pointer',
          ...style
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: '#111726', color: '#f8fafc' }}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  rows = 4,
  style = {},
  ...props
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        style={{
          width: '100%',
          padding: '12px 14px',
          backgroundColor: '#0d1320',
          border: `1px solid ${error ? '#ef4444' : '#1e293b'}`,
          borderRadius: '8px',
          color: '#f8fafc',
          fontSize: '14px',
          outline: 'none',
          resize: 'vertical',
          fontFamily: 'inherit',
          ...style
        }}
        onFocus={(e) => (e.target.style.borderColor = error ? '#ef4444' : 'var(--accent-lime)')}
        onBlur={(e) => (e.target.style.borderColor = error ? '#ef4444' : '#1e293b')}
        {...props}
      />
      {error && <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>}
    </div>
  );
}
