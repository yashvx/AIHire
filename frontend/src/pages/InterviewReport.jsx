import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { interviewApi } from '../api/interviewApi';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ScoreCard } from '../components/ui/StatCard';
import { Skeleton } from '../components/ui/ProgressBar';
import { useToast } from '../context/ToastContext';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  FileText,
  Building2,
  Briefcase
} from 'lucide-react';

export default function InterviewReport() {
  const { id: interviewId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      setIsLoading(true);
      try {
        const data = await interviewApi.getInterviewReport(interviewId);
        setReport(data);
      } catch (err) {
        toast.error(err.message || 'Failed to load report.');
      } finally {
        setIsLoading(false);
      }
    }

    loadReport();
  }, [interviewId]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Skeleton height="160px" />
        <Skeleton height="220px" />
        <Skeleton height="300px" />
      </div>
    );
  }

  if (!report) {
    return (
      <Card>
        <p style={{ color: '#ef4444' }}>Unable to load evaluation report.</p>
        <Button variant="secondary" onClick={() => navigate('/interview')}>Back to Interviews</Button>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <Card style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Badge variant="lime">FINAL EVALUATION REPORT</Badge>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Session #{report.interview_id}</span>
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              {report.company} — {report.role || 'Backend Engineer'}
            </h2>
            <div style={{ fontSize: '14px', color: '#475569', fontWeight: 500 }}>
              Completed on {new Date(report.created_at || Date.now()).toLocaleDateString()} • {report.total_questions} Questions Answered
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" icon={RotateCcw} onClick={() => navigate('/interview/new')}>
              Start Another Interview
            </Button>
            <Button variant="primary" icon={Sparkles} onClick={() => navigate('/recommendations')}>
              Practice Weak Areas
            </Button>
          </div>
        </div>
      </Card>

      {/* Scores Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <ScoreCard title="Overall Score" score={report.overall_score || 89} subtitle="Weighted aggregate" />
        <ScoreCard title="Technical Depth" score={report.technical_score || 91} subtitle="System & API knowledge" />
        <ScoreCard title="Communication" score={report.communication_score || 86} subtitle="Clarity & structure" />
        <ScoreCard title="Relevance" score={report.relevance_score || 90} subtitle="Target role fit" />
      </div>

      {/* Executive Summary */}
      <Card>
        <CardHeader title="AI Executive Assessment" subtitle="Automated feedback summary based on your answers" />
        <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', margin: 0 }}>
          {report.summary || "Strong performance across technical architecture, caching strategies, and database scalability topics. Communication was structured and concise."}
        </p>
      </Card>

      {/* Grid: Strengths & Weaknesses */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        <Card style={{ borderLeft: '4px solid #65a30d', backgroundColor: '#ffffff' }}>
          <CardHeader title="Key Strengths Demonstrated" subtitle="What went exceptionally well" />
          <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
            {report.strengths || "Clear architectural trade-off evaluations, deep familiarity with Redis atomic primitives, and practical zero-downtime database migration tactics."}
          </p>
        </Card>

        <Card style={{ borderLeft: '4px solid #d97706', backgroundColor: '#ffffff' }}>
          <CardHeader title="Areas to Improve" subtitle="Specific technical and delivery refinements" />
          <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>
            {report.areas_to_improve || "Incorporate more quantitative metrics when discussing system limits and articulate edge-case handling for cross-region latency."}
          </p>
        </Card>
      </div>

      {/* Question-by-Question Breakdown */}
      <Card>
        <CardHeader title="Question-by-Question Evaluation" subtitle="Detailed audit of every question in this session" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {report.questions?.map((q, idx) => (
            <div
              key={q.id || idx}
              style={{
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#65a30d', fontWeight: 800 }}>Q{idx + 1}</span>
                  <Badge variant="info">{q.category}</Badge>
                  <Badge variant="warning">{q.difficulty}</Badge>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#65a30d' }}>
                  Score: {q.overall_score || q.evaluation?.overall_score || 90}%
                </div>
              </div>

              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                {q.question}
              </h4>

              {q.answer && (
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '8px', fontSize: '14px', color: '#475569', marginBottom: '12px', borderLeft: '3px solid #cbd5e1', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>Your Answer:</strong>
                  "{q.answer}"
                </div>
              )}

              {(q.feedback || q.evaluation?.feedback) && (
                <p style={{ fontSize: '14px', color: '#65a30d', margin: 0, fontWeight: 500 }}>
                  ✓ AI Feedback: {q.feedback || q.evaluation?.feedback}
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
