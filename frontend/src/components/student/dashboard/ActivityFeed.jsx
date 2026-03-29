import React from 'react';

const ActivityItem = ({ type, message, timestamp }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 border-b border-[#2A2A2A]/50 last:border-0 hover:bg-white/5 px-4 rounded-lg transition-all duration-200 gap-1 sm:gap-4">
      <div className="text-white text-[14px] leading-relaxed">
        {message}
      </div>
      <div className="text-[#888888] text-[12px] whitespace-nowrap">
        {timestamp}
      </div>
    </div>
  );
};

const ActivityFeed = ({ activities = [] }) => {
  return (
    <section className="mb-[48px]">
      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="text-[12px] text-[#888888] font-bold uppercase tracking-widest">
            WHAT'S BEEN HAPPENING
          </div>
          <div className="text-[#888888] text-[12px] italic">
            (while you were probably in class)
          </div>
        </div>
        <button className="text-[#888888] hover:text-white text-[12px] underline transition-colors">
          See all activity
        </button>
      </div>

      <div className="bg-[#111111]/30 rounded-xl overflow-hidden">
        {activities.length > 0 ? (
          activities.slice(0, 4).map((activity, index) => (
            <ActivityItem 
              key={index} 
              type={activity.type} 
              message={activity.message} 
              timestamp={activity.timestamp} 
            />
          ))
        ) : (
          <div className="py-10 text-center text-[#888888] italic text-[14px]">
            No recent activity. Keep applying!
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivityFeed;
