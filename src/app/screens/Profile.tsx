import { useNavigate } from 'react-router';
import { ChevronRight, Edit } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: '📦', label: 'My Orders', path: '/orders' },
    { icon: '📍', label: 'Saved Addresses', path: '/addresses' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
    { icon: '💳', label: 'Payment Methods', path: '/profile' },
    { icon: '🎓', label: 'Student Verification', path: '/profile' },
    { icon: '⚙️', label: 'Settings', path: '/profile' },
    { icon: '❓', label: 'Help & Support', path: '/help' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto md:max-w-4xl px-5 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-8" style={{ color: '#1F2937' }}>
          Profile
        </h1>

        {/* User Info */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
            style={{ backgroundColor: '#6366F1', color: 'white' }}
          >
            JD
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold" style={{ color: '#1F2937' }}>
                John Doe
              </h2>
              <button>
                <Edit size={16} style={{ color: '#6B7280' }} />
              </button>
            </div>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              john.doe@unilag.edu.ng
            </p>
          </div>
        </div>

        {/* Menu List */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
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
          onClick={() => navigate('/')}
          className="w-full py-4 text-left font-medium"
          style={{ color: '#6366F1' }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
