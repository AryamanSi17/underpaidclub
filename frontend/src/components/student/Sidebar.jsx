import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, User, Zap, FileText, Briefcase,
  Users, Trophy, LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react';

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/gauntlet', icon: Zap, label: 'The Gauntlet' },
  { to: '/resume', icon: FileText, label: 'Resume' },
  { to: '/bounties', icon: Briefcase, label: 'Bounties' },
  { to: '/cohort', icon: Trophy, label: 'Cohort' },
  { to: '/community', icon: Users, label: 'War Room', requireFull: true },
];

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isProfileFull = user?.profileComplete && user?.linkedin && user?.github &&
    user?.college && user?.bio;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNav = () => {
    // Close drawer on mobile after navigation
    onClose?.();
  };

  return (
    <aside
      className="relative h-full min-h-screen bg-[var(--dark)] border-r border-[var(--border)] flex flex-col transition-all duration-300"
      style={{ width: collapsed ? '72px' : '240px' }}
    >
      {/* Collapse toggle — desktop only */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="hidden md:flex absolute -right-3.5 top-7 z-10 w-7 h-7 rounded-full bg-[var(--card)] border border-[var(--border-hot)] items-center justify-center text-zinc-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className={`border-b border-[var(--border)] flex items-center ${collapsed ? 'p-4 justify-center' : 'p-5'}`}>
        {collapsed ? (
          <span className="text-[var(--o2)] font-black text-lg">T</span>
        ) : (
          <div className="branding">
            <div className="branding-dot"></div>
            <div className="branding-main">
              <span className="branding-underestimate">underestimate</span>
              <span className="branding-club">Club</span>
            </div>
          </div>
        )}
      </div>

      {/* User Info */}
      <div className={`border-b border-[var(--border)] flex items-center gap-3 ${collapsed ? 'p-4 justify-center' : 'p-4'}`}>
        {user?.photo ? (
          <img src={user.photo} alt={user.name} className="w-9 h-9 rounded-full object-cover shrink-0 border border-[var(--border-hot)]" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[var(--surface)] flex items-center justify-center text-white font-bold text-base shrink-0 border border-[var(--border)]">
            {user?.name?.[0]}
          </div>
        )}
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-[var(--text)] text-sm font-semibold truncate">{user?.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              {user?.hustleScore != null && (
                <span className="text-[var(--o3)] text-xs font-bold">{user.hustleScore}/100</span>
              )}
              {user?.badges?.includes('platinum') && (
                <span className="text-[10px] bg-[var(--o1)] text-white px-1.5 py-0.5 rounded font-bold tracking-wide">PLATINUM</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 py-3 space-y-0.5 ${collapsed ? 'px-2' : 'px-3'}`}>
        {NAV.map(({ to, icon: Icon, label, requireFull }) => {
          const locked = requireFull && !isProfileFull;

          if (locked) {
            return (
              <div
                key={to}
                title={label}
                className={`flex items-center rounded-lg text-zinc-700 cursor-not-allowed select-none ${
                  collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-3'
                }`}
              >
                <Icon size={20} />
                {!collapsed && <span className="text-base">{label}</span>}
                {!collapsed && <span className="ml-auto text-xs opacity-50">🔒</span>}
              </div>
            );
          }

          return (
            <NavLink
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              onClick={handleNav}
              className={({ isActive }) =>
                `flex items-center rounded-lg text-base transition-colors ${
                  collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-3'
                } ${
                  isActive
                    ? 'bg-[var(--surface)] text-[var(--o3)] font-semibold border-l-2 border-[var(--o2)]'
                    : 'text-[var(--muted)] hover:text-white hover:bg-[var(--surface)]'
                }`
              }
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={`border-t border-[var(--border)] py-3 ${collapsed ? 'px-2' : 'px-3'}`}>
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center rounded-lg text-base text-[var(--muted)] hover:text-red-400 hover:bg-red-400/10 transition-colors ${
            collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-3'
          }`}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
