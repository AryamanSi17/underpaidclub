import React, { useState } from 'react';
import DashboardLayoutV2 from '../components/student/DashboardLayoutV2';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Lock, CheckCircle, Shield, MessageSquare, Users, Loader2, ExternalLink, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api.service';

const RequirementItem = ({ label, done }) => (
  <div className="flex items-center justify-between py-4 border-b border-[#2A2A2A]/50 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-all">
    <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${done ? 'bg-[#00FF85]/10 border-[#00FF85] text-[#00FF85]' : 'border-[#2A2A2A] text-[#2A2A2A]'}`}>
            {done && <CheckCircle size={14} />}
        </div>
        <span className={`text-[14px] ${done ? 'text-white font-bold' : 'text-[#888888]'}`}>{label}</span>
    </div>
    {done ? (
        <span className="text-[#00FF85] text-[10px] font-bold uppercase tracking-widest">COMPLETE</span>
    ) : (
        <span className="text-[#888888] text-[10px] font-bold uppercase tracking-widest">PENDING</span>
    )}
  </div>
);

const Community = () => {
    const { user, refreshUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [inviteLink, setInviteLink] = useState('');
    const [error, setError] = useState('');

    const isFullyComplete = user?.profileComplete && user?.linkedin && user?.github && user?.bio && user?.twitter;

    const requirements = [
        { label: 'Profile Completion (100%)', done: !!user?.profileComplete },
        { label: 'LinkedIn Verified', done: !!user?.linkedin },
        { label: 'GitHub Connected', done: !!user?.github },
        { label: 'Twitter/X Connected', done: !!user?.twitter },
        { label: 'Short Founder Bio', done: !!user?.bio },
    ];

    const handleGetInvite = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await apiService.community.getDiscordInvite();
            setInviteLink(res.data.data.inviteLink);
            await refreshUser();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate invite. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenInvite = () => {
        window.open(inviteLink || user?.discordInviteLink, '_blank');
    };

    return (
        <DashboardLayoutV2>
            <div className="max-w-[1000px]">
                <header className="mb-10">
                    <div className="text-[12px] text-[#888888] font-bold uppercase tracking-widest mb-1">
                        PRIVATE NETWORK & ALPHA
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-[36px] font-bold text-white mb-2">War Room</h1>
                        {!isFullyComplete && <Lock size={28} className="text-[#888888] mb-2" />}
                    </div>
                    <p className="text-[#888888] text-[16px]">
                        The highest signal groups for student founders. 100% verified identities only.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-[#888888] text-[12px] font-bold uppercase tracking-widest mb-6">ENTRY REQUIREMENTS</h2>
                            <Card className="p-4" hoverEffect={false}>
                                <div className="divide-y divide-[#2A2A2A]">
                                    {requirements.map((req, i) => (
                                        <RequirementItem key={i} {...req} />
                                    ))}
                                </div>
                            </Card>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="p-6" hoverEffect={true}>
                                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#00FF85] mb-4">
                                    <Users size={20} />
                                </div>
                                <h3 className="text-white text-[16px] font-bold mb-2">Alpha Networking</h3>
                                <p className="text-[#888888] text-[14px]">Connect with 2,500+ active student founders across India.</p>
                            </Card>
                            <Card className="p-6" hoverEffect={true}>
                                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#00FF85] mb-4">
                                    <Shield size={20} />
                                </div>
                                <h3 className="text-white text-[16px] font-bold mb-2">Verified Only</h3>
                                <p className="text-[#888888] text-[14px]">No noise. No bots. Only Tier 1 talent building real products.</p>
                            </Card>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="text-center py-10" hoverEffect={false}>
                            <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${isFullyComplete ? 'bg-[#00FF85]/10 border-[#00FF85] text-[#00FF85]' : 'bg-[#1A1A1A] border-[#2A2A2A] text-[#2A2A2A]'}`}>
                                {isFullyComplete ? <Users size={40} /> : <Lock size={40} />}
                            </div>
                            
                            <h3 className="text-white text-[20px] font-bold mb-2">
                                {isFullyComplete ? "Access Granted" : "Join the War Room"}
                            </h3>
                            <p className="text-[#888888] text-[14px] px-4 mb-8">
                                {isFullyComplete 
                                    ? "You've proven yourself. Your single-use invite is ready for generation." 
                                    : "Complete all requirements on the left to unlock your invite."}
                            </p>

                            {isFullyComplete ? (
                                <div className="px-6 space-y-4">
                                    {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] rounded-lg mb-4">{error}</div>}
                                    
                                    {(user?.discordInviteGenerated || inviteLink) ? (
                                        <Button 
                                            variant="primary" 
                                            className="w-full bg-[#5865F2] border-none hover:bg-[#4752C4] text-white"
                                            onClick={handleOpenInvite}
                                        >
                                            <ExternalLink size={18} /> OPEN DISCORD
                                        </Button>
                                    ) : (
                                        <Button 
                                            variant="primary" 
                                            className="w-full"
                                            onClick={handleGetInvite}
                                            disabled={loading}
                                        >
                                            {loading ? <Loader2 size={18} className="animate-spin" /> : "GENERATE INVITE"}
                                        </Button>
                                    )}

                                    <div className="flex gap-2 p-3 bg-white/5 border border-[#2A2A2A] rounded-lg">
                                        <AlertTriangle size={14} className="text-[#888888] shrink-0 mt-0.5" />
                                        <p className="text-[#888888] text-[10px] text-left italic">
                                            Single-use link. Redirects you directly to the TUC Server. Do not share.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="px-6">
                                    <Button variant="dark" className="w-full opacity-50 cursor-not-allowed">
                                        LOCKED
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayoutV2>
    );
};

export default Community;
