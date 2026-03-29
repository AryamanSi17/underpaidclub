import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onChange }) => {
  return (
    <div className="relative mb-8">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]">
        <Search size={20} />
      </div>
      <input 
        type="text" 
        placeholder="Search roles, companies, skills..."
        onChange={onChange}
        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white py-4 pl-12 pr-6 rounded-xl outline-none focus:border-[#00FF85] transition-all text-[16px] placeholder:text-[#888888]"
      />
    </div>
  );
};

export default SearchBar;
