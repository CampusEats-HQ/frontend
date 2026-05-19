import { useNavigate } from 'react-router';
import { ArrowLeft, Package, CheckCircle, Star, Gift, Bell } from 'lucide-react';

const notifications = [
  {
    id: '1',
    type: 'delivery',
    icon: CheckCircle,
    iconColor: '#10B981',
    iconBg: '#D1FAE5',
    title: 'Order Delivered!',
    message: 'Your order from Mavise Grill has been delivered',
    time: '5 mins ago',
    read: false,
  },
  {
    id: '2',
    type: 'order',
    icon: Package,
    iconColor: '#6366F1',
    iconBg: '#EEF2FF',
    title: 'Order Confirmed',
    message: 'Your order #ORD-1045 is being prepared',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'promo',
    icon: Gift,
    iconColor: '#F59E0B',
    iconBg: '#FEF3C7',
    title: '20% Off Your Next Order!',
    message: 'Use code UNILAG20 on orders above ₦2000',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'rating',
    icon: Star,
    iconColor: '#F59E0B',
    iconBg: '#FEF3C7',
    title: 'Rate Your Experience',
    message: 'How was your order from Jollof Palace?',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    type: 'order',
    icon: Package,
    iconColor: '#6366F1',
    iconBg: '#EEF2FF',
    title: 'Order On the Way',
    message: 'Emeka is delivering your order. ETA: 8 mins',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '6',
    type: 'delivery',
    icon: CheckCircle,
    iconColor: '#10B981',
    iconBg: '#D1FAE5',
    title: 'Order Delivered!',
    message: 'Your order from Suya Kingdom has been delivered',
    time: '2 days ago',
    read: true,
  },
];

export default function Notifications() {
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <button onClick={() => navigate('/home')} className="mr-4">
            <ArrowLeft size={24} style={{ color: '#1F2937' }} />
          </button>
          <h1 className="text-xl font-bold" style={{ color: '#1F2937' }}>
            Notifications
          </h1>
        </div>
        {unreadCount > 0 && (
          <div
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: '#EF4444', color: 'white' }}
          >
            {unreadCount} New
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} style={{ color: '#E0E0E0', margin: '0 auto 16px' }} />
            <p className="text-lg font-semibold mb-2" style={{ color: '#1F2937' }}>
              No notifications yet
            </p>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              We'll notify you about orders and promotions
            </p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: '#F8F9FA' }}>
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className="px-6 py-4 flex gap-3 hover:bg-gray-50 cursor-pointer"
                  style={{
                    backgroundColor: notification.read ? 'white' : '#F8F9FA',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: notification.iconBg }}
                  >
                    <Icon size={20} style={{ color: notification.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold text-sm" style={{ color: '#1F2937' }}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                          style={{ backgroundColor: '#6366F1' }}
                        />
                      )}
                    </div>
                    <p className="text-sm mb-1 break-words" style={{ color: '#6B7280' }}>
                      {notification.message}
                    </p>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>
                      {notification.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="px-6 py-6 border-t" style={{ borderColor: '#F8F9FA' }}>
          <button
            className="w-full max-w-4xl mx-auto h-10 rounded-lg text-sm font-medium"
            style={{ backgroundColor: '#F8F9FA', color: '#6B7280' }}
          >
            Mark All as Read
          </button>
        </div>
      )}
    </div>
  );
}
