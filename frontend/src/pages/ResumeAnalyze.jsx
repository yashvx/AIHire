import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resumeApi } from '../api/resumeApi';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/ProgressBar';
import { useToast } from '../context/ToastContext';
import {
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  User,
  Mail,
  Phone
} from 'lucide-react';

export default function ResumeAnalyze() {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id') || '101';
  const navigate = useNavigate();
  const toast = useToast();

  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAnalysis() {
      setIsLoading(true);
      try {
        const data = await resumeApi.getResumeAnalysis(resumeId);
        setAnalysis(data);
      } catch (err) {
        toast.error(err.message || 'Failed to load analysis.');
      } finally {
        setIsLoading(false);
      }
    }

    loadAnalysis();
  }, [resumeId]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Skeleton height="140px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <Card>
        <p style={{ color: '#ef4444' }}>Unable to load analysis for this resume.</p>
        <Button variant="secondary" onClick={() => navigate('/resume')} style={{ marginTop: '12px' }}>
          Back to Resumes
        </Button>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Overview Header */}
      <Card style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Badge variant="lime">Parsed PDF Analysis</Badge>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Resume ID: #{analysis.resume_id}</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
              {analysis.name || 'Candidate Profile'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#475569', flexWrap: 'wrap', fontWeight: 500 }}>
              {analysis.email && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={16} color="#64748b" /> {analysis.email}
                </span>
              )}
              {analysis.phone && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={16} color="#64748b" /> {analysis.phone}
                </span>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            onClick={() => navigate(`/interview/new?resume_id=${analysis.resume_id}`)}
          >
            Start Interview With This Resume
          </Button>
        </div>
      </Card>

      {/* Skills Matrix */}
      <Card>
        <CardHeader title="Extracted Core Skills" subtitle="Technologies and frameworks identified in your profile" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {analysis.skills?.map((skill, idx) => (
            <Badge key={idx} variant="info" size="md">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Grid: Experience & Projects */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Experience */}
        <Card>
          <CardHeader title="Professional Experience" subtitle="Work history highlights" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analysis.experience?.map((exp, idx) => (
              <div key={idx} style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 700, marginBottom: '6px' }}>
                  <Briefcase size={18} color="#65a30d" /> Position {idx + 1}
                </div>
                {exp}
              </div>
            ))}
          </div>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader title="Technical Projects" subtitle="Key builds & open source work" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analysis.projects?.map((proj, idx) => (
              <div key={idx} style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 700, marginBottom: '6px' }}>
                  <Code2 size={18} color="#2563eb" /> Project {idx + 1}
                </div>
                {proj}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Grid: Strengths & Potential Gaps */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        <Card style={{ borderLeft: '4px solid #65a30d', backgroundColor: '#ffffff' }}>
          <CardHeader title="Profile Strengths" subtitle="Key advantages for engineering roles" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analysis.strengths?.map((str, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#334155', lineHeight: '1.5' }}>
                <CheckCircle2 size={18} color="#65a30d" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{str}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ borderLeft: '4px solid #d97706', backgroundColor: '#ffffff' }}>
          <CardHeader title="Potential Skill Gaps" subtitle="Areas to reinforce during interview prep" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analysis.gaps?.map((gap, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#334155', lineHeight: '1.5' }}>
                <AlertTriangle size={18} color="#d97706" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{gap}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
