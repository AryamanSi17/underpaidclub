import React from 'react';
import { Check } from 'lucide-react';

const ProfileField = ({ label, value, readOnly = false, type = "text", onChange, options = [] }) => {
  return (
    <div className="mb-6">
      <label className="block text-[#888888] text-[12px] font-bold uppercase tracking-widest mb-2">
        {label}
      </label>
      <div className="relative">
        {type === "select" ? (
          <select 
            value={value} 
            onChange={onChange}
            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white text-[16px] rounded-[8px] px-4 py-3 outline-none focus:border-[#00FF85] transition-all appearance-none"
          >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <div className="flex items-center">
            <input 
              type={type} 
              value={value} 
              disabled={readOnly}
              onChange={onChange}
              className={`w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white text-[16px] rounded-[8px] px-4 py-3 outline-none transition-all ${readOnly ? 'opacity-60 cursor-not-allowed' : 'focus:border-[#00FF85]'}`}
            />
            {readOnly && (
              <div className="absolute right-4 text-[#00FF85]">
                <Check size={18} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileField;
