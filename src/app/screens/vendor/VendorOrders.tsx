import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign, Clock, MapPin, ChevronRight, User } from 'lucide-react';
import { toast } from 'sonner';
import { vendorService, VendorOrder } from '../../services/vendor';

const TABS = ['pending', 'preparing', 'ready', 'completed'] as const;

const TAB_STYLES: Record<string, { pill: string; border: string; badge: string }> = {
  pending:   { pill: 'bg-amber-500 text-white',   border: 'border-l-amber-400',   badge: 'bg-amber-100 text-amber-600' },
  preparing: { pill: 'bg-indigo-500 text-white',  border: 'border-l-indigo-400',  badge: 'bg-indigo-100 text-indigo-600' },
  ready:     { pill: 'bg-emerald-500 text-white',  border: 'border-l-emerald-400', badge: 'bg-emerald-100 text-emerald-600' },
  completed: { pill: 'bg-gray-500 text-white',    border: 'border-l-gray-300',    badge: 'bg-gray-100 text-gray-500' },
};

export default function VendorOrders() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('pending');
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    vendorService.getOrders()
      .then((res) => setOrders(res.orders))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const countFor = (tab: string) => orders.filter((o) => o.status === tab).length;
  const filteredOrders = orders.filter((o) => o.status === activeTab);

  const handleUpdateStatus = (e: React.MouseEvent, orderId: string, newStatus: VendorOrder['status']) => {
    e.preventDefault();
    vendorService.updateOrderStatus(orderId, newStatus)
      .then(() => {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
        toast.success(`Order marked as ${newStatus}`);
      })
      .catch(() => toast.error('Failed to update order status'));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-[1024px] mx-auto">
        {/* Header */}
        <div className="px-5 py-5 border-b border-gray-100 bg-white flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Orders</h1>
            <p className="text-xs text-gray-400 mt-0.5">{orders.length} total orders today</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={13} />
            <span>Live</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5 py-4 bg-white border-b border-gray-100">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {TABS.map((tab) => {
              const count = countFor(tab);
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isActive ? TAB_STYLES[tab].pill : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {count > 0 && (
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white bg-opacity-30 text-white' : TAB_STYLES[tab].badge
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders grid */}
        <div className="px-5 py-5">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🍽️</div>
              <p className="font-medium text-gray-600">No {activeTab} orders</p>
              <p className="text-sm text-gray-400 mt-1">New orders will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOrders.map((order) => (
                <Link
                  key={order.id}
                  to={`/vendor/orders/${order.id}`}
                  className={`block bg-white rounded-xl border-l-4 shadow-sm hover:shadow-md transition-shadow overflow-hidden ${TAB_STYLES[order.status]?.border ?? 'border-l-gray-200'}`}
                >
                  {/* Card header */}
                  <div className="px-4 pt-4 pb-3 flex items-start justify-between border-b border-gray-50">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{order.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.customerName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${TAB_STYLES[order.status]?.badge ?? 'bg-gray-100 text-gray-500'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <ChevronRight size={15} className="text-gray-300" />
                    </div>
                  </div>

                  {/* Items */}
                  <div className="px-4 py-3">
                    <div className="space-y-1 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            <span className="font-semibold text-indigo-500">{item.quantity}×</span> {item.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {order.deliveryLocation && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                        <MapPin size={12} />
                        <span>{order.deliveryLocation}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-gray-800">₦{order.total}</span>

                      {activeTab === 'pending' && (
                        <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                          <button
                            type="button"
                            onClick={(e) => handleUpdateStatus(e, order.id, 'preparing')}
                            className="px-4 h-8 rounded-lg text-xs font-semibold bg-emerald-500 text-white"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleUpdateStatus(e, order.id, 'completed')}
                            className="px-4 h-8 rounded-lg text-xs font-semibold border border-red-200 text-red-500"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {activeTab === 'preparing' && (
                        <button
                          type="button"
                          onClick={(e) => handleUpdateStatus(e, order.id, 'ready')}
                          className="px-4 h-8 rounded-lg text-xs font-semibold bg-indigo-500 text-white"
                        >
                          Mark Ready
                        </button>
                      )}
                      {activeTab === 'ready' && (
                        <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Awaiting rider
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
          <div className="max-w-[1024px] mx-auto flex justify-around py-3">
            <Link to="/vendor/dashboard" className="flex flex-col items-center gap-1">
              <LayoutDashboard size={20} className="text-gray-400" />
              <span className="text-xs text-gray-400">Dashboard</span>
            </Link>
            <Link to="/vendor/orders" className="flex flex-col items-center gap-1">
              <ClipboardList size={20} className="text-indigo-500" />
              <span className="text-xs font-medium text-indigo-500">Orders</span>
            </Link>
            <Link to="/vendor/menu" className="flex flex-col items-center gap-1">
              <UtensilsCrossed size={20} className="text-gray-400" />
              <span className="text-xs text-gray-400">Menu</span>
            </Link>
            <Link to="/vendor/earnings" className="flex flex-col items-center gap-1">
              <DollarSign size={20} className="text-gray-400" />
              <span className="text-xs text-gray-400">Earnings</span>
            </Link>
            <Link to="/vendor/profile" className="flex flex-col items-center gap-1">
              <User size={20} className="text-gray-400" />
              <span className="text-xs text-gray-400">Profile</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
