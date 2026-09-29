import React, { useState, useEffect } from 'react';
import { recommendationApi } from '../api/recommendationApi';
import { Card, CardHeader } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { ProgressBar, Skeleton } from '../components/ui/ProgressBar';
import { useToast } from '../context/ToastContext';
import { TrendingUp, Award, Code2, Mic, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Progress() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      try {
        const res = await recommendationApi.getProgressStats();
        setStats(res);
      } catch (err) {
        toast.error('Failed to load progress analytics.');
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Skeleton height="120px" />
        <Skeleton height="250px" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Candidate Preparation Analytics
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
          Longitudinal progress tracking across technical system design, voice communication fluency, and coding sandbox performance.
        </p>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCard label="Interviews Completed" value={stats?.interviews_completed || 12} icon={Award} color="lime" />
        <StatCard label="Technical Score Avg" value={`${stats?.technical_score_avg || 89}%`} icon={TrendingUp} color="emerald" />
        <StatCard label="Coding Problems Solved" value={stats?.coding_problems_solved || 18} icon={Code2} color="purple" />
        <StatCard label="Voice Sessions Completed" value={stats?.voice_interviews_completed || 5} icon={Mic} color="blue" />
      </div>

      {/* Historical Score Trajectory Visualizer */}
      <Card style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)' }}>
        <CardHeader title="Historical Score Trajectory (Last 4 Weeks)" subtitle="Progress trend across candidate mock sessions" />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', padding: '24px 12px 12px', height: '220px', borderBottom: '1px solid #e2e8f0' }}>
          {stats?.weekly_trend?.map((item, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#65a30d' }}>{item.score}%</span>
              <div
                style={{
                  width: '100%',
                  maxWidth: '48px',
                  backgroundColor: '#65a30d',
                  borderRadius: '6px 6px 0 0',
                  height: `${(item.score / 100) * 160}px`,
                  transition: 'height 0.4s ease'
                }}
              />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{item.week}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Strengths & Weaknesses Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        <Card style={{ borderTop: '4px solid #65a30d', backgroundColor: '#ffffff', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)' }}>
          <CardHeader title="Strongest Mastered Areas" subtitle="Consistently high scoring technical categories" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {stats?.strongest_areas?.map((item, idx) => (
              <Badge key={idx} variant="lime" size="md">
                <CheckCircle2 size={12} style={{ marginRight: '4px' }} /> {item}
              </Badge>
            ))}
          </div>
        </Card>

        <Card style={{ borderTop: '4px solid #eab308', backgroundColor: '#ffffff', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)' }}>
          <CardHeader title="Weakest Focus Areas" subtitle="Topics requiring additional practice" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {stats?.weakest_areas?.map((item, idx) => (
              <Badge key={idx} variant="warning" size="md">
                <AlertCircle size={12} style={{ marginRight: '4px' }} /> {item}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
