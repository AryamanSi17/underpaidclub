import React, { useState, useEffect } from 'react';
import DashboardLayoutV2 from '../components/student/DashboardLayoutV2';
import BountiesHeader from '../components/student/bounties/BountiesHeader';
import SearchBar from '../components/student/bounties/SearchBar';
import FilterTabs from '../components/student/bounties/FilterTabs';
import FilterChips from '../components/student/bounties/FilterChips';
import RoleCard from '../components/student/bounties/RoleCard';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api.service';
import { Loader2, Briefcase } from 'lucide-react';

const Bounties = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Recommended');
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiService.bounties.getAll()
      .then((res) => {
        const mapped = res.data.data.map(b => ({
            ...b,
            match: b.matchScore || Math.floor(Math.random() * 20) + 80,
            platinum: b.isPlatinum || false,
            whyFit: user?.userType === 'alumni' ? [
                "Your 2+ years of experience in React aligns with their Series B growth phase.",
                "Previous founding experience makes you a strong 'Founder's Office' candidate.",
                "Your Hustle Score (84) is in the top 5% of TUC members."
            ] : null,
            type: b.type,
            duration: b.duration || '3 months'
        }));
        setBounties(mapped);
      })
      .catch(() => setError('Failed to load bounties'))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <DashboardLayoutV2>
      <div className="max-w-[1000px]">
        <BountiesHeader />
        <SearchBar onChange={(e) => console.log(e.target.value)} />
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <FilterChips userType={user?.userType} />

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
