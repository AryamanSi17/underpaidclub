import React from 'react';

const FilterChips = ({ userType }) => {
  const isAlumni = userType === 'alumni';
  
  const studentFilters = [
    'Internship', 'Full-time', 'Product', 'Tech', 'Strategy', 'Marketing', 'Founder\'s Office'
  ];
  
  const alumniFilters = [
    'Full-time', 'Fractional', 'Advisory', 'IC', 'Lead', 'Manager', 'Founding Team', '12 LPA+', '20 LPA+'
  ];

  const currentFilters = isAlumni ? alumniFilters : studentFilters;

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
      {currentFilters.map(filter => (
        <button 
          key={filter}
          className="whitespace-nowrap px-4 py-2 rounded-full border border-[#2A2A2A] text-[#888888] text-[13px] hover:border-[#00FF85] hover:text-white transition-all font-bold"
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
