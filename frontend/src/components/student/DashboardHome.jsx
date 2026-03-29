import React, { useState, useEffect } from 'react';
import IdentitySection from './dashboard/IdentitySection';
import StatsRow from './dashboard/StatsRow';
import BestMatchCard from './dashboard/BestMatchCard';
import ActivityFeed from './dashboard/ActivityFeed';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/api.service';
import { formatDistanceToNow } from 'date-fns';

const DashboardHome = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.activity.getRecent();
        const mapped = res.data.data.map(act => ({
            ...act,
            message: act.message,
            timestamp: formatDistanceToNow(new Date(act.createdAt)) + ' ago'
        }));
        setActivities(mapped);
      } catch (err) {
        console.error('Failed to fetch activities');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Use real user stats if available, otherwise mock for demo
  const stats = {
    rolesMatched: user?.rolesMatched || 12,
    introsSent: user?.introsSent || 3,
    pendingReplies: user?.pendingReplies || 2
  };

  const bestMatch = {
    title: "Product Intern — Growth and Retention",
    company: "Zepto",
    stage: "Series D",
    mode: "In-office",
    compensation: "Rs. 25,000/mo",
    match: 94,
    totalMatches: 8
  };

  return (
    <div className="max-w-[800px]">
      <IdentitySection user={user} />
      <StatsRow {...stats} />
      <BestMatchCard role={bestMatch} />
      <ActivityFeed activities={activities} loading={loading} />
    </div>
  );
};

export default DashboardHome;
