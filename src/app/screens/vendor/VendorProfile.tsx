import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../../services/auth';
import { vendorService } from '../../services/vendor';

interface ProfileData {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  contact: string;
  bankAccount: string;
}

export default function VendorProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorService.getProfile()
      .then((res) => setProfile(res))
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/vendor/login');
  };

  const settingsItems = [
    { icon: '🕐', label: 'Opening Hours', path: '/vendor/profile' },
    { icon: '📱', label: 'Contact Number', path: '/vendor/profile' },
    { icon: '🏦', label: 'Bank Account', path: '/vendor/profile' },
    { icon: '🔔', label: 'Notifications', path: '/vendor/profile' },
    { icon: '🔒', label: 'Change Password', path: '/vendor/profile' },
    { icon: '❓', label: 'Help & Support', path: '/vendor/profile' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[480px] mx-auto px-5 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-8 text-gray-800">
          Profile & Settings
        </h1>

        {/* Restaurant Profile */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={profile?.image ?? ''}
              alt={profile?.name ?? 'Restaurant'}
              className="w-full h-full rounded-xl object-cover"
            />
            <button
              type="button"
              aria-label="Change restaurant photo"
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500"
            >
              <Camera size={18} color="white" />
            </button>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-lg font-bold mb-1 text-gray-800">
              {profile?.name ?? ''}
            </h2>
            <p className="text-sm mb-1 text-gray-500">
              {profile?.category ?? ''}
            </p>
            <p className="text-sm text-gray-500">
              {profile?.location ?? ''}
            </p>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="space-y-1 mb-6">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => navigate(item.path)}
              className="w-full flex items-center justify-between py-4 border-b border-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-gray-800">
                  {item.label}
                </span>
              </div>
              <ChevronRight size={20} className="text-gray-500" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px my-6 bg-gray-300" />

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-4 text-center font-medium text-indigo-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
