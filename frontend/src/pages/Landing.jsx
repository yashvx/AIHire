import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  FileText,
  Mic,
  Code2,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Zap,
  Terminal,
  Layers,
  ChevronRight,
  Play,
  Award,
  Cpu,
  RefreshCw,
  Lock,
  Globe,
  Sliders
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export default function Landing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('technical');

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Polished Modern Navbar */}
      <nav
        style={{
          height: '76px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1240px',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f172a',
                boxShadow: '0 4px 12px rgba(101, 163, 13, 0.3)'
              }}
            >
              <BrainCircuit size={22} strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a' }}>
              AI<span style={{ color: '#65a30d' }}>Hire</span>
            </span>
          </div>

          {/* Links (Desktop) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a href="#how-it-works" style={{ color: '#475569', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
              How it works
            </a>
            <a href="#interview-modes" style={{ color: '#475569', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
              Interview Modes
            </a>
            <a href="#ai-adaptation" style={{ color: '#475569', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
              AI Adaptation
            </a>
            <a href="#features" style={{ color: '#475569', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
              Features
            </a>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => navigate('/login')}
              style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              Sign In
            </button>
            <Button variant="primary" size="md" onClick={() => navigate('/register')} icon={ArrowRight}>
              Start Preparing
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '72px 24px 80px', textAlign: 'center', maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
        {/* Subtle Background Glow */}
        <div
          style={{
            position: 'absolute',
            top: '0%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(132, 204, 22, 0.15) 0%, rgba(248, 250, 252, 0) 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', marginBottom: '20px' }}>
            <Badge variant="lime" size="md">
              <Sparkles size={13} style={{ marginRight: '6px' }} /> AI-Powered Interview Preparation
            </Badge>
          </div>

          <h1
            style={{
              fontSize: '58px',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: '1.1',
              color: '#0f172a',
              marginBottom: '24px',
              maxWidth: '900px',
              margin: '0 auto 24px'
            }}
          >
            Practice like it's the <br />
            <span style={{ background: 'linear-gradient(135deg, #65a30d 0%, #16a34a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              real interview.
            </span>
          </h1>

          <p style={{ fontSize: '19px', color: '#475569', maxWidth: '720px', margin: '0 auto 36px', lineHeight: '1.6', fontWeight: 500 }}>
            Personalized technical, behavioral, voice, and coding interviews powered by your resume, target role, and real-time performance.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '64px', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" onClick={() => navigate('/register')} icon={ArrowRight}>
              Start Preparing Free
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
              See How It Works
            </Button>
          </div>

          {/* Hero Visual Anchor: Realistic Application Browser Window */}
          <div style={{ position: 'relative', maxWidth: '1040px', margin: '0 auto' }}>
            {/* Floating Pills */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-15px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '9999px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.12)',
                fontSize: '13px',
                fontWeight: 700,
                color: '#0f172a',
                zIndex: 20
              }}
            >
              <CheckCircle2 size={16} color="#65a30d" /> Resume Matched ✓
            </div>

            <div
              className="animate-float"
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '-20px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                fontSize: '13px',
                fontWeight: 600,
                color: '#f8fafc',
                zIndex: 20
              }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(132, 204, 22, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#84cc16' }}>
                <Sparkles size={18} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '11px', color: '#84cc16', fontWeight: 700 }}>AI ADAPTIVE FOLLOW-UP</div>
                <div>Hash ring rebalancing strategy</div>
              </div>
            </div>

            {/* Browser Frame */}
            <div
              style={{
                borderRadius: '20px',
                border: '1px solid #1e293b',
                backgroundColor: '#0b0f19',
                boxShadow: 'var(--shadow-dark)',
                overflow: 'hidden',
                textAlign: 'left'
              }}
            >
              {/* Window Header */}
              <div style={{ height: '44px', backgroundColor: '#111827', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '12px', fontFamily: 'var(--font-mono)' }}>
                  aihire.app/interview/session/501
                </span>
              </div>

              {/* Window Content */}
              <div style={{ padding: '28px', color: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#84cc16' }}>AMAZON</span>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>• Senior Backend Engineer</span>
                    <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '4px', background: '#1e293b', color: '#94a3b8' }}>Technical Mode</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#84cc16' }}>Question 3 of 8</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  {/* Left: Question & Evaluation */}
                  <div>
                    <div style={{ fontSize: '12px', color: '#84cc16', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '8px' }}>
                      SYSTEM DESIGN & SCALABILITY
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f8fafc', lineHeight: '1.4', marginBottom: '16px' }}>
                      "How would you design a distributed rate limiter for a public REST API processing 100k requests/sec?"
                    </h3>

                    <div style={{ background: '#111827', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '16px' }}>
                      <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, marginBottom: '4px' }}>CANDIDATE RESPONSE</div>
                      <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', margin: 0 }}>
                        "I would use a Token Bucket algorithm with Redis as an in-memory cache. Using Redis Lua scripts ensures atomic updates to prevent race conditions during concurrent requests..."
                      </p>
                    </div>

                    <div style={{ background: 'rgba(132, 204, 22, 0.08)', border: '1px solid rgba(132, 204, 22, 0.3)', padding: '12px 14px', borderRadius: '8px', fontSize: '13px', color: '#84cc16' }}>
                      ✓ AI Adaptive Follow-up: "How do you handle hash ring rebalancing when a cache node fails?"
                    </div>
                  </div>

                  {/* Right: Scores */}
                  <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>AI Realtime Evaluation</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{ background: '#0b0f19', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>Technical Depth</div>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#84cc16' }}>92<span style={{ fontSize: '13px', color: '#64748b' }}>/100</span></div>
                      </div>
                      <div style={{ background: '#0b0f19', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>Communication</div>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#22c55e' }}>88<span style={{ fontSize: '13px', color: '#64748b' }}>/100</span></div>
                      </div>
                    </div>

                    <div style={{ fontSize: '13px', color: '#94a3b8', background: '#0b0f19', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                      <strong style={{ color: '#84cc16' }}>AI Insight:</strong> Strong architectural choice using atomic Redis primitives. Verified zero race conditions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Capability Section */}
      <section style={{ padding: '36px 24px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
            Built for serious technical candidate preparation
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            {[
              'Technical Architecture',
              'System Design',
              'Behavioral & STAR Method',
              'Voice Speech Fluency',
              'Python Sandbox Execution',
              'Resume Skill Parsing'
            ].map((tag, idx) => (
              <Badge key={idx} variant="neutral" size="md">
                ✓ {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* How AIHire Works (Connected Journey) */}
      <section id="how-it-works" style={{ padding: '88px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Badge variant="lime">STEP-BY-STEP WORKFLOW</Badge>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#0f172a', margin: '12px 0 8px', letterSpacing: '-0.02em' }}>
              How AIHire Works
            </h2>
            <p style={{ color: '#475569', fontSize: '17px', maxWidth: '600px', margin: '0 auto' }}>
              A seamless, intelligent candidate journey from resume upload to Docker execution and AI recommendations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', position: 'relative' }}>
            {[
              { num: '01', title: 'Upload Resume', desc: 'PDF text extraction & skill matrix profiling.' },
              { num: '02', title: 'Choose Target', desc: 'Select company, target role, and interview mode.' },
              { num: '03', title: 'Practice Session', desc: 'Answer text, voice, or coding questions.' },
              { num: '04', title: 'AI Evaluation', desc: 'Receive instant technical & speech scores.' },
              { num: '05', title: 'Targeted Growth', desc: 'Follow personalized practice recommendations.' }
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '28px 20px',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#65a30d', marginBottom: '12px' }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Experience Showcase (Alternating Feature Cards) */}
      <section id="features" style={{ padding: '88px 24px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Everything you need to prepare with confidence
            </h2>
            <p style={{ fontSize: '17px', color: '#475569', maxWidth: '640px', margin: '0 auto' }}>
              Tailored candidate tools designed to simulate real software engineering and management interviews.
            </p>
          </div>

          {/* Feature 1: Resume-Aware Interviews */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '88px' }}>
            <div>
              <Badge variant="lime" style={{ marginBottom: '12px' }}>RESUME-AWARE INTERVIEWS</Badge>
              <h3 style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Questions generated from your actual experience
              </h3>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
                AIHire parses your PDF resume, extracts key technologies, project details, and employment history to ask authentic questions tailored to your exact career background.
              </p>
              <div style={{ display: 'flex', flexColumn: 'column', gap: '10px' }}>
                <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 600 }}>✓ Automatic PDF text & skill parsing</div>
                <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 600 }}>✓ Project-specific technical questions</div>
                <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 600 }}>✓ Identification of resume skill gaps</div>
              </div>
            </div>

            <div style={{ background: '#0b0f19', padding: '24px', borderRadius: '16px', border: '1px solid #1e293b', boxShadow: 'var(--shadow-dark)', color: '#f8fafc' }}>
              <div style={{ fontSize: '12px', color: '#84cc16', fontWeight: 700, marginBottom: '8px' }}>EXTRACTED RESUME SKILLS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'React'].map((s, i) => (
                  <span key={i} style={{ background: '#1e293b', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: '#84cc16' }}>{s}</span>
                ))}
              </div>
              <div style={{ background: '#111827', padding: '14px', borderRadius: '10px', border: '1px solid #1e293b', fontSize: '13px', color: '#f8fafc' }}>
                <strong style={{ color: '#84cc16' }}>Generated Question:</strong> "Tell me about how you structured the FastAPI authentication system and PostgreSQL session pool mentioned in your experience at TechCorp."
              </div>
            </div>
          </div>

          {/* Feature 2: Voice Interview Mode */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '88px' }}>
            <div style={{ order: 2 }}>
              <Badge variant="info" style={{ marginBottom: '12px' }}>VOICE & SPEECH EVALUATION</Badge>
              <h3 style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Speak your answers. Evaluate speech fluency.
              </h3>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
                Practice verbal articulation with browser microphone recording, Speech-to-Text transcription, and automated communication scoring.
              </p>
              <Button variant="dark" icon={Mic} onClick={() => navigate('/voice-interview')}>
                Try Voice Mode
              </Button>
            </div>

            <div style={{ background: '#0b0f19', padding: '24px', borderRadius: '16px', border: '1px solid #1e293b', color: '#f8fafc', order: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', border: '2px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                  <Mic size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>Audio Response Captured</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Duration: 00:42 • Speech-to-Text Ready</div>
                </div>
              </div>
              <div style={{ background: '#111827', padding: '14px', borderRadius: '10px', fontSize: '13px', color: '#94a3b8', border: '1px solid #1e293b' }}>
                <strong style={{ color: '#22c55e' }}>Transcribed Text:</strong> "I partitioned the dataset using consistent hashing to balance load evenly..."
              </div>
            </div>
          </div>

          {/* Feature 3: Docker Sandbox Coding Lab */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <Badge variant="lime" style={{ marginBottom: '12px' }}>DOCKER SANDBOX CODING LAB</Badge>
              <h3 style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Real backend execution inside isolated containers
              </h3>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
                Solve Python data structures and algorithm problems with code submitted directly to backend Docker containers for test case validation.
              </p>
              <Button variant="dark" icon={Code2} onClick={() => navigate('/coding')}>
                Open Coding Lab
              </Button>
            </div>

            <div style={{ background: '#0b0f19', padding: '24px', borderRadius: '16px', border: '1px solid #1e293b', color: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: '#84cc16' }}>solution.py</span>
                <span style={{ color: '#64748b' }}>Python 3.11</span>
              </div>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#f8fafc', background: '#111827', padding: '14px', borderRadius: '8px', margin: '0 0 14px 0' }}>
{`def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i`}
              </pre>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', color: '#22c55e', fontWeight: 600 }}>
                <span>✓ 5/5 Test Cases Passed</span>
                <span>0.042s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner (Dark Premium Section) */}
      <section style={{ padding: '96px 24px', backgroundColor: '#0b0f19', color: '#f8fafc', textAlign: 'center', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#f8fafc', marginBottom: '20px', letterSpacing: '-0.03em' }}>
            Walk into your next interview prepared.
          </h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '40px', lineHeight: '1.6' }}>
            Practice with an AI interviewer that adapts to your resume, role, and response depth.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" icon={ArrowRight} onClick={() => navigate('/register')}>
              Start Preparing Free
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#070a11', borderTop: '1px solid #1e293b', padding: '64px 24px 32px', color: '#94a3b8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <BrainCircuit size={24} color="#84cc16" />
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc' }}>AIHire</span>
            </div>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              AI-powered candidate preparation platform for software engineers and technology professionals.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginBottom: '14px', textTransform: 'uppercase' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <a href="#how-it-works" style={{ color: '#94a3b8', textDecoration: 'none' }}>How It Works</a>
              <a href="#interview-modes" style={{ color: '#94a3b8', textDecoration: 'none' }}>Interview Modes</a>
              <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginBottom: '14px', textTransform: 'uppercase' }}>Modules</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <span style={{ color: '#94a3b8' }}>System Design</span>
              <span style={{ color: '#94a3b8' }}>Voice Mode</span>
              <span style={{ color: '#94a3b8' }}>Coding Sandbox</span>
              <span style={{ color: '#94a3b8' }}>Resume Extractor</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '24px', borderTop: '1px solid #141c2e', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          © 2026 AIHire Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
