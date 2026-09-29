import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { User, Mail, Shield, CheckCircle2, Save } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const toast = useToast();

  const [fullName, setFullName] = useState(user?.full_name || 'Alex Vance');
  const [email] = useState(user?.email || 'alex.vance@example.com');
  const [targetRole, setTargetRole] = useState('Senior Backend Engineer');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Candidate profile updated successfully!');
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Candidate Profile
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
          Manage your personal account details, target career role, and credentials.
        </p>
      </div>

      <Card>
        <CardHeader title="Account Details" subtitle="Your candidate identity on AIHire" />
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Full Name"
            icon={User}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Email Address"
            icon={Mail}
            value={email}
            disabled
          />

          <Input
            label="Primary Target Career Role"
            placeholder="e.g. Senior Backend Engineer"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Button type="submit" variant="primary" icon={Save}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
