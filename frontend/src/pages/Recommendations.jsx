import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recommendationApi } from '../api/recommendationApi';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/ProgressBar';
import { useToast } from '../context/ToastContext';
import { Sparkles, ArrowRight, Target, Lightbulb, AlertTriangle } from 'lucide-react';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function loadRecs() {
      setIsLoading(true);
      try {
        const res = await recommendationApi.getRecommendations();
        setRecommendations(res?.recommendations || []);
      } catch (err) {
        toast.error('Failed to load recommendations.');
      } finally {
        setIsLoading(false);
      }
    }
    loadRecs();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ display: 'inline-flex', marginBottom: '8px' }}>
          <Badge variant="lime">
            <Sparkles size={12} style={{ marginRight: '4px' }} /> AI Career Guidance Engine
          </Badge>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Personalized Preparation Recommendations
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
          Tailored action items generated from your recent interview evaluations, resume gaps, and coding submissions.
        </p>
      </div>

      <Card>
        <CardHeader title="Priority Action Plan" subtitle="Targeted exercises to maximize your readiness score" />

        {isLoading ? (
          <Skeleton height="140px" />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recommendations.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Badge variant={item.priority === 'High' ? 'error' : item.priority === 'Medium' ? 'warning' : 'info'}>
                      {item.priority} Priority
                    </Badge>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#65a30d', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{item.area}</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    {item.recommendation}
                  </h3>

                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                    <strong style={{ color: '#475569' }}>Rationale:</strong> {item.reason}
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  onClick={() => navigate('/interview/new')}
                >
                  {item.practice_action || 'Practice Area'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
