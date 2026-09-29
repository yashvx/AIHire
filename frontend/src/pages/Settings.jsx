import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/Input';
import { Settings as SettingsIcon, Sliders, Bell, Moon, Save } from 'lucide-react';

export default function Settings() {
  const toast = useToast();

  const [aiAdaptiveMode, setAiAdaptiveMode] = useState('enabled');
  const [difficultyPreference, setDifficultyPreference] = useState('Adaptive');
  const [speechEvaluation, setSpeechEvaluation] = useState('detailed');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Interview preferences updated!');
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Platform & Session Settings
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
          Configure AI interview behavior, adaptive question generation, and interface settings.
        </p>
      </div>

      <Card>
        <CardHeader title="AI Interview Preferences" subtitle="Customize the AI evaluator engine" />
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Select
            label="AI Adaptive Follow-Up Mode"
            value={aiAdaptiveMode}
            onChange={(e) => setAiAdaptiveMode(e.target.value)}
            options={[
              { value: 'enabled', label: 'Enabled — Automatically generate adaptive follow-up questions' },
              { value: 'disabled', label: 'Disabled — Standard fixed questions only' }
            ]}
          />

          <Select
            label="Default Question Difficulty"
            value={difficultyPreference}
            onChange={(e) => setDifficultyPreference(e.target.value)}
            options={[
              { value: 'Adaptive', label: 'Adaptive (Dynamically adjusts based on response depth)' },
              { value: 'Hard', label: 'Hard (Staff/Principal Engineer level)' },
              { value: 'Medium', label: 'Medium (Standard Senior Engineer level)' }
            ]}
          />

          <Select
            label="Speech & Voice Evaluation Mode"
            value={speechEvaluation}
            onChange={(e) => setSpeechEvaluation(e.target.value)}
            options={[
              { value: 'detailed', label: 'Detailed (Transcribes + evaluates technical depth & fluency)' },
              { value: 'basic', label: 'Basic (Transcription focus only)' }
            ]}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Button type="submit" variant="primary" icon={Save}>
              Save Preferences
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
