import React from 'react';
import SidebarV2 from './SidebarV2';

export default function DashboardLayoutV2({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-mono flex">
      <SidebarV2 />
      
      <main className="flex-1 lg:ml-[240px] mt-16 lg:mt-0 mb-16 lg:mb-0 min-h-screen relative overflow-x-hidden transition-all duration-300">
        {/* GLOBAL BACKGROUND EFFECTS */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#00FF8511_0%,transparent_50%)]" />
        </div>

        <div className="relative z-10 p-6 lg:p-[32px] max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
