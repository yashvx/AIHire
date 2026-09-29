import React from 'react';
import { Card } from './Card';

export function StatCard({ label, value, icon: Icon, trend, color = 'lime' }) {
  const getColorHex = () => {
    switch (color) {
      case 'lime': return '#84cc16';
      case 'blue': return '#3b82f6';
      case 'purple': return '#a855f7';
      case 'emerald': return '#10b981';
      default: return '#84cc16';
    }
  };

  const colorHex = getColorHex();

  return (
    <Card style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>{label}</span>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#f8fafc', marginTop: '6px', letterSpacing: '-0.02em' }}>
            {value}
          </div>
          {trend && (
            <span style={{ fontSize: '12px', color: colorHex, marginTop: '4px', display: 'inline-block' }}>
              {trend}
            </span>
          )}
        </div>
        {Icon && (
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: `rgba(${colorHex === '#84cc16' ? '132, 204, 22' : '59, 130, 246'}, 0.1)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colorHex
            }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>
    </Card>
  );
}

export function ScoreCard({ title, score, maxScore = 100, subtitle, size = 'md' }) {
  const percentage = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));
  const getScoreColor = () => {
    if (percentage >= 80) return '#84cc16';
    if (percentage >= 65) return '#eab308';
    return '#ef4444';
  };

  const strokeColor = getScoreColor();
  const radius = size === 'sm' ? 24 : 36;
  const strokeWidth = size === 'sm' ? 4 : 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#0d1320', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={(radius + strokeWidth) * 2} height={(radius + strokeWidth) * 2}>
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`}
          />
        </svg>
        <span style={{ position: 'absolute', fontSize: size === 'sm' ? '14px' : '18px', fontWeight: 700, color: '#f8fafc' }}>
          {percentage}%
        </span>
      </div>
      <div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#f8fafc' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{subtitle}</div>}
      </div>
    </div>
  );
}
