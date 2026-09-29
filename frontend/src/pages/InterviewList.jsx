import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewApi } from '../api/interviewApi';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/ProgressBar';
import { useToast } from '../context/ToastContext';
import { PlusCircle, MessageSquare, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function InterviewList() {
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function loadInterviews() {
      setIsLoading(true);
      try {
        const data = await interviewApi.getInterviews();
        setInterviews(data || []);
      } catch (err) {
        toast.error(err.message || 'Failed to load interviews.');
      } finally {
        setIsLoading(false);
      }
    }

    loadInterviews();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Interview Practice Sessions
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
            Review your past interview simulations or start a new targeted session.
          </p>
        </div>
        <Button variant="primary" icon={PlusCircle} onClick={() => navigate('/interview/new')}>
          Start New Interview
        </Button>
      </div>

      <Card>
        <CardHeader title="All Practice Sessions" subtitle="Filterable historical record of candidate evaluations" />

        {isLoading ? (
          <Skeleton height="120px" />
        ) : interviews.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No interview sessions created"
            description="Create your first AI interview session to get company and role specific questions."
            action={
              <Button variant="primary" icon={PlusCircle} onClick={() => navigate('/interview/new')}>
                Start First Interview
              </Button>
            }
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {interviews.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '20px 24px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      {item.company} — {item.role || 'Backend Engineer'}
                    </h3>
                    <Badge variant={item.interview_type === 'Technical' ? 'lime' : 'info'}>
                      {item.interview_type}
                    </Badge>
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                    Created on {new Date(item.created_at || Date.now()).toLocaleDateString()} • Session #{item.id}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {item.status === 'completed' ? (
                    <>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>FINAL SCORE</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#65a30d' }}>{item.score || 88}%</div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={ArrowRight}
                        onClick={() => navigate(`/interview/${item.id}/report`)}
                      >
                        View Report
                      </Button>
                    </>
                  ) : (
                    <>
                      <Badge variant="warning">In Progress</Badge>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Play}
                        onClick={() => navigate(`/interview/${item.id}/session`)}
                      >
                        Continue Session
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
