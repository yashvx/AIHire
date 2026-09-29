import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { interviewApi } from '../api/interviewApi';
import { useToast } from '../context/ToastContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { ProgressBar, Skeleton } from '../components/ui/ProgressBar';
import { ScoreCard } from '../components/ui/StatCard';
import {
  BrainCircuit,
  Send,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Award,
  AlertCircle,
  Clock,
  RotateCcw,
  CheckSquare
} from 'lucide-react';

export default function InterviewSession() {
  const { id: interviewId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [questionOrder, setQuestionOrder] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerText, setAnswerText] = useState('');
  
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [adaptiveQuestion, setAdaptiveQuestion] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    loadQuestion(questionOrder);
  }, [interviewId, questionOrder]);

  async function loadQuestion(order) {
    setIsLoadingQuestion(true);
    setEvaluation(null);
    setAdaptiveQuestion(null);
    setAnswerText('');

    try {
      const q = await interviewApi.getCurrentQuestion(interviewId, order);
      setCurrentQuestion(q);
      if (q.total_questions) setTotalQuestions(q.total_questions);
    } catch (err) {
      toast.error(err.message || 'Failed to load question.');
    } finally {
      setIsLoadingQuestion(false);
    }
  }

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answerText.trim()) {
      toast.warning('Please enter an answer before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Submit answer and receive score & evaluation
      const res = await interviewApi.submitQuestionAnswer(interviewId, questionOrder, answerText);
      setEvaluation(res);
      toast.success('Answer submitted and evaluated by AI!');

      // 2. Check for adaptive follow-up
      try {
        const adaptiveRes = await interviewApi.getAdaptiveFollowup(interviewId, questionOrder);
        if (adaptiveRes?.has_adaptive && adaptiveRes.question) {
          setAdaptiveQuestion(adaptiveRes.question);
        }
      } catch (err) {
        console.warn('Adaptive check skipped:', err);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to submit answer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = async () => {
    if (questionOrder >= totalQuestions) {
      // Finish interview
      try {
        await interviewApi.completeInterview(interviewId);
        await interviewApi.evaluateInterview(interviewId);
        toast.success('Interview session completed! Generating final report...');
        navigate(`/interview/${interviewId}/report`);
      } catch (err) {
        navigate(`/interview/${interviewId}/report`);
      }
    } else {
      setQuestionOrder(prev => prev + 1);
    }
  };

  if (isLoadingQuestion) {
    return (
      <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Skeleton height="60px" />
        <Skeleton height="220px" />
        <Skeleton height="150px" />
      </div>
    );
  }

  const progressPercentage = Math.round((questionOrder / totalQuestions) * 100);

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Session Progress Header */}
      <Card style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#65a30d' }} className="lime-glow" />
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', letterSpacing: '0.02em' }}>
              ACTIVE INTERVIEW SESSION
            </span>
            <Badge variant="lime">QUESTION {questionOrder} OF {totalQuestions}</Badge>
          </div>

          <Button variant="ghost" size="sm" onClick={() => navigate(`/interview/${interviewId}/report`)}>
            End Session & View Report
          </Button>
        </div>

        <ProgressBar progress={progressPercentage} height={6} />
      </Card>

      {/* Main Question Card */}
      <Card style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Badge variant="info">{currentQuestion?.category || 'Technical System Design'}</Badge>
          <Badge variant="warning">{currentQuestion?.difficulty || 'Medium'}</Badge>
        </div>

        <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: '1.4', marginBottom: '24px', letterSpacing: '-0.01em' }}>
          {currentQuestion?.question || "Walk me through how you would architect a resilient background task processing system with FastAPI and Redis."}
        </h3>

        {/* Adaptive Follow-up Banner */}
        {adaptiveQuestion && (
          <div style={{ background: 'rgba(101, 163, 13, 0.08)', border: '1px solid rgba(101, 163, 13, 0.3)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#65a30d', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
              <Sparkles size={16} /> AI Adaptive Follow-Up Question
            </div>
            <p style={{ fontSize: '15px', color: '#334155', margin: 0, fontWeight: 500, lineHeight: '1.5' }}>
              {adaptiveQuestion}
            </p>
          </div>
        )}

        {/* Answer Input */}
        {!evaluation ? (
          <form onSubmit={handleSubmitAnswer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Textarea
              label="Your Response"
              rows={6}
              placeholder="Structure your answer clearly. Explain trade-offs, architecture choices, and concrete technical primitives..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              disabled={isSubmitting}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                {answerText.trim().split(/\s+/).filter(Boolean).length} words • {answerText.length} characters
              </span>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                icon={Send}
              >
                Submit Answer for AI Evaluation
              </Button>
            </div>
          </form>
        ) : (
          /* Evaluation Display */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '12px' }}>
            <div style={{ background: 'rgba(22, 163, 74, 0.08)', border: '1px solid rgba(22, 163, 74, 0.3)', padding: '20px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontWeight: 800, fontSize: '15px', marginBottom: '8px' }}>
                <CheckCircle2 size={18} /> Answer Submitted & Evaluated
              </div>
              <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                "{answerText}"
              </p>
            </div>

            {/* Scores Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <ScoreCard title="Technical Depth" score={evaluation.technical_score || 90} size="sm" />
              <ScoreCard title="Communication" score={evaluation.communication_score || 88} size="sm" />
              <ScoreCard title="Relevance" score={evaluation.relevance_score || 92} size="sm" />
            </div>

            {/* AI Feedback */}
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#65a30d', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                AI Feedback & Insights
              </h4>
              <p style={{ fontSize: '15px', color: '#0f172a', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>
                {evaluation.feedback || "Excellent answer with strong technical primitives and clear architectural focus."}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                onClick={handleNextQuestion}
              >
                {questionOrder >= totalQuestions ? 'Complete Interview & View Report' : 'Next Question'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
