import React from 'react';
import Button from '../../ui/Button';

const ProfileCompletionBanner = ({ percentage }) => {
  if (percentage >= 100) return null;

  return (
    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 mb-10 flex items-center justify-between gap-6">
      <div className="flex-1">
        <div className="text-white text-[16px] font-bold mb-1">
          Your profile is {percentage}% done.
        </div>
        <div className="text-[#888888] text-[14px]">
          The last {100 - percentage}% is where the good matches hide.
        </div>
      </div>
      <Button variant="primary">
        Finish it (4 minutes)
      </Button>
    </div>
  );
};

export default ProfileCompletionBanner;
