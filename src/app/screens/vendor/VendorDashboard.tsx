import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign, Clock, Settings } from 'lucide-react';
import { useVendor } from '../../context/VendorContext';
import { vendorStats, vendorOrders } from '../../data/vendorMockData';

export default function VendorDashboard() {
  const { isOpen, toggleOpen } = useVendor();

  const pendingOrders = vendorOrders.filter((o) => o.status === 'pending');

  const getTimeAgo = (timestamp: Date) => {
    const mins = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins === 1) return '1 min ago';
    return `${mins} mins ago`;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-[1024px] mx-auto">
        {/* Top Bar */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
          <h1 className="text-lg font-bold" style={{ color: '#1F2937' }}>
            Mavise Grill
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleOpen}
              className="px-4 py-2 rounded-full font-semibold text-sm"
              style={{
                backgroundColor: isOpen ? '#10B981' : '#EF4444',
                color: 'white',
              }}
            >
              {isOpen ? 'Open' : 'Closed'}
            </button>
            <Link to="/vendor/profile">
              <Settings size={20} style={{ color: '#6B7280' }} />
            </Link>
          </div>
        </div>

        <div className="px-5 py-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="rounded-lg p-4" style={{ backgroundColor: '#F8F9FA' }}>
              <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                Today's Orders
              </p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>
                {vendorStats.todayOrders}
              </p>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: '#F8F9FA' }}>
              <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                Today's Revenue
              </p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>
                ₦{vendorStats.todayRevenue.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: '#F8F9FA' }}>
              <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                Pending Orders
              </p>
              <p className="text-2xl font-bold" style={{ color: '#F59E0B' }}>
                {vendorStats.pendingOrders}
              </p>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: '#F8F9FA' }}>
              <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                Avg. Prep Time
              </p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>
                {vendorStats.avgPrepTime} min
              </p>
            </div>
          </div>

          {/* New Orders */}
          <div>
            <h2 className="text-base font-semibold mb-4" style={{ color: '#1F2937' }}>
              New Orders
            </h2>
            {pendingOrders.length === 0 ? (
              <div className="text-center py-12" style={{ color: '#6B7280' }}>
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
                        <p className="font-semibold mb-1" style={{ color: '#1F2937' }}>
                          {order.id}
                        </p>
                        <p className="text-xs flex items-center gap-1" style={{ color: '#6B7280' }}>
                          <Clock size={12} />
                          {getTimeAgo(order.timestamp)}
                        </p>
                      </div>
                      <p className="font-bold" style={{ color: '#6366F1' }}>
                        ₦{order.total}
                      </p>
                    </div>
                    <div className="mb-3">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm" style={{ color: '#6B7280' }}>
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 h-10 rounded-lg font-semibold text-sm"
                        style={{ backgroundColor: '#10B981', color: 'white' }}
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Order accepted!');
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="flex-1 h-10 rounded-lg font-semibold text-sm border"
                        style={{ borderColor: '#E0E0E0', color: '#EF4444' }}
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Order rejected!');
                        }}
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
              <LayoutDashboard size={20} style={{ color: '#6366F1' }} />
              <span className="text-xs font-medium" style={{ color: '#6366F1' }}>
                Dashboard
              </span>
            </Link>
            <Link to="/vendor/orders" className="flex flex-col items-center gap-1">
              <ClipboardList size={20} style={{ color: '#6B7280' }} />
              <span className="text-xs" style={{ color: '#6B7280' }}>
                Orders
              </span>
            </Link>
            <Link to="/vendor/menu" className="flex flex-col items-center gap-1">
              <UtensilsCrossed size={20} style={{ color: '#6B7280' }} />
              <span className="text-xs" style={{ color: '#6B7280' }}>
                Menu
              </span>
            </Link>
            <Link to="/vendor/earnings" className="flex flex-col items-center gap-1">
              <DollarSign size={20} style={{ color: '#6B7280' }} />
              <span className="text-xs" style={{ color: '#6B7280' }}>
                Earnings
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
