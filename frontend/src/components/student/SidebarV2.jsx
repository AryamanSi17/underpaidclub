import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, User, Briefcase, Trophy, Users, MessageSquare, Shield, LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/bounties', icon: Briefcase, label: 'Bounties' },
  { to: '/cohort', icon: Trophy, label: 'Cohorts' },
  { to: '/founder', icon: Users, label: 'Find Co-founder' },
  { to: '/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/war-room', icon: Shield, label: 'War Room' },
];

export default function SidebarV2() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-[240px] h-screen bg-[#111111] border-r border-[#2A2A2A] flex flex-col fixed left-0 top-0 z-50">
      {/* Logo Area */}
      <div className="p-[20px] pt-[24px]">
        <h1 className="text-[#00FF85] font-mono font-bold text-[14px] tracking-widest uppercase">
          UNDERCLUB
        </h1>
      </div>

      {/* User Card */}
      <div className="px-[20px] mb-[20px]">
        <div className="bg-[#1A1A1A] rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#2A2A2A] flex items-center justify-center text-white font-bold text-xs">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[14px] font-bold truncate">{user?.name || 'User'}</p>
            <div className="flex items-center gap-1.5">
              <span className="text-[#00FF85] text-[10px] font-bold uppercase tracking-wider">Hustle: {user?.hustleScore || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] transition-all duration-200",
              isActive 
                ? "bg-[#1A1A1A] text-[#00FF85] border-l-[3px] border-[#00FF85] font-bold" 
                : "text-[#888888] hover:text-white hover:bg-[#1A1A1A]/50"
            )}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[#2A2A2A]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-[#888888] hover:text-[#FF4444] transition-colors text-[14px]"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
