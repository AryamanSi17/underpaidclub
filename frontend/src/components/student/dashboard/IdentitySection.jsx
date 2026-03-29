import React from 'react';

const IdentitySection = ({ user }) => {
  if (!user) return null;

  const firstName = user.name?.split(' ')[0] || 'Member';
  const isIndian = true; // Simple logic for now or prop
  const greeting = isIndian ? `Namaste, ${firstName}.` : `Good to see you, ${firstName}.`;

  return (
    <section className="mb-[48px]">
      <h1 className="text-[32px] md:text-[48px] font-bold text-white leading-tight mb-2">
        {greeting}
      </h1>
      <p className="text-[#888888] text-[16px] mb-4">
        {user.institution || 'Tier 1 Institution'} · {user.dept || 'Engineering'} · {user.year || '2026'}
      </p>
      
      <div className="flex items-center gap-2 text-[16px]">
        <span className="text-[#888888]">Hustle Score:</span>
        <span className="text-[#00FF85] font-bold">{user.hustleScore || '--'}/100</span>
        <span className="text-[#2A2A2A]">|</span>
        <span className="text-[#888888]">Top {user.percentile || 'XX'}% of TUC</span>
      </div>

      <p className="mt-6 text-[#CCCCCC] text-[16px] max-w-[600px]">
        {user.hustleScore >= 5 ? 
          `${user.profileViews || 0} founders checked you out today. No pressure though.` :
          "The grind continues. Your profile is looking sharper than yesterday."
        }
      </p>
    </section>
  );
};

export default IdentitySection;
