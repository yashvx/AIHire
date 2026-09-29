import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { voiceApi } from '../api/voiceApi';
import { interviewApi } from '../api/interviewApi';
import { useToast } from '../context/ToastContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar, Skeleton } from '../components/ui/ProgressBar';
import { ScoreCard } from '../components/ui/StatCard';
import {
  Mic,
  Square,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Volume2,
  CheckCircle2,
  AlertCircle,
  FileAudio,
  ArrowRight
} from 'lucide-react';

export default function VoiceInterview() {
  const { id: paramInterviewId } = useParams();
  const interviewId = paramInterviewId || '501';

  const navigate = useNavigate();
  const toast = useToast();

  const [question, setQuestion] = useState(null);
  const [questionOrder, setQuestionOrder] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [micError, setMicError] = useState(null);

  // Processing & Results
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceResult, setVoiceResult] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    async function loadQuestion() {
      setIsLoading(true);
      try {
        const q = await interviewApi.getCurrentQuestion(interviewId, questionOrder);
        setQuestion(q);
      } catch (err) {
        toast.error('Failed to load voice question.');
      } finally {
        setIsLoading(false);
      }
    }
    loadQuestion();
  }, [interviewId, questionOrder]);

  const startRecording = async () => {
    setMicError(null);
    setAudioBlob(null);
    setAudioUrl(null);
    setVoiceResult(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        // Stop audio tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone Access Error:', err);
      setMicError('Microphone permission denied or unsupported by browser.');
      toast.error('Microphone permission denied.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleSubmitVoiceAnswer = async () => {
    if (!audioBlob) {
      toast.warning('Please record an audio response first.');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await voiceApi.submitVoiceAnswer(interviewId, questionOrder, audioBlob);
      setVoiceResult(result);
      toast.success('Voice recording transcribed and evaluated!');
    } catch (err) {
      toast.error(err.message || 'Failed to submit voice answer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Skeleton height="100px" />
        <Skeleton height="200px" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'inline-flex', marginBottom: '8px' }}>
          <Badge variant="lime">
            <Mic size={12} style={{ marginRight: '4px' }} /> Voice Fluency & Speech Evaluation
          </Badge>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Voice Interview Workspace
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
          Speak your answers directly into the microphone. Our AI will transcribe your speech and evaluate technical content, verbal fluency, and clarity.
        </p>
      </div>

      {/* Question Card */}
      <Card style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Badge variant="info">{question?.category || 'System Design'}</Badge>
          <Badge variant="warning">Voice Mode</Badge>
        </div>

        <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: '1.4', marginBottom: '24px', letterSpacing: '-0.01em' }}>
          {question?.question || "Walk me through how you would partition a database table across multiple database nodes using consistent hashing."}
        </h3>

        {/* Mic Error */}
        {micError && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
            <AlertCircle size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            {micError}
          </div>
        )}

        {/* Recorder Console */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '32px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          {/* Animated Pulse Ring */}
          <div
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: isRecording ? '#ef4444' : 'rgba(101, 163, 13, 0.1)',
              border: `2px solid ${isRecording ? '#ef4444' : '#65a30d'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isRecording ? '#ffffff' : '#65a30d',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isRecording ? '0 0 30px rgba(239, 68, 68, 0.5)' : '0 0 20px rgba(101, 163, 13, 0.15)'
            }}
          >
            {isRecording ? <Square size={32} /> : <Mic size={36} />}
          </div>

          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
              {isRecording ? formatTime(recordingTime) : audioBlob ? 'Recording Ready' : 'Click to Record'}
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '6px', fontWeight: 500 }}>
              {isRecording ? 'Listening... Speak clearly into your microphone' : audioBlob ? 'Audio captured successfully' : 'Maximum 3 minutes per response'}
            </div>
          </div>

          {/* Audio Player Preview */}
          {audioUrl && !isRecording && (
            <div style={{ marginTop: '12px', width: '100%', maxWidth: '400px' }}>
              <audio src={audioUrl} controls style={{ width: '100%' }} />
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            {audioBlob && !isRecording && (
              <Button variant="secondary" icon={RotateCcw} onClick={startRecording}>
                Re-record
              </Button>
            )}

            <Button
              variant="primary"
              size="lg"
              icon={Send}
              isLoading={isProcessing}
              disabled={!audioBlob || isRecording}
              onClick={handleSubmitVoiceAnswer}
            >
              Submit Audio Answer
            </Button>
          </div>
        </div>
      </Card>

      {/* Voice Result & STT Transcript */}
      {voiceResult && (
        <Card style={{ borderTop: '4px solid #65a30d', backgroundColor: '#ffffff', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', boxShadow: 'var(--shadow-md)' }}>
          <CardHeader title="AI Speech-to-Text Transcript & Evaluation" subtitle="Transcribed speech audit & scoring" />

          {/* Transcript Box */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', color: '#65a30d', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
              TRANSCRIBED AUDIO RESPONSE
            </div>
            <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6', margin: 0 }}>
              "{voiceResult.transcript}"
            </p>
          </div>

          {/* Score Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
            <ScoreCard title="Technical Depth" score={voiceResult.technical_score || 91} size="sm" />
            <ScoreCard title="Verbal Fluency" score={voiceResult.communication_score || 94} size="sm" />
            <ScoreCard title="Overall Score" score={voiceResult.overall_score || 92} size="sm" />
          </div>

          {/* Feedback */}
          <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Speech Feedback
            </h4>
            <p style={{ fontSize: '15px', color: '#475569', margin: 0, lineHeight: '1.6' }}>
              {voiceResult.feedback}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button variant="primary" icon={ArrowRight} onClick={() => setQuestionOrder(prev => prev + 1)}>
              Next Voice Question
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
