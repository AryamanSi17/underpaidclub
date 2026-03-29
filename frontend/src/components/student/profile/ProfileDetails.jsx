import React from 'react';
import ProfileField from './ProfileField';

const ProfileDetails = ({ form, set, user }) => {
  return (
    <Card className="mb-8" hoverEffect={false}>
      <h2 className="text-white text-[22px] font-bold mb-6">Profile Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <ProfileField 
          label="Full Name" 
          value={user?.name || ''} 
          onChange={(e) => set('name', e.target.value)} 
        />
        <ProfileField 
          label="Email Address" 
          value={user?.email || ''} 
          readOnly={true} 
        />
        <ProfileField 
          label="Institution" 
          value={user?.institution || 'IIT Bombay'} 
          readOnly={true} 
        />
        <ProfileField 
          label="Department" 
          value={form.branch || ''} 
          onChange={(e) => set('branch', e.target.value)} 
          placeholder="e.g. Computer Science"
        />
        <ProfileField 
          label="Year of Study" 
          value={form.year || '3rd Year'} 
          type="select"
          options={['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year', 'Alumni']}
          onChange={(e) => set('year', e.target.value)} 
        />
        <ProfileField 
          label="LinkedIn URL" 
          value={form.linkedin || ''} 
          onChange={(e) => set('linkedin', e.target.value)} 
          placeholder="https://linkedin.com/in/..."
        />
      </div>

      <div className="mt-4">
        <label className="block text-[#888888] text-[12px] font-bold uppercase tracking-widest mb-2">
            Bio (200 chars max)
        </label>
        <textarea 
            value={form.bio || ''} 
            onChange={(e) => set('bio', e.target.value)}
            placeholder="One line about what you build or care about."
            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white text-[16px] rounded-[8px] px-4 py-3 outline-none focus:border-[#00FF85] transition-all min-h-[100px] resize-none"
        />
      </div>
    </Card>
  );
};

export default ProfileDetails;
import Card from '../../ui/Card';
