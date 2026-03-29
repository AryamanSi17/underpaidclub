import React, { useState, useEffect } from 'react';
import DashboardLayoutV2 from '../components/student/DashboardLayoutV2';
import ProfileCompletionBanner from '../components/student/profile/ProfileCompletionBanner';
import ProfileDetails from '../components/student/profile/ProfileDetails';
import ResumeSection from '../components/student/profile/ResumeSection';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import Button from '../components/ui/Button';
import { CheckCircle, Loader2 } from 'lucide-react';

const ProfileSetup = () => {
    const { user, refreshUser } = useAuth();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        branch: '', year: '3rd Year', linkedin: '', bio: '',
        skills: [], experience: []
    });

    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                branch: user.branch || '',
                year: user.year || '3rd Year',
                linkedin: user.linkedin || '',
                bio: user.bio || '',
            }));
        }
    }, [user]);

    const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
            await apiService.profile.update(form);
            await refreshUser();
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            setError('Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardLayoutV2>
            <div className="max-w-[1000px]">
                <header className="mb-10">
                    <h1 className="text-[36px] font-bold text-white mb-2">Profile</h1>
                    <p className="text-[#888888] text-[16px]">Manage your personal information and resumes.</p>
                </header>

                <ProfileCompletionBanner percentage={user?.completion || 84} />

                {error && (
                    <div className="mb-6 p-4 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl text-[#FF4444] text-sm">
                        {error}
                    </div>
                )}
                
                {saved && (
                    <div className="mb-6 p-4 bg-[#00FF85]/10 border border-[#00FF85]/30 rounded-xl text-[#00FF85] text-sm flex items-center gap-2">
                        <CheckCircle size={16} /> Changes saved successfully!
                    </div>
                )}

                <ProfileDetails form={form} set={set} user={user} />
                
                <ResumeSection resumes={user?.resumes || [
                    { label: 'Product Resume', filename: 'aryaman_resume_v2.pdf', date: 'Mar 24, 2026' }
                ]} />

                <div className="mt-12 flex justify-end">
                    <Button 
                        variant="primary" 
                        className="px-12"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : 'SAVE CHANGES'}
                    </Button>
                </div>
            </div>
        </DashboardLayoutV2>
    );
};

export default ProfileSetup;
