import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign, Clock, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { vendorService, VendorOrder } from '../../services/vendor';

interface DashboardData {
  isOpen: boolean;
  todayOrders: number;
  todayRevenue: number;
  pendingOrders: number;
  avgPrepTime: number;
}

export default function VendorDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [pendingOrders, setPendingOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      vendorService.getDashboard(),
      vendorService.getOrders('pending'),
    ])
      .then(([dashRes, ordersRes]) => {
        setDashboard(dashRes);
        setPendingOrders(ordersRes.orders);
      })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleOpen = () => {
    if (!dashboard) return;
    const newStatus = !dashboard.isOpen;
    vendorService.setStoreStatus(newStatus)
      .then((res) => setDashboard((prev) => prev ? { ...prev, isOpen: res.isOpen } : prev))
      .catch(() => toast.error('Failed to update store status'));
  };

  const handleAcceptOrder = (e: React.MouseEvent, orderId: string) => {
    e.preventDefault();
    vendorService.updateOrderStatus(orderId, 'preparing')
      .then(() => {
        setPendingOrders((prev) => prev.filter((o) => o.id !== orderId));
        toast.success('Order accepted');
      })
      .catch(() => toast.error('Failed to accept order'));
  };

  const handleRejectOrder = (e: React.MouseEvent, orderId: string) => {
    e.preventDefault();
    vendorService.updateOrderStatus(orderId, 'completed')
      .then(() => {
        setPendingOrders((prev) => prev.filter((o) => o.id !== orderId));
        toast.success('Order rejected');
      })
      .catch(() => toast.error('Failed to reject order'));
  };

  const getTimeAgo = (timestamp: string) => {
    const mins = Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins === 1) return '1 min ago';
    return `${mins} mins ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-[1024px] mx-auto">
        {/* Top Bar */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800">
            Mavise Grill
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleOpen}
              className={`px-4 py-2 rounded-full font-semibold text-sm text-white ${dashboard?.isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}
            >
              {dashboard?.isOpen ? 'Open' : 'Closed'}
            </button>
            <Link to="/vendor/profile">
              <Settings size={20} className="text-gray-500" />
            </Link>
          </div>
        </div>

        <div className="px-5 py-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="rounded-lg p-4 bg-gray-50">
              <p className="text-xs mb-1 text-gray-500">
                Today's Orders
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {dashboard?.todayOrders ?? 0}
              </p>
            </div>
            <div className="rounded-lg p-4 bg-gray-50">
              <p className="text-xs mb-1 text-gray-500">
                Today's Revenue
              </p>
              <p className="text-2xl font-bold text-gray-800">
                ₦{(dashboard?.todayRevenue ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg p-4 bg-gray-50">
              <p className="text-xs mb-1 text-gray-500">
                Pending Orders
              </p>
              <p className="text-2xl font-bold text-amber-500">
                {dashboard?.pendingOrders ?? 0}
              </p>
            </div>
            <div className="rounded-lg p-4 bg-gray-50">
              <p className="text-xs mb-1 text-gray-500">
                Avg. Prep Time
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {dashboard?.avgPrepTime ?? 0} min
              </p>
            </div>
          </div>

          {/* New Orders */}
          <div>
            <h2 className="text-base font-semibold mb-4 text-gray-800">
              New Orders
            </h2>
            {pendingOrders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No pending orders
              </div>
            ) : (
              <div className="space-y-3">
                {pendingOrders.map((order) => (
                  <Link
                    key={order.id}
                    to={`/vendor/orders/${order.id}`}
                    className="block rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold mb-1 text-gray-800">
                          {order.id}
                        </p>
                        <p className="text-xs flex items-center gap-1 text-gray-500">
                          <Clock size={12} />
                          {getTimeAgo(order.timestamp)}
                        </p>
                      </div>
                      <p className="font-bold text-indigo-500">
                        ₦{order.total}
                      </p>
                    </div>
                    <div className="mb-3">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-gray-500">
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex-1 h-10 rounded-lg font-semibold text-sm bg-emerald-500 text-white"
                        onClick={(e) => handleAcceptOrder(e, order.id)}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="flex-1 h-10 rounded-lg font-semibold text-sm border border-gray-300 text-red-500"
                        onClick={(e) => handleRejectOrder(e, order.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
          <div className="max-w-[1024px] mx-auto flex justify-around py-3">
            <Link to="/vendor/dashboard" className="flex flex-col items-center gap-1">
              <LayoutDashboard size={20} className="text-indigo-500" />
              <span className="text-xs font-medium text-indigo-500">
                Dashboard
              </span>
            </Link>
            <Link to="/vendor/orders" className="flex flex-col items-center gap-1">
              <ClipboardList size={20} className="text-gray-500" />
              <span className="text-xs text-gray-500">
                Orders
              </span>
            </Link>
            <Link to="/vendor/menu" className="flex flex-col items-center gap-1">
              <UtensilsCrossed size={20} className="text-gray-500" />
              <span className="text-xs text-gray-500">
                Menu
              </span>
            </Link>
            <Link to="/vendor/earnings" className="flex flex-col items-center gap-1">
              <DollarSign size={20} className="text-gray-500" />
              <span className="text-xs text-gray-500">
                Earnings
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
