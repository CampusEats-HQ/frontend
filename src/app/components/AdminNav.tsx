import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Bell, User, LayoutDashboard, ClipboardList, Users, DollarSign, Megaphone, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/admin/people', icon: Users, label: 'People' },
  { to: '/admin/analytics', icon: null, label: 'Analytics' },
  { to: '/admin/finance', icon: DollarSign, label: 'Finance' },
  { to: '/admin/promotions', icon: Megaphone, label: 'Promotions' },
];

export default function AdminNav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-gray-800">CampusEats Admin</h1>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-1">
            {NAV_LINKS.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === to
                    ? 'bg-blue-100 text-indigo-500 font-medium'
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                {Icon && <Icon size={18} />}
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className="relative" aria-label="Notifications">
            <Bell size={20} className="text-gray-500" />
          </button>
          <button type="button" aria-label="Profile" className="hidden lg:block">
            <User size={20} className="text-gray-500" />
          </button>
          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-1"
          >
            {menuOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2 space-y-1">
          {NAV_LINKS.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                pathname === to
                  ? 'bg-blue-100 text-indigo-500 font-medium'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {Icon && <Icon size={18} />}
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
