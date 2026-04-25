import {
  LayoutDashboard,
  Compass,
  MessageSquare,
  Bell,
  Zap,
  LogOut,
  Rocket,
} from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Compass, label: 'Roadmap', path: '/roadmap' },
  { icon: MessageSquare, label: 'AI Assistant', path: '/assistant' },
  { icon: Bell, label: 'Updates', path: '/updates' },
  { icon: Zap, label: 'Recommendations', path: '/recommendations' },
] as const;

export function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside
      className="w-64 glass-panel rounded-[40px] flex flex-col m-6 overflow-hidden shrink-0"
      aria-label="Main navigation"
    >
      <div className="p-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 font-bold text-xl tracking-tight text-white"
          aria-label="BizLaunch AI — Go to dashboard"
        >
          <div className="bg-indigo-600 shadow-lg shadow-indigo-500/20 text-white p-2 rounded-xl">
            <Rocket size={20} aria-hidden="true" />
          </div>
          BizLaunch
        </Link>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1" aria-label="Dashboard sections">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-white/10 text-white border-l-2 border-indigo-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
              )
            }
          >
            <item.icon size={18} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-4">
        {/* AI Status Widget */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              aria-hidden="true"
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              AI Engine active
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Next:{' '}
            <Link
              to="/roadmap"
              className="text-white underline underline-offset-2 decoration-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Berlin Pilot
            </Link>
          </p>
        </div>

        {/* User info */}
        {user && (
          <div className="px-4 py-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 truncate">
              {user.name}
            </p>
            <p className="text-[10px] text-slate-600 truncate">{user.email}</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
          aria-label="Sign out"
        >
          <LogOut size={18} aria-hidden="true" />
          Sign out
        </button>
      </div>
    </aside>
  );
}