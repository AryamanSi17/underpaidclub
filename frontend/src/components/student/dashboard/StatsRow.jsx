import React from 'react';
import Card from '../../ui/Card';

const StatTile = ({ label, value, color = "#00FF85" }) => {
  const isZero = value === 0 || !value;
  const displayColor = isZero ? "#888888" : color;

  return (
    <Card className="flex-1 text-center py-8" hoverEffect={false}>
      <div 
        className="text-[36px] font-bold mb-1" 
        style={{ color: displayColor }}
      >
        {value || 0}
      </div>
      <div className="text-[#888888] text-[13px] uppercase tracking-wider">
        {label}
      </div>
    </Card>
  );
};

const StatsRow = ({ rolesMatched, introsSent, pendingReplies }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      <StatTile label="Roles Matched" value={rolesMatched} />
      <StatTile label="Intros Sent" value={introsSent} />
      <StatTile 
        label="Pending Reply" 
        value={pendingReplies} 
        color={pendingReplies > 0 ? "#FFAA00" : "#00FF85"} 
      />
    </div>
  );
};

export default StatsRow;
