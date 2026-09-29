import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { codingApi } from '../api/codingApi';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/ProgressBar';
import { useToast } from '../context/ToastContext';
import { Code2, Play, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

export default function CodingLab() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function loadProblems() {
      setIsLoading(true);
      try {
        const list = await codingApi.getProblems();
        setProblems(list || []);
      } catch (err) {
        toast.error('Failed to load coding problems.');
      } finally {
        setIsLoading(false);
      }
    }
    loadProblems();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Coding Lab & Docker Sandbox
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
            Solve data structures and algorithmic challenges. Submissions run inside isolated Docker sandbox containers.
          </p>
        </div>
        <Badge variant="lime">
          <Terminal size={12} style={{ marginRight: '4px' }} /> Python 3.11 Execution Engine
        </Badge>
      </div>

      {/* Problem List */}
      <Card>
        <CardHeader title="Available Coding Problems" subtitle="Select a challenge to launch the IDE workspace" />

        {isLoading ? (
          <Skeleton height="120px" />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {problems.map((prob) => (
              <div
                key={prob.id}
                onClick={() => navigate(`/coding/${prob.id}`)}
                style={{
                  padding: '20px 24px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                    <Code2 size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {prob.title}
                      </h3>
                      <Badge variant={prob.difficulty === 'Easy' ? 'success' : prob.difficulty === 'Medium' ? 'warning' : 'error'}>
                        {prob.difficulty}
                      </Badge>
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                      Category: {prob.category || 'Algorithms'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Button variant="secondary" size="sm" icon={Play}>
                    Solve Problem
                  </Button>
                  <ChevronRight size={18} color="#64748b" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
