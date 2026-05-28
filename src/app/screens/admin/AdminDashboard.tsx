import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ShoppingBag, Bike, Store, TrendingUp, AlertCircle } from 'lucide-react';
import { adminService } from '../../services/admin';
import AdminNav from '../../components/AdminNav';
import { toast } from 'sonner';

const STATUS_BADGE: Record<string, string> = {
  pending:    'bg-amber-100 text-amber-600',
  preparing:  'bg-indigo-100 text-indigo-600',
  'on-the-way': 'bg-emerald-100 text-emerald-600',
  delivered:  'bg-gray-100 text-gray-500',
};
const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending', preparing: 'Preparing', 'on-the-way': 'On the Way', delivered: 'Delivered',
};

function formatElapsed(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ liveOrders: 0, onlineRiders: 0, activeVendors: 0, revenueToday: 0 });
  const [liveOrders, setLiveOrders] = useState<any[]>([]);
  const [onlineRiders, setOnlineRiders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboard()
      .then((res) => { setStats(res.stats); setLiveOrders(res.liveOrders); setOnlineRiders(res.onlineRiders); })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const STAT_CARDS = [
    { label: 'Live Orders',    value: stats.liveOrders,                       icon: ShoppingBag, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Online Riders',  value: stats.onlineRiders,                     icon: Bike,        color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Active Vendors', value: stats.activeVendors,                    icon: Store,       color: 'text-amber-500',   bg: 'bg-amber-50' },
    { label: 'Revenue Today',  value: `₦${stats.revenueToday.toLocaleString()}`, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-[1400px] mx-auto">
        <AdminNav />

        <div className="px-6 py-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STAT_CARDS.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
                  <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                    <Icon size={16} className={color} />
                  </div>
                </div>
                <p className={`text-2xl md:text-3xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Order Feed — takes 2/3 on desktop */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Live Order Feed</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{liveOrders.length} active orders</p>
                </div>
                <Link to="/admin/orders" className="text-sm font-medium text-indigo-500 hover:text-indigo-600">
                  View all →
                </Link>
              </div>

              {liveOrders.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-12 text-center">
                  <ShoppingBag size={32} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No live orders at the moment</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {liveOrders.map((order: any) => (
                    <div
                      key={order.id}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border overflow-hidden ${
                        order.needsRider ? 'border-l-4 border-l-amber-400 border-gray-100' : 'border-gray-100 dark:border-gray-700'
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-bold text-sm text-gray-800 dark:text-gray-100">{order.id}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{order.customerName} · {order.restaurant}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[order.status] ?? 'bg-gray-100 text-gray-500'}`}>
                              {STATUS_LABEL[order.status] ?? order.status}
                            </span>
                            {order.elapsedTime != null && (
                              <p className="text-xs text-gray-400 mt-1">{formatElapsed(order.elapsedTime)}</p>
                            )}
                          </div>
                        </div>

                        {order.needsRider && (
                          <Link
                            to="/admin/orders"
                            className="mt-3 flex items-center justify-center gap-2 w-full h-9 rounded-lg text-xs font-semibold bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                          >
                            <AlertCircle size={13} />
                            Assign Rider
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Platform Snapshot — takes 1/3 on desktop */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Platform Snapshot</h2>

              {/* Online Riders */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Online Riders</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">
                    {onlineRiders.length} online
                  </span>
                </div>
                {onlineRiders.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No riders online</p>
                ) : (
                  <div className="space-y-3">
                    {onlineRiders.map((rider: any) => (
                      <div key={rider.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 flex-shrink-0">
                          {rider.name?.charAt(0) ?? '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-gray-800 dark:text-gray-100">{rider.name}</p>
                          <p className="text-xs text-gray-400">⭐ {rider.rating}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          rider.status === 'available' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {rider.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                <h3 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-100">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Manage Riders', to: '/admin/people' },
                    { label: 'View Orders', to: '/admin/orders' },
                    { label: 'Finance', to: '/admin/finance' },
                    { label: 'Analytics', to: '/admin/analytics' },
                  ].map(({ label, to }) => (
                    <Link key={to} to={to}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                      <span className="text-gray-300 group-hover:text-indigo-500 transition-colors">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
