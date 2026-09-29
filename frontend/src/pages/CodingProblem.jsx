import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { codingApi } from '../api/codingApi';
import { useToast } from '../context/ToastContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/Input';
import { Skeleton } from '../components/ui/ProgressBar';
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  RotateCcw,
  Terminal,
  Lock,
  ChevronLeft
} from 'lucide-react';

export default function CodingProblem() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    async function loadProblem() {
      setIsLoading(true);
      try {
        const prob = await codingApi.getProblemDetail(problemId);
        setProblem(prob);
        if (prob?.starter_code) {
          setCode(prob.starter_code);
        }
      } catch (err) {
        toast.error('Failed to load problem workspace.');
      } finally {
        setIsLoading(false);
      }
    }
    loadProblem();
  }, [problemId]);

  const handleSubmitCode = async () => {
    if (!code.trim()) {
      toast.warning('Please enter code solution.');
      return;
    }

    setIsSubmitting(true);
    setTestResult(null);

    try {
      // 1. Send submission to backend API
      const sub = await codingApi.submitCode({
        problem_id: problemId,
        code,
        language
      });

      // 2. Fetch Docker sandbox evaluation
      const res = await codingApi.evaluateSubmission(sub.submission_id);
      setTestResult(res);
      if (res.passed) {
        toast.success(`All ${res.passed_test_cases}/${res.total_test_cases} test cases passed!`);
      } else {
        toast.error('Some test cases failed.');
      }
    } catch (err) {
      toast.error(err.message || 'Sandbox execution error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        <Skeleton width="40%" height="500px" />
        <Skeleton width="60%" height="500px" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button variant="ghost" size="sm" icon={ChevronLeft} onClick={() => navigate('/coding')}>
          Back to Coding Lab
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Badge variant={problem?.difficulty === 'Easy' ? 'success' : problem?.difficulty === 'Medium' ? 'warning' : 'error'}>
            {problem?.difficulty}
          </Badge>
          <Badge variant="info">{problem?.category}</Badge>
        </div>
      </div>

      {/* Main Workspace Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Left Column: Problem Description */}
        <Card style={{ maxHeight: '720px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            {problem?.title}
          </h2>

          <div style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
            {problem?.description}
          </div>

          {/* Examples */}
          {problem?.examples?.map((ex, idx) => (
            <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#65a30d', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                EXAMPLE {idx + 1}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#0f172a', marginBottom: '6px' }}>
                Input: {ex.input}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#65a30d', marginBottom: '8px', fontWeight: 600 }}>
                Output: {ex.output}
              </div>
              {ex.explanation && (
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  Explanation: {ex.explanation}
                </div>
              )}
            </div>
          ))}

          {/* Constraints */}
          {problem?.constraints && (
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                CONSTRAINTS
              </div>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#334155', margin: 0, whiteSpace: 'pre-wrap' }}>
                {problem.constraints}
              </pre>
            </div>
          )}
        </Card>

        {/* Right Column: Code Editor & Docker Execution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card style={{ padding: '16px' }}>
            {/* Editor Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '160px' }}>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  options={[{ value: 'python', label: 'Python 3.11' }]}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant="secondary" size="sm" icon={RotateCcw} onClick={() => setCode(problem?.starter_code || '')}>
                  Reset
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Play}
                  isLoading={isSubmitting}
                  onClick={handleSubmitCode}
                >
                  Run in Sandbox
                </Button>
              </div>
            </div>

            {/* Code Editor */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              style={{
                width: '100%',
                height: '380px',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                lineHeight: '1.6',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #334155',
                outline: 'none',
                resize: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </Card>

          {/* Bottom Console: Docker Test Results */}
          {testResult && (
            <Card style={{ borderTop: testResult.passed ? '4px solid #16a34a' : '4px solid #ef4444', backgroundColor: '#ffffff', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {testResult.passed ? <CheckCircle2 color="#16a34a" size={20} /> : <XCircle color="#ef4444" size={20} />}
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                    {testResult.passed ? 'Accepted' : 'Wrong Answer'} ({testResult.passed_test_cases}/{testResult.total_test_cases} Test Cases)
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#64748b' }}>
                  <span>Runtime: <strong style={{ color: '#65a30d' }}>{testResult.execution_time}</strong></span>
                </div>
              </div>

              <div style={{ fontSize: '14px', color: '#475569', marginBottom: '16px' }}>
                {testResult.feedback}
              </div>

              {/* Test Cases Detail */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {testResult.test_results?.map((tr, idx) => (
                  <div key={idx} style={{ padding: '10px 16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: tr.passed ? '#16a34a' : '#ef4444', fontWeight: 600 }}>
                      {tr.passed ? '✓' : '✗'} {tr.name}
                    </span>
                    {tr.is_hidden ? (
                      <Badge variant="neutral" size="sm">
                        <Lock size={12} style={{ marginRight: '4px' }} /> Hidden Test Case
                      </Badge>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>Passed</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
