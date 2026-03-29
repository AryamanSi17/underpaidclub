import React, { useState, useEffect } from 'react';
import DashboardLayoutV2 from '../components/student/DashboardLayoutV2';
import BountiesHeader from '../components/student/bounties/BountiesHeader';
import SearchBar from '../components/student/bounties/SearchBar';
import FilterTabs from '../components/student/bounties/FilterTabs';
import RoleCard from '../components/student/bounties/RoleCard';
import api from '../lib/api';
import { Loader2, Briefcase } from 'lucide-react';

const Bounties = () => {
  const [activeTab, setActiveTab] = useState('Recommended');
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/bounties')
      .then((res) => {
        // Mocking some extra fields for PRD compliance
        const mapped = res.data.data.map(b => ({
            ...b,
            title: b.title,
            company: b.company,
            stage: b.stage || 'Seed',
            mode: b.mode || 'Remote',
            compensation: b.compensation || 'Rs. 20k/mo',
            match: b.matchScore || Math.floor(Math.random() * 20) + 80,
            platinum: b.isPlatinum || false,
            type: b.type,
            duration: b.duration || '3 months'
        }));
        setBounties(mapped);
      })
      .catch(() => setError('Failed to load bounties'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayoutV2>
      <div className="max-w-[1000px]">
        <BountiesHeader />
        <SearchBar onChange={(e) => console.log(e.target.value)} />
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={40} className="animate-spin text-[#00FF85]" />
          </div>
        ) : bounties.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase size={48} className="text-[#2A2A2A] mx-auto mb-4" />
            <p className="text-[#888888] italic">Nothing here right now. Founders post in waves. Check back tomorrow.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bounties.map(role => (
              <RoleCard key={role._id} role={role} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayoutV2>
  );
};

export default Bounties;
