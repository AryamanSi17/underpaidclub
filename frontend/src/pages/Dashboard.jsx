import React from 'react';
import DashboardLayoutV2 from '../components/student/DashboardLayoutV2';
import DashboardHome from '../components/student/DashboardHome';

export default function Dashboard() {
  return (
    <DashboardLayoutV2>
      <DashboardHome />
    </DashboardLayoutV2>
  );
}
