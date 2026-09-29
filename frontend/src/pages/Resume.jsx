import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeApi } from '../api/resumeApi';
import { useToast } from '../context/ToastContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar, Skeleton } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/ProgressBar';
import { UploadCloud, FileText, CheckCircle2, ArrowRight, Trash2, Sparkles } from 'lucide-react';

export default function Resume() {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadResumes();
  }, []);

  async function loadResumes() {
    setIsLoading(true);
    try {
      const data = await resumeApi.getResumes();
      setResumes(data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch resumes');
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      toast.error('Invalid file format. Please upload a PDF document.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 90 ? prev : prev + 25));
    }, 200);

    try {
      const uploaded = await resumeApi.uploadResume(file);
      clearInterval(interval);
      setUploadProgress(100);
      toast.success('Resume uploaded and parsed successfully!');
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        loadResumes();
        navigate(`/resume/analyze?id=${uploaded.id || 101}`);
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(0);
      toast.error(err.message || 'Failed to upload resume.');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Resume Hub & Skill Extraction
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', margin: 0 }}>
          Upload your resume PDF for automated AI parsing, skill extraction, and tailored interview generation.
        </p>
      </div>

      {/* Upload Drag & Drop Area */}
      <Card>
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragActive ? '#65a30d' : '#e2e8f0'}`,
            backgroundColor: dragActive ? 'rgba(101, 163, 13, 0.05)' : '#f8fafc',
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(101, 163, 13, 0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#65a30d',
              marginBottom: '20px'
            }}
          >
            <UploadCloud size={32} />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Drag and drop your resume PDF here
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
            Supports PDF format up to 10MB
          </p>

          <input
            type="file"
            id="resume-upload-input"
            accept=".pdf,application/pdf"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            style={{ display: 'none' }}
          />

          <Button
            variant="outline"
            size="md"
            onClick={() => document.getElementById('resume-upload-input').click()}
            isLoading={isUploading}
          >
            Browse File
          </Button>

          {isUploading && (
            <div style={{ marginTop: '24px', maxWidth: '300px', margin: '24px auto 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
                <span>Uploading & Extracting PDF...</span>
                <span>{uploadProgress}%</span>
              </div>
              <ProgressBar progress={uploadProgress} />
            </div>
          )}
        </div>
      </Card>

      {/* Resumes List */}
      <Card>
        <CardHeader title="Your Uploaded Resumes" subtitle="Manage saved resumes and inspect analysis reports" />

        {isLoading ? (
          <Skeleton height="80px" />
        ) : resumes.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No resumes uploaded yet"
            description="Upload your software engineering resume to generate personalized interview questions."
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {resumes.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '20px',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer'
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(101, 163, 13, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#65a30d'
                    }}
                  >
                    <FileText size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                      {item.filename}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                      Uploaded on {new Date(item.created_at || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Badge variant="lime">Parsed & Ready</Badge>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Sparkles}
                    onClick={() => navigate(`/resume/analyze?id=${item.id}`)}
                  >
                    View Analysis
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowRight}
                    onClick={() => navigate(`/interview/new?resume_id=${item.id}`)}
                  >
                    Start Interview
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
