import { useState } from 'react';
import { NavLink, Outlet, Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, Calendar, ClipboardList, CreditCard, 
  BarChart2, Trophy, MessageSquare, Bell, LogOut, Menu 
} from 'lucide-react';
import toast from 'react-hot-toast';

const navItems = [
  { path: '/admin', label: 'DASHBOARD', icon: <LayoutDashboard size={20} />, exact: true },
  { path: '/admin/events', label: 'EVENTS', icon: <Calendar size={20} /> },
  { path: '/admin/registrations', label: 'REGISTRATIONS', icon: <ClipboardList size={20} /> },
  { path: '/admin/payments', label: 'PAYMENTS', icon: <CreditCard size={20} /> },
  { path: '/admin/leaderboard', label: 'LEADERBOARD', icon: <BarChart2 size={20} /> },
  { path: '/admin/winners', label: 'WINNERS', icon: <Trophy size={20} /> },
  { path: '/admin/support', label: 'SUPPORT', icon: <MessageSquare size={20} /> },
  { path: '/admin/notifications', label: 'NOTIFICATIONS', icon: <Bell size={20} /> },
];

export default function AdminLayout() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'admin') return <Navigate to="/dashboard" />;

  const handleLogout = () => {
    logout();
    toast.success('Logged out from Admin Panel');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-void flex text-primary font-mono select-none">
      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-void/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-[#0A0A10] border-r border-fire/10 transform transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Admin Header */}
          <div className="p-8 border-b border-fire/5">
            <Link to="/admin" className="flex items-center gap-3 group">
              <img 
                src="/logo.jpeg" 
                alt="IGNITE Logo" 
                className="h-8 w-auto object-contain"
              />
            </Link>
            <div className="text-[9px] text-muted tracking-[3px] uppercase mt-4">Central Admin Octagon</div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto no-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-300 group
                  ${isActive 
                    ? 'bg-fire/10 border-l-4 border-fire text-fire shadow-[0_0_20px_rgba(255,107,0,0.1)]' 
                    : 'text-muted hover:text-primary hover:bg-white/5'}
                `}
              >
                <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                <span className="font-ui text-[13px] tracking-[2px] font-bold">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-6 border-t border-fire/5 bg-void/50">
            <div className="flex items-center gap-4 mb-6 px-4">
              <div className="w-10 h-10 bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-primary truncate leading-none mb-1 uppercase">{user.name}</div>
                <div className="text-[10px] text-muted truncate">ROOT PRIVILEGES</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-3 text-muted hover:text-fire hover:bg-fire/5 transition-all font-ui text-[11px] tracking-[2px] uppercase font-bold"
            >
              <LogOut size={16} /> LOGOUT SESSION
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 flex items-center justify-between px-6 bg-[#0A0A10] border-b border-fire/10">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-primary hover:text-fire transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="font-display text-xl text-fire tracking-[3px]">IGNITE ADMIN</div>
          <div className="w-6" /> {/* Placeholder for layout balance */}
        </header>

        {/* Dynamic Page Scroll Control */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="p-6 md:p-12 lg:p-16 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
          
          {/* Subtle grid accent for admin */}
          <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-fire/5 blur-[150px] -z-10 rounded-full" />
        </div>
      </main>
    </div>
  );
}
