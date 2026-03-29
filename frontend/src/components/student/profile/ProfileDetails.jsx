import React from 'react';
import ProfileField from './ProfileField';
import Card from '../../ui/Card';

const ProfileDetails = ({ form, set, user }) => {
  const isAlumni = user?.userType === 'alumni';

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
        
        {isAlumni ? (
            <ProfileField 
                label="Graduation Year" 
                value={form.graduationYear || ''} 
                onChange={(e) => set('graduationYear', e.target.value)} 
                type="number"
                placeholder="2024"
            />
        ) : (
            <ProfileField 
                label="Year of Study" 
                value={form.year || '3rd Year'} 
                type="select"
                options={['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year']}
                onChange={(e) => set('year', e.target.value)} 
            />
        )}

        <ProfileField 
          label="LinkedIn URL" 
          value={form.linkedin || ''} 
          onChange={(e) => set('linkedin', e.target.value)} 
          placeholder="https://linkedin.com/in/..."
        />

        {isAlumni && (
            <>
                <ProfileField 
                    label="Current Seniority" 
                    value={form.seniority || 'Individual Contributor'} 
                    type="select"
                    options={['Individual Contributor', 'Manager or Lead', 'Founding Team', 'Open to anything']}
                    onChange={(e) => set('seniority', e.target.value)} 
                />
                <ProfileField 
                    label="Role Preference" 
                    value={form.roleTypePreference || 'Both'} 
                    type="select"
                    options={['Tech', 'Non-Tech', 'Both']}
                    onChange={(e) => set('roleTypePreference', e.target.value)} 
                />
            </>
        )}
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

      {isAlumni && user?.alumniVerificationStatus !== 'verified' && (
        <div className="mt-8 p-6 bg-[#FFAA00]/5 border border-[#FFAA00]/20 rounded-xl">
            <h3 className="text-[#FFAA00] text-[14px] font-bold uppercase tracking-widest mb-2">Manual Verification Required</h3>
            <p className="text-[#888888] text-[13px] leading-relaxed mb-4">
                Since you lack an active institutional email, we need to verify your degree manually. Please upload your degree certificate or final marksheet.
            </p>
            <input 
                type="text"
                value={form.alumniDegreeCertificate || ''}
                onChange={(e) => set('alumniDegreeCertificate', e.target.value)}
                placeholder="Link to Certificate (Drive/Dropbox/etc)"
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white text-[14px] rounded-[8px] px-4 py-2 outline-none focus:border-[#00FF85] transition-all"
            />
        </div>
      )}
    </Card>
  );
};

export default ProfileDetails;
