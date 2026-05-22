import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Package, CheckCircle, Star, Gift, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { notificationService } from '../services/orders';
import type { Notification } from '../services/orders';

function getIconProps(type: Notification['type']) {
  switch (type) {
    case 'delivery':
      return { Icon: CheckCircle, iconColorClass: 'text-emerald-500', iconBgClass: 'bg-emerald-100' };
    case 'order':
      return { Icon: Package, iconColorClass: 'text-indigo-500', iconBgClass: 'bg-indigo-50' };
    case 'promo':
      return { Icon: Gift, iconColorClass: 'text-amber-500', iconBgClass: 'bg-amber-100' };
    case 'rating':
      return { Icon: Star, iconColorClass: 'text-amber-500', iconBgClass: 'bg-amber-100' };
    default:
      return { Icon: Bell, iconColorClass: 'text-gray-500', iconBgClass: 'bg-gray-100' };
  }
}

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationService.getAll()
      .then((res) => {
        setNotifications(res.notifications);
        setUnreadCount(res.unreadCount);
      })
      .catch(() => toast.error('Failed to load notifications'))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkAllRead = () => {
    notificationService.markAllRead()
      .then(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setUnreadCount(0);
        toast.success('All notifications marked as read');
      })
      .catch(() => toast.error('Failed to mark notifications as read'));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Go back"
            onClick={() => navigate('/home')}
            className="mr-4"
          >
            <ArrowLeft size={24} className="text-gray-800" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
        </div>
        {unreadCount > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
            {unreadCount} New
          </span>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2 text-gray-800">No notifications yet</p>
            <p className="text-sm text-gray-500">We'll notify you about orders and promotions</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => {
              const { Icon, iconColorClass, iconBgClass } = getIconProps(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`px-6 py-4 flex gap-3 hover:bg-gray-50 cursor-pointer ${
                    notification.read ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconBgClass}`}
                  >
                    <Icon size={20} className={iconColorClass} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold text-sm text-gray-800">{notification.title}</p>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1 bg-indigo-500" />
                      )}
                    </div>
                    <p className="text-sm mb-1 break-words text-gray-500">{notification.message}</p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="px-6 py-6 border-t border-gray-100">
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="w-full max-w-4xl mx-auto h-10 rounded-lg text-sm font-medium bg-gray-100 text-gray-500"
          >
            Mark All as Read
          </button>
        </div>
      )}
    </div>
  );
}
