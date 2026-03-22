import { useState } from 'react';
import Sidebar from './Sidebar';
import Footer from '../Footer';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[var(--black)] text-[var(--text)] font-sans relative overflow-hidden">
      {/* GLOBAL BACKGROUND EFFECTS */}
      <div className="hero-grain" style={{ opacity: 0.3 }}></div>
      <div className="hero-mesh" style={{ opacity: 0.4, transform: 'scale(1.2)' }}></div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/80 md:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — drawer on mobile, inline on desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-30 transition-transform duration-300 md:static md:translate-x-0 md:z-auto ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setMobileOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 h-screen overflow-auto">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-10 flex items-center gap-4 px-4 py-3 bg-[var(--dark)] border-b border-[var(--border)]">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Menu size={22} />
          </button>
          <div className="branding">
            <div className="branding-dot"></div>
            <div className="branding-main">
              <span className="branding-underestimate">underestimate</span>
              <span className="branding-club">Club</span>
            </div>
          </div>
          {user?.hustleScore != null && (
            <span className="ml-auto text-[var(--o3)] font-black text-sm">{user.hustleScore}/100</span>
          )}
        </header>

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
