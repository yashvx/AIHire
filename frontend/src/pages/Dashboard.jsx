import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { StatCard, ScoreCard } from '../components/ui/StatCard';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/ProgressBar';
import { interviewApi } from '../api/interviewApi';
import { recommendationApi } from '../api/recommendationApi';
import {
  MessageSquare,
  Mic,
  Code2,
  FileText,
  PlusCircle,
  Sparkles,
  TrendingUp,
  Award,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true);
      try {
        const [intRes, recRes] = await Promise.all([
          interviewApi.getInterviews(),
          recommendationApi.getRecommendations()
        ]);
        setInterviews(intRes || []);
        setRecommendations(recRes?.recommendations || []);
      } catch (err) {
        console.warn("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const completedInterviews = interviews.filter(i => i.status === 'completed');
  const avgScore = completedInterviews.length
    ? Math.round(completedInterviews.reduce((acc, curr) => acc + (curr.score || 85), 0) / completedInterviews.length)
    : 88;

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Skeleton height="120px" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Skeleton height="120px" />
          <Skeleton height="120px" />
          <Skeleton height="120px" />
        </div>
      </div>
    );
  }

  const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'Candidate';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1200px' }}>
      {/* Welcoming Dashboard Hero */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', marginBottom: '8px' }}>
            <Badge variant="lime">Candidate Command Center</Badge>
          </div>
          <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Good day, {firstName} 👋
          </h2>
          <p style={{ fontSize: '16px', color: '#475569', margin: 0, fontWeight: 500 }}>
            Your interview readiness score is currently at <strong style={{ color: '#65a30d' }}>{avgScore}%</strong>. Ready for your next practice session?
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" icon={PlusCircle} onClick={() => navigate('/interview/new')}>
            Start Interview
          </Button>
          <Button variant="secondary" size="lg" icon={FileText} onClick={() => navigate('/resume')}>
            Analyze Resume
          </Button>
        </div>
      </div>

      {/* Primary Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <StatCard label="Overall Readiness" value={`${avgScore}%`} trend="↑ Top 10% candidate" icon={Award} color="lime" />
        <StatCard label="Technical Depth" value="90%" trend="System Design Strong" icon={TrendingUp} color="emerald" />
        <StatCard label="Verbal Communication" value="86%" trend="Speech clarity 94%" icon={Mic} color="blue" />
        <StatCard label="Completed Sessions" value={completedInterviews.length || 3} trend="3 active in progress" icon={MessageSquare} color="purple" />
      </div>

      {/* Action-Oriented Practice Hub */}
      <Card>
        <CardHeader title="Action-Oriented Practice Hub" subtitle="Launch a targeted session to raise your readiness rating" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { title: 'Technical Interview', desc: 'System design, APIs, & architecture', icon: MessageSquare, route: '/interview/new', color: '#65a30d' },
            { title: 'Voice Mode', desc: 'Realtime speech & fluency evaluation', icon: Mic, route: '/voice-interview', color: '#2563eb' },
            { title: 'Coding Lab Sandbox', desc: 'Docker sandbox python problems', icon: Code2, route: '/coding', color: '#9333ea' },
            { title: 'Resume Insights', desc: 'Skill matrix & gap extraction', icon: FileText, route: '/resume', color: '#16a34a' },
          ].map((action, idx) => {
            const Icon = action.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(action.route)}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${action.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: action.color, marginBottom: '14px' }}>
                  <Icon size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{action.title}</h4>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>{action.desc}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Grid: Recent Activity & AI Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Recent Interviews */}
        <Card>
          <CardHeader
            title="Recent Interview Simulations"
            subtitle="Past candidate evaluation logs"
            action={
              <Button variant="ghost" size="sm" onClick={() => navigate('/interview')}>
                View All <ChevronRight size={14} />
              </Button>
            }
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {interviews.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(item.status === 'completed' ? `/interview/${item.id}/report` : `/interview/${item.id}/session`)}
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
              >
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                    {item.company} — {item.role || 'Backend Engineer'}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                    {item.interview_type} Mode • {new Date(item.created_at || Date.now()).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.score !== null && item.score !== undefined ? (
                    <Badge variant={item.score >= 80 ? 'lime' : 'warning'}>{item.score}%</Badge>
                  ) : (
                    <Badge variant="info">In Progress</Badge>
                  )}
                  <ChevronRight size={16} color="#94a3b8" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths & Focus Areas */}
        <Card>
          <CardHeader title="AI Preparation Insights" subtitle="Areas of excellence & priority focus" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(101, 163, 13, 0.08)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #65a30d' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#65a30d', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                <CheckCircle2 size={18} /> Mastered Technical Strengths
              </div>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', margin: 0 }}>
                Distributed Caching (Redis token bucket), PostgreSQL zero-downtime schema evolution, and FastAPI backend architecture.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(217, 119, 6, 0.08)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #d97706' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                <AlertCircle size={18} /> Priority Focus Area
              </div>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', margin: 0 }}>
                Practice discussing multi-region replication tradeoffs and CAP theorem nuances under network partition failures.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
