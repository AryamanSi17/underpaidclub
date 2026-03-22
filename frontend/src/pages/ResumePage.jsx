import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/student/DashboardLayout';
import api from '../lib/api';
import { FileText, Download, Eye, RefreshCw, Loader2, AlertTriangle } from 'lucide-react';

export default function ResumePage() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/api/resume/generate');
      await refreshUser();
      setSuccess('Resume generated! Preview or download below.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate resume.');
    } finally {
      setGenerating(false);
    }
  };

  const handlePreview = async () => {
    setPreviewing(true);
    setError('');
    try {
      const res = await api.get('/api/resume/preview', { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      window.open(url, '_blank');
    } catch {
      setError('Failed to load preview.');
    } finally {
      setPreviewing(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    setError('');
    try {
      const res = await api.get('/api/resume/download', { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `${user.name.replace(/\s+/g, '_')}_TUC_Resume.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Failed to download resume.');
    } finally {
      setDownloading(false);
    }
  };

  if (!user?.profileComplete) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto p-4 md:p-8 text-center">
          <AlertTriangle size={40} className="text-[#ffffff] mx-auto mb-4" />
          <h1 className="text-white text-xl font-bold mb-3">Complete your profile first</h1>
          <p className="text-[#a1a1aa] text-sm mb-6">Your resume is built from your profile data. Fill it out first.</p>
          <button onClick={() => navigate('/profile')} className="px-6 py-3 bg-[#ffffff] text-black font-bold rounded-xl hover:bg-[#e6c84a] transition-colors">
            Setup Profile →
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold">Your Resume</h1>
          <p className="text-[#a1a1aa] text-sm mt-1">Auto-generated from your profile. Regenerate anytime.</p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-5 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">{success}</div>
        )}

        {/* Status card */}
        <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ffffff]/10 border border-[#ffffff]/30 flex items-center justify-center">
              <FileText size={22} className="text-[#ffffff]" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold">{user.name} — TUC Resume</h3>
              <p className="text-[#a1a1aa] text-sm mt-0.5">
                {user.resumeGeneratedAt
                  ? `Last generated: ${new Date(user.resumeGeneratedAt).toLocaleDateString()}`
                  : 'Not generated yet'}
              </p>
              {user.hustleScore != null && (
                <div className="mt-2 inline-flex items-center gap-1.5 bg-[#ffffff]/10 border border-[#ffffff]/30 text-[#ffffff] text-xs font-bold px-2.5 py-1 rounded-full">
                  Hustle Score: {user.hustleScore}/100
                </div>
              )}
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-5 mb-6">
          <p className="text-[#a1a1aa] text-xs font-semibold uppercase tracking-wider mb-3">Included in your resume</p>
          <div className="grid grid-cols-2 gap-2">
            {['Name & College', 'Skills', 'Experience', 'GitHub & LinkedIn', 'Hustle Score badge', 'TUC branding'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                <span className="text-green-400 text-xs">✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-3 bg-[#ffffff] text-black font-bold rounded-xl hover:bg-[#e6c84a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {generating ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
            {user.resumeGeneratedAt ? 'Regenerate Resume' : 'Generate Resume'}
          </button>

          {user.resumeGeneratedAt && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handlePreview}
                disabled={previewing}
                className="py-3 bg-[#0d0d0d] border border-[#1a1a1a] text-white font-semibold rounded-xl hover:border-[#ffffff]/30 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
              >
                {previewing ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
                Preview
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="py-3 bg-[#0d0d0d] border border-[#1a1a1a] text-white font-semibold rounded-xl hover:border-[#ffffff]/30 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
              >
                {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                Download
              </button>
            </div>
          )}
        </div>

        <p className="text-[#3f3f46] text-xs text-center mt-5">
          Each regeneration overwrites the previous version. The latest version is sent when you apply to roles.
        </p>
      </div>
    </DashboardLayout>
  );
}
