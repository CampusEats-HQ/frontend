import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Bell, User, LayoutDashboard, ClipboardList, Users, DollarSign, Megaphone, Menu, X, Moon, Sun } from 'lucide-react';

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
  const [dark, setDark] = useState(() => localStorage.getItem('ce_admin_theme') === 'dark');

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ce_admin_theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Remove dark class when leaving admin pages
  useEffect(() => {
    return () => { document.documentElement.classList.remove('dark'); };
  }, []);

  return (
    <>
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">CampusEats Admin</h1>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-1">
            {NAV_LINKS.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === to
                    ? 'bg-blue-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300 font-medium'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
              >
                {Icon && <Icon size={18} />}
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={() => setDark((v) => !v)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {dark
              ? <Sun size={18} className="text-amber-400" />
              : <Moon size={18} className="text-gray-500" />
            }
          </button>

          <button type="button" className="relative" aria-label="Notifications">
            <Bell size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
          <button type="button" aria-label="Profile" className="hidden lg:block">
            <User size={20} className="text-gray-500 dark:text-gray-400" />
          </button>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-1"
          >
            {menuOpen
              ? <X size={24} className="text-gray-800 dark:text-gray-100" />
              : <Menu size={24} className="text-gray-800 dark:text-gray-100" />
            }
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2 space-y-1">
          {NAV_LINKS.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                pathname === to
                  ? 'bg-blue-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300 font-medium'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
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
