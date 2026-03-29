import React, { useState } from 'react';
import DashboardLayoutV2 from '../components/student/DashboardLayoutV2';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Trophy, CheckCircle, Zap, Shield, Star, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api.service';

const PerkItem = ({ icon: Icon, title, desc }) => {
  return (
    <div className="flex items-start gap-4 p-6 border-b border-[#2A2A2A] last:border-0 hover:bg-white/5 transition-all">
      <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#00FF85] shrink-0">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-white text-[16px] font-bold mb-1">{title}</h3>
        <p className="text-[#888888] text-[14px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

const Cohort = () => {
    const { user, refreshUser } = useAuth();
    const [joining, setJoining] = useState(false);

    const handleJoin = async () => {
        setJoining(true);
        try {
            await apiService.cohort.join();
            await refreshUser();
        } catch (err) {
            console.error(err);
        } finally {
            setJoining(false);
        }
    };

    const enrolled = user?.cohortEnrolled;

    return (
        <DashboardLayoutV2>
            <div className="max-w-[1000px]">
                <header className="mb-10">
                    <div className="text-[12px] text-[#888888] font-bold uppercase tracking-widest mb-1">
                        ACCELERATE YOUR STARTUP JOURNEY
                    </div>
                    <h1 className="text-[36px] font-bold text-white mb-2">The 2.5-Month Cohort</h1>
                    <p className="text-[#888888] text-[16px]">
                        The most intense program for student founders in India. Join the inner circle.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-0 overflow-hidden" hoverEffect={false}>
                            <div className="p-6 border-b border-[#2A2A2A] bg-[#1A1A1A]/30 flex justify-between items-center">
                                <h2 className="text-white text-[18px] font-bold uppercase tracking-wider">Cohort Alpha Perks</h2>
                                <span className="bg-[#00FF85]/10 text-[#00FF85] px-3 py-1 rounded-full text-[12px] font-bold border border-[#00FF85]/20">
                                    APPLICATIONS OPEN
                                </span>
                            </div>
                            <div className="divide-y divide-[#2A2A2A]">
                                <PerkItem 
                                    icon={Star} 
                                    title="Platinum Badge" 
                                    desc="Appear prioritized in founder and recruitment searches. 10x visibility guarantee." 
                                />
                                <PerkItem 
                                    icon={Shield} 
                                    title="War Room Access" 
                                    desc="Unlock the private Discord channels for deep collaboration and alpha leaks." 
                                />
                                <PerkItem 
                                    icon={Zap} 
                                    title="Weekly Founder AMA" 
                                    desc="Direct sessions with founders of Unicorns (Zepto, Razorpay, etc.) once week." 
                                />
                                <PerkItem 
                                    icon={Trophy} 
                                    title="Demo Day Pitch" 
                                    desc="Pitch your startup to top VCs and angel investors from India and Silicon Valley." 
                                />
                            </div>
                        </Card>

                        <section>
                            <h2 className="text-white text-[22px] font-bold mb-6">Course Curriculum</h2>
                            <div className="space-y-4">
                                {['The 0 to 1 Phase', 'Distribution & Growth', 'Fundraising & Network', 'Hustling 101'].map((module, i) => (
                                    <Card key={i} className="flex items-center justify-between p-6 group cursor-pointer" hoverEffect={true}>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[#2A2A2A] text-[24px] font-bold group-hover:text-[#00FF85] transition-colors">0{i+1}</span>
                                            <span className="text-white text-[16px] font-bold">{module}</span>
                                        </div>
                                        <Info size={18} className="text-[#888888] group-hover:text-white" />
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Status Card */}
                    <div className="space-y-6">
                        <Card className="text-center py-10" hoverEffect={false}>
                            <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border-2 border-[#2A2A2A] flex items-center justify-center mx-auto mb-6 text-[#00FF85]">
                                {enrolled ? <CheckCircle size={40} /> : <Trophy size={40} className="text-[#888888]" />}
                            </div>
                            
                            <h3 className="text-white text-[20px] font-bold mb-2">
                                {enrolled ? "You're Official!" : "Join the Alpha Cohort"}
                            </h3>
                            <p className="text-[#888888] text-[14px] px-4 mb-8">
                                {enrolled ? "Your journey has just begun. Use the War Room to get started." : "Earn your badge. Build your network. Skip the grind."}
                            </p>

                            {enrolled ? (
                                <div className="space-y-4 px-4">
                                    <Button variant="ghost" className="w-full">VIEW CALENDAR</Button>
                                    <Button variant="dark" className="w-full">ENTER WAR ROOM</Button>
                                    <div className="text-[#888888] text-[12px] italic mt-4">
                                        Member since Mar 2026
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 px-4">
                                    <Button 
                                        variant="primary" 
                                        className="w-full"
                                        onClick={handleJoin}
                                        disabled={joining}
                                    >
                                        {joining ? "JOINING..." : "RESERVE MY SPOT"}
                                    </Button>
                                    <div className="text-[#888888] text-[12px] px-2 leading-relaxed">
                                        Only 15% of TUC applicants are selected for the cohort. No guarantees.
                                    </div>
                                </div>
                            )}
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-[#C9B037]/20 to-transparent border-[#C9B037]/20" hoverEffect={false}>
                            <div className="flex items-center gap-2 mb-4">
                                <Star size={18} fill="#C9B037" className="text-[#C9B037]" />
                                <span className="text-[#C9B037] text-[12px] font-bold uppercase tracking-widest">Platinum Membership</span>
                            </div>
                            <p className="text-white text-[14px] font-bold leading-relaxed mb-4">
                                Completion of this cohort grants the Platinum Badge permanently.
                            </p>
                            <div className="text-[#888888] text-[12px] italic">
                                Over 84% of Platinum members received funded intros last month.
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayoutV2>
    );
};

export default Cohort;
