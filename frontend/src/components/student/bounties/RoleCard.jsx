import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Bookmark, CheckCircle, Info, Zap } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const RoleCard = ({ role }) => {
  const { user } = useAuth();
  const isAlumni = user?.userType === 'alumni';

  if (!role) return null;

  return (
    <Card className="mb-4 relative group p-0 overflow-hidden" hoverEffect={true}>
      <div className="p-4 md:p-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-white text-[16px] md:text-[18px] font-bold uppercase truncate">{role.company}</h3>
                {role.stage && (
                <span className="bg-[#1A1A1A] text-[#888888] px-2 py-0.5 rounded text-[10px] font-bold border border-[#2A2A2A]">
                    {role.stage}
                </span>
                )}
                {role.platinum && (
                <span className="bg-[#C9B037]/10 text-[#C9B037] px-2 py-0.5 rounded text-[10px] font-bold border border-[#C9B037]/20">
                    PLATINUM
                </span>
                )}
            </div>
            <div className="flex items-center gap-1.5 text-[#888888] text-[12px]">
                <CheckCircle size={12} className="text-[#00FF85]" />
                Posted by Verified Founder
            </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-3">
                <div className="md:text-right">
                    <div className="text-white text-[16px] font-bold">{role.compensation}</div>
                    <div className="text-[#888888] text-[12px]">{role.type} · {role.duration}</div>
                </div>
                <button className="text-[#888888] hover:text-[#00FF85] transition-colors">
                    <Bookmark size={20} />
                </button>
            </div>
        </div>

        {/* Center Section */}
        <div className="mb-6">
            <h2 className="text-white text-[18px] md:text-[20px] font-bold mb-2">{role.title}</h2>
            <p className="text-[#888888] text-[14px] line-clamp-2 max-w-[600px] leading-relaxed">
            {role.description || "Own the full growth funnel for a D2C brand. Work directly with foundations team."}
            </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex flex-wrap gap-2">
                {(role.skills || ['Product', 'Growth', 'SQL']).map(skill => (
                    <span key={skill} className="bg-[#1A1A1A] text-[#888888] px-3 py-1 rounded-full text-[12px] border border-[#2A2A2A]">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-4">
                <div className="flex items-center gap-1.5 bg-[#00FF85]/10 text-[#00FF85] px-3 py-1 rounded-full text-[12px] font-bold">
                    {role.match}% match <Info size={14} className="opacity-50 cursor-help" />
                </div>
                <Button variant="primary" className="py-2 ml-auto md:ml-0 px-6">
                    REQUEST INTRO
                </Button>
            </div>
        </div>
      </div>

      {/* Alumni Exclusive: Why Great Fit */}
      {isAlumni && role.whyFit && (
          <div className="bg-[#00FF85]/5 border-t border-[#2A2A2A] p-6 mt-2">
              <div className="flex items-center gap-2 mb-4">
                  <Zap size={14} className="text-[#00FF85]" fill="currentColor" />
                  <span className="text-white text-[11px] font-bold uppercase tracking-widest">Why you are a great fit (Alumni Exclusive)</span>
              </div>
              <ul className="space-y-3">
                  {role.whyFit.map((bullet, i) => (
                      <li key={i} className="text-[#BBBBBB] text-[13px] flex gap-3">
                          <span className="text-[#00FF85] shrink-0">•</span>
                          {bullet}
                      </li>
                  ))}
              </ul>
          </div>
      )}
    </Card>
  );
};

export default RoleCard;
