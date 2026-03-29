import React, { useState, useEffect } from 'react';
import DashboardLayoutV2 from '../components/student/DashboardLayoutV2';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SearchBar from '../components/student/bounties/SearchBar';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { Loader2, Users, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const FounderCard = ({ founder }) => {
  return (
    <Card className="mb-4 flex flex-col md:flex-row gap-6 items-start md:items-center p-6" hoverEffect={true}>
      <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-white font-bold text-xl shrink-0">
        {founder.name?.[0] || 'U'}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="text-white text-[18px] font-bold">{founder.name}</h3>
          <span className="bg-[#00FF85]/10 text-[#00FF85] px-2 py-0.5 rounded text-[10px] font-bold border border-[#00FF85]/20">
            {founder.match || 88}% MATCH
          </span>
          {founder.badges?.includes('platinum') && (
            <span className="bg-[#C9B037]/10 text-[#C9B037] px-2 py-0.5 rounded text-[10px] font-bold border border-[#C9B037]/20">
              PLATINUM
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mb-4">
          <div className="flex items-center gap-2 text-[#888888] text-[13px]">
            <GraduationCap size={14} />
            {founder.institution || 'IIT Bombay'} · {founder.year || '2026'}
          </div>
          <div className="flex items-center gap-2 text-[#888888] text-[13px]">
            <Briefcase size={14} />
            {founder.branch || 'Engineering'}
          </div>
        </div>

        <p className="text-[#CCCCCC] text-[14px] line-clamp-2 italic mb-4">
          "{founder.bio || "Building a fintech solution for GenZ. Strong in backend, looking for growth lead."}"
        </p>

        <div className="flex gap-2 flex-wrap">
            {(founder.skills || ['React', 'NodeJS', 'Strategy']).slice(0, 3).map(skill => (
                <span key={skill} className="bg-[#1A1A1A] text-[#888888] px-3 py-1 rounded-full text-[11px] border border-[#2A2A2A]">
                    {skill}
                </span>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full md:w-auto">
        <Button variant="primary" className="py-2.5 px-8">
            CONNECT
        </Button>
        <Button variant="ghost" className="py-2.5 px-8">
            VIEW PROFILE
        </Button>
      </div>
    </Card>
  );
};

const FounderMatching = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Recommended');

  useEffect(() => {
    // In a real app, we'd fetch from /api/founders
    // Fetching from /api/profile/all or similar
    const fetchFounders = async () => {
        try {
            // Mocking for now to show the UI
            const mockFounders = [
                { id: 1, name: 'Sarthak Gupta', institution: 'IIT Delhi', year: '2025', branch: 'CS', match: 96, bio: 'Building a new-age social layer for gamers.', skills: ['Solidity', 'React', 'Product'], badges: ['platinum'] },
                { id: 2, name: 'Ishita Verma', institution: 'BITS Pilani', year: '2026', branch: 'Design', match: 92, bio: 'Visual designer looking to build 0-1 brand identities.', skills: ['Figma', 'UI/UX', 'Motion'] },
                { id: 3, name: 'Kabir Singh', institution: 'NIT Trichy', year: '2025', branch: 'Mech', match: 89, bio: 'Backend wizard (Go/Rust). Hated by bugs, loved by scale.', skills: ['Go', 'Rust', 'Kubernetes'] },
                { id: 4, name: 'Riya Sen', institution: 'IIM Indore', year: '2024', branch: 'MBA', match: 85, bio: 'Ex-consultant. Building something in the Creator Economy.', skills: ['Strategy', 'Growth', 'SQL'] },
            ];
            setFounders(mockFounders);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    fetchFounders();
  }, []);

  return (
    <DashboardLayoutV2>
      <div className="max-w-[1000px]">
        <header className="mb-10">
          <div className="text-[12px] text-[#888888] font-bold uppercase tracking-widest mb-1">
            PEOPLE MATCHED TO YOU
          </div>
          <h1 className="text-[36px] font-bold text-white mb-2">Find Co-founder</h1>
          <p className="text-[#888888] text-[16px]">
            The club is only as strong as its members. Connect with other high-signal student founders.
          </p>
        </header>

        <SearchBar onChange={() => {}} />

        <div className="flex gap-8 border-b border-[#2A2A2A] mb-8">
            {['Recommended', 'Tier 1 only', 'Same Campus', 'Cross-disciplinary'].map(tab => (
                <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`pb-4 text-[14px] font-bold transition-all relative ${
                    activeFilter === tab ? 'text-white' : 'text-[#888888] hover:text-[#CCCCCC]'
                }`}
                >
                {tab}
                {activeFilter === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00FF85]" />
                )}
                </button>
            ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={40} className="animate-spin text-[#00FF85]" />
          </div>
        ) : founders.length === 0 ? (
          <div className="text-center py-20">
            <Users size={48} className="text-[#2A2A2A] mx-auto mb-4" />
            <p className="text-[#888888] italic">Everyone is busy building. Check back later.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {founders.map(founder => (
              <FounderCard key={founder.id} founder={founder} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayoutV2>
  );
};

export default FounderMatching;
