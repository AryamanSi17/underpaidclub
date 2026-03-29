import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Info } from 'lucide-react';

const BestMatchCard = ({ role }) => {
  if (!role) return (
    <Card className="mb-[48px] py-10 flex flex-col items-center justify-center text-center">
        <p className="text-[#888888] mb-4">Complete your profile to unlock your matches.</p>
        <Button variant="primary">Finish my profile (4 minutes)</Button>
    </Card>
  );

  return (
    <section className="mb-[48px]">
      <div className="text-[12px] text-[#888888] font-bold uppercase mb-4 tracking-widest flex items-center gap-2">
        YOUR BEST MATCH TODAY
      </div>
      <Card className="relative overflow-hidden">
        {/* Match Percentage Badge */}
        <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-[#00FF85]/10 text-[#00FF85] px-3 py-1 rounded-full text-[12px] font-bold">
          {role.match}% match <Info size={14} className="opacity-50" />
        </div>

        <div className="mb-6">
          <h2 className="text-[22px] font-bold text-white mb-2">
            {role.title} — {role.company}
          </h2>
          <p className="text-[#888888] text-[14px]">
            {role.stage} · {role.mode} · {role.compensation}
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant="primary" className="flex-1 max-w-[200px]">
            REQUEST INTRO
          </Button>
          <Button variant="ghost" className="flex-1 max-w-[200px]">
            See all {role.totalMatches || 0} roles
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default BestMatchCard;
