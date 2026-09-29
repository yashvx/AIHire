import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resumeApi } from '../api/resumeApi';
import { interviewApi } from '../api/interviewApi';
import { useToast } from '../context/ToastContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Building2, Briefcase, Layers, FileText, ArrowRight, Play, Sparkles } from 'lucide-react';

export default function InterviewNew() {
  const [searchParams] = useSearchParams();
  const initialResumeId = searchParams.get('resume_id') || '';

  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(initialResumeId);
  const [company, setCompany] = useState('Google');
  const [role, setRole] = useState('Backend Engineer');
  const [interviewType, setInterviewType] = useState('Technical');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function fetchResumes() {
      try {
        const list = await resumeApi.getResumes();
        setResumes(list || []);
        if (list?.length && !selectedResumeId) {
          setSelectedResumeId(String(list[0].id));
        }
      } catch (err) {
        console.warn('Failed to load resumes for setup:', err);
      }
    }
    fetchResumes();
  }, []);

  const handleCreateAndStart = async (e) => {
    e.preventDefault();
    if (!selectedResumeId) {
      toast.error('Please upload or select a resume first.');
      navigate('/resume');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create interview session
      const created = await interviewApi.createInterview({
        resume_id: Number(selectedResumeId),
        company,
        role,
        interview_type: interviewType
      });

      // 2. Start interview session
      await interviewApi.startInterview(created.id);

      // 3. Generate questions
      await interviewApi.generateQuestions({
        interview_id: created.id,
        company,
        role,
        interview_type: interviewType
      });

      toast.success('Interview session initialized successfully!');
      navigate(`/interview/${created.id}/session`);
    } catch (err) {
      toast.error(err.message || 'Failed to initialize interview session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <Badge variant="lime" style={{ marginBottom: '8px' }}>
          <Sparkles size={12} style={{ marginRight: '4px' }} /> AI Session Generator
        </Badge>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Configure Your Interview Simulation
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
          Customize company culture, technical role depth, and interview mode to match your target interview.
        </p>
      </div>

      <Card>
        <form onSubmit={handleCreateAndStart} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Select Resume */}
          <Select
            label="Selected Candidate Resume"
            value={selectedResumeId}
            onChange={(e) => setSelectedResumeId(e.target.value)}
            options={
              resumes.length
                ? resumes.map((r) => ({ value: String(r.id), label: `${r.filename} (#${r.id})` }))
                : [{ value: '', label: 'No resume found (Upload PDF first)' }]
            }
          />

          {/* Company */}
          <Input
            label="Target Company"
            placeholder="e.g. Google, Amazon, Stripe, Meta, Startup"
            icon={Building2}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          {/* Role */}
          <Input
            label="Target Role"
            placeholder="e.g. Senior Backend Engineer, Systems Architect"
            icon={Briefcase}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />

          {/* Interview Type */}
          <Select
            label="Interview Focus Mode"
            value={interviewType}
            onChange={(e) => setInterviewType(e.target.value)}
            options={[
              { value: 'Technical', label: 'Technical (System design, architecture, algorithms)' },
              { value: 'HR', label: 'HR / Cultural Fit (Career goals, background)' },
              { value: 'Behavioral', label: 'Behavioral (STAR technique, leadership principles)' },
              { value: 'Mixed', label: 'Mixed Comprehensive (Technical + Behavioral)' },
            ]}
          />

          {/* Session Preview Card */}
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '13px', color: '#65a30d', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', fontWeight: 700 }}>
              SESSION PREVIEW SUMMARY
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>
              <div><span style={{ color: '#64748b', fontWeight: 400 }}>Company:</span> {company}</div>
              <div><span style={{ color: '#64748b', fontWeight: 400 }}>Target Role:</span> {role}</div>
              <div><span style={{ color: '#64748b', fontWeight: 400 }}>Mode:</span> {interviewType}</div>
              <div><span style={{ color: '#64748b', fontWeight: 400 }}>Resume:</span> #{selectedResumeId || 'None'}</div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            icon={Play}
            style={{ width: '100%' }}
          >
            Start Interview Session
          </Button>
        </form>
      </Card>
    </div>
  );
}
