import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayoutV2 from '../components/student/DashboardLayoutV2';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import api from '../lib/api';
import { FileText, Download, Eye, RefreshCw, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const ResumePage = () => {
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
            setSuccess('Resume generated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate resume.');
        } finally {
            setGenerating(false);
        }
    };

    const handlePreview = async () => {
        setPreviewing(true);
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
            <DashboardLayoutV2>
                <div className="max-w-[1000px] flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#888888] mb-8">
                        <AlertTriangle size={40} />
                    </div>
                    <h1 className="text-white text-[28px] font-bold mb-4">Complete your profile first</h1>
                    <p className="text-[#888888] text-[16px] max-w-[500px] mb-10">
                        Your auto-generated resume is built directly from your profile data. We need your details first.
                    </p>
                    <Button variant="primary" onClick={() => navigate('/profile')}>
                        SETUP PROFILE →
                    </Button>
                </div>
            </DashboardLayoutV2>
        );
    }

    return (
        <DashboardLayoutV2>
            <div className="max-w-[1000px]">
                <header className="mb-10">
                    <div className="text-[12px] text-[#888888] font-bold uppercase tracking-widest mb-1">
                        ONE PROFILE, ONE RESUME
                    </div>
                    <h1 className="text-[36px] font-bold text-white mb-2">Your Resume</h1>
                    <p className="text-[#888888] text-[16px]">
                        Auto-generated using our custom Tier 1 template. Verified by the club.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-0 overflow-hidden" hoverEffect={false}>
                            <div className="p-6 border-b border-[#2A2A2A] bg-[#1A1A1A]/30 flex justify-between items-center">
                                <h2 className="text-white text-[18px] font-bold uppercase tracking-wider">What's Inside</h2>
                                {user.resumeGeneratedAt && (
                                    <span className="text-[#00FF85] text-[12px] font-bold flex items-center gap-1.5">
                                        <CheckCircle size={14} /> READY
                                    </span>
                                )}
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4">
                                {[
                                    'Institutional Verification', 
                                    'Hustle Score Badge', 
                                    'Skills (Ranked by Gauntlet)', 
                                    'Verified Social Links', 
                                    'Professional Experience', 
                                    'TUC Platinum Watermark'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-[#CCCCCC] text-[14px]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#00FF85]" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div className="space-y-4">
                            <h2 className="text-[#888888] text-[12px] font-bold uppercase tracking-widest">RESUME ACTIONS</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button 
                                    variant="dark" 
                                    className="w-full flex gap-3 h-14"
                                    onClick={handlePreview}
                                    disabled={!user.resumeGeneratedAt || previewing}
                                >
                                    {previewing ? <Loader2 className="animate-spin" size={20} /> : <Eye size={20} />}
                                    PREVIEW PDF
                                </Button>
                                <Button 
                                    variant="dark" 
                                    className="w-full flex gap-3 h-14"
                                    onClick={handleDownload}
                                    disabled={!user.resumeGeneratedAt || downloading}
                                >
                                    {downloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                                    DOWNLOAD PDF
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="p-8 text-center" hoverEffect={false}>
                            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mx-auto mb-6 text-[#00FF85]">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-white text-[18px] font-bold mb-2">Generation Hub</h3>
                            <p className="text-[#888888] text-[13px] mb-8">
                                Last updated: {user.resumeGeneratedAt ? new Date(user.resumeGeneratedAt).toLocaleDateString() : 'Never'}
                            </p>
                            
                            <Button 
                                variant="primary" 
                                className="w-full h-14"
                                onClick={handleGenerate}
                                disabled={generating}
                            >
                                {generating ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
                                {user.resumeGeneratedAt ? "REGENERATE" : "GENERATE NOW"}
                            </Button>
                        </Card>

                        <div className="p-6 bg-[#00FF85]/5 border border-[#00FF85]/20 rounded-xl">
                            <div className="flex gap-3">
                                <RefreshCw size={18} className="text-[#00FF85] shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white text-[13px] font-bold mb-1">Live Updates</p>
                                    <p className="text-[#888888] text-[12px] leading-relaxed">
                                        Any changes to your profile or Hustle Score won't reflect until you regenerate the PDF.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayoutV2>
    );
};

export default ResumePage;
