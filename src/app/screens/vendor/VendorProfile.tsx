import { useNavigate } from 'react-router';
import { ChevronRight, Camera } from 'lucide-react';
import { vendorProfile } from '../../data/vendorMockData';

export default function VendorProfile() {
  const navigate = useNavigate();

  const settingsItems = [
    { icon: '🕐', label: 'Opening Hours', path: '/vendor/profile' },
    { icon: '📱', label: 'Contact Number', path: '/vendor/profile' },
    { icon: '🏦', label: 'Bank Account', path: '/vendor/profile' },
    { icon: '🔔', label: 'Notifications', path: '/vendor/profile' },
    { icon: '🔒', label: 'Change Password', path: '/vendor/profile' },
    { icon: '❓', label: 'Help & Support', path: '/vendor/profile' },
  ];

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
              src={vendorProfile.image}
              alt={vendorProfile.name}
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
              {vendorProfile.name}
            </h2>
            <p className="text-sm mb-1 text-gray-500">
              {vendorProfile.category}
            </p>
            <p className="text-sm text-gray-500">
              {vendorProfile.location}
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
          onClick={() => navigate('/vendor/login')}
          className="w-full py-4 text-center font-medium text-indigo-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
