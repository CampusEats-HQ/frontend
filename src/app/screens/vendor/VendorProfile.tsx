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
        <h1 className="text-2xl font-bold mb-8" style={{ color: '#1F2937' }}>
          Profile & Settings
        </h1>

        {/* Restaurant Profile */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div
              className="w-full h-full rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${vendorProfile.image})` }}
            />
            <button
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#6366F1' }}
            >
              <Camera size={18} color="white" />
            </button>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-lg font-bold mb-1" style={{ color: '#1F2937' }}>
              {vendorProfile.name}
            </h2>
            <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
              {vendorProfile.category}
            </p>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              {vendorProfile.location}
            </p>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="space-y-1 mb-6">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center justify-between py-4 border-b"
              style={{ borderColor: '#F8F9FA' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium" style={{ color: '#1F2937' }}>
                  {item.label}
                </span>
              </div>
              <ChevronRight size={20} style={{ color: '#6B7280' }} />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px my-6" style={{ backgroundColor: '#E0E0E0' }} />

        {/* Logout */}
        <button
          onClick={() => navigate('/vendor/login')}
          className="w-full py-4 text-center font-medium"
          style={{ color: '#6366F1' }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
