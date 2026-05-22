import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Bell, User, LayoutDashboard, ClipboardList, Users, DollarSign, Megaphone } from 'lucide-react';
import { adminService } from '../../services/admin';
import AdminNav from '../../components/AdminNav';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    liveOrders: 0,
    onlineRiders: 0,
    activeVendors: 0,
    revenueToday: 0,
  });
  const [liveOrders, setLiveOrders] = useState<any[]>([]);
  const [onlineRiders, setOnlineRiders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getDashboard()
      .then((res) => {
        setStats(res.stats);
        setLiveOrders(res.liveOrders);
        setOnlineRiders(res.onlineRiders);
      })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-500',
      preparing: 'bg-blue-100 text-indigo-500',
      'on-the-way': 'bg-emerald-100 text-emerald-500',
      delivered: 'bg-gray-100 text-gray-500',
    };
    const texts: Record<string, string> = {
      pending: 'Pending',
      preparing: 'Preparing',
      'on-the-way': 'On the Way',
      delivered: 'Delivered',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status] ?? 'bg-gray-100 text-gray-500'}`}>
        {texts[status] ?? status}
      </span>
    );
  };

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        <AdminNav />

        {/* Stats Row */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg p-4 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">
                Live Orders
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">
                {stats.liveOrders}
              </p>
            </div>
            <div className="rounded-lg p-4 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">
                Online Riders
              </p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-500">
                {stats.onlineRiders}
              </p>
            </div>
            <div className="rounded-lg p-4 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">
                Active Vendors
              </p>
              <p className="text-2xl md:text-3xl font-bold text-indigo-500">
                {stats.activeVendors}
              </p>
            </div>
            <div className="rounded-lg p-4 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">
                Revenue Today
              </p>
              <p className="text-2xl md:text-3xl font-bold break-words text-gray-800">
                ₦{stats.revenueToday.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT: Live Order Feed */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Live Order Feed
                </h2>
                <Link to="/admin/orders" className="text-sm font-medium text-indigo-500">
                  View All
                </Link>
              </div>
              {liveOrders.length === 0 ? (
                <p className="text-sm text-gray-500">No live orders at the moment</p>
              ) : (
                <div className="space-y-3">
                  {liveOrders.map((order: any) => (
                    <div
                      key={order.id}
                      className={`rounded-lg p-4 border ${order.needsRider ? 'border-amber-500 bg-amber-50' : 'border-gray-300 bg-white'}`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm mb-1 text-gray-800">
                            {order.id}
                          </p>
                          <p className="text-xs break-words text-gray-500">
                            {order.customerName} · {order.restaurant}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {getStatusBadge(order.status)}
                          {order.elapsedTime != null && (
                            <p className="text-xs mt-1 text-gray-500">
                              {formatElapsedTime(order.elapsedTime)}
                            </p>
                          )}
                        </div>
                      </div>
                      {order.needsRider && (
                        <Link
                          to="/admin/orders"
                          className="block w-full mt-3 h-9 rounded-lg flex items-center justify-center text-sm font-semibold bg-amber-500 text-white"
                        >
                          Assign Rider
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Platform Snapshot */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Platform Snapshot
              </h2>

              {/* Online Riders */}
              <div className="rounded-lg p-4 border border-gray-300 mb-4">
                <h3 className="text-sm font-semibold mb-3 text-gray-800">
                  Online Riders ({onlineRiders.length})
                </h3>
                {onlineRiders.length === 0 ? (
                  <p className="text-sm text-gray-500">No riders online</p>
                ) : (
                  <div className="space-y-2">
                    {onlineRiders.map((rider: any) => (
                      <div key={rider.id} className="flex items-center justify-between gap-3">
                        <p className="text-sm truncate flex-1 min-w-0 text-gray-800">
                          {rider.name}
                        </p>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-500">
                            ⭐ {rider.rating}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs whitespace-nowrap ${rider.status === 'available' ? 'bg-emerald-100 text-emerald-500' : 'bg-amber-100 text-amber-500'}`}
                          >
                            {rider.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Notifications */}
              <div className="rounded-lg p-4 border border-gray-300">
                <h3 className="text-sm font-semibold mb-3 text-gray-800">
                  Recent Notifications
                </h3>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    Live data loaded successfully
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
