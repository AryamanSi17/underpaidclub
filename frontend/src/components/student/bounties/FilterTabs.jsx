import React from 'react';

const FilterTabs = ({ activeTab, onTabChange }) => {
  const tabs = ['Recommended', 'All roles', 'Saved'];
  
  return (
    <div className="flex gap-4 md:gap-8 border-b border-[#2A2A2A] mb-8 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-4 text-[14px] md:text-[16px] font-bold transition-all relative shrink-0 ${
            activeTab === tab ? 'text-white' : 'text-[#888888] hover:text-[#CCCCCC]'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00FF85]" />
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
