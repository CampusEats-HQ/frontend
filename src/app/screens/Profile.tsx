import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Edit, Package, MapPin, Bell, CreditCard, GraduationCap, Settings, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { profileService } from '../services/orders';
import { authService } from '../services/auth';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ id: string; firstName: string; lastName: string; email: string; phone: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileService.get()
      .then((res) => setProfile(res))
      .catch((err: Error) => {
        if (err?.message?.includes('404') || err?.message?.toLowerCase().includes('not found')) {
          authService.logout();
          navigate('/login');
        } else {
          toast.error('Failed to load profile');
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const menuItems = [
    { icon: Package,         label: 'My Orders',            path: '/orders' },
    { icon: MapPin,          label: 'Saved Addresses',       path: '/addresses' },
    { icon: Bell,            label: 'Notifications',         path: '/notifications' },
    { icon: CreditCard,      label: 'Payment Methods',       path: '/profile' },
    { icon: GraduationCap,   label: 'Student Verification',  path: '/profile' },
    { icon: Settings,        label: 'Settings',              path: '/profile' },
    { icon: HelpCircle,      label: 'Help & Support',        path: '/help' },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const displayName = profile ? `${profile.firstName} ${profile.lastName}`.trim() : '';
  const displayEmail = profile?.email ?? '';
  const initials = displayName
    ? displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto md:max-w-4xl px-5 py-6">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Profile</h1>

        {/* User Info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold bg-indigo-500 text-white">
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-gray-800">{displayName}</h2>
              <button type="button" aria-label="Edit profile">
                <Edit size={16} className="text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500">{displayEmail}</p>
          </div>
        </div>

        {/* Menu List */}
        <div className="space-y-1">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <button
              key={label}
              type="button"
              onClick={() => navigate(path)}
              className="w-full flex items-center justify-between py-4 border-b border-gray-100"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-gray-400" />
                <span className="font-medium text-gray-800">{label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>

        <div className="h-px my-6 bg-gray-200" />

        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-4 text-left font-medium text-red-500"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
