import { useState } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign } from 'lucide-react';
import { vendorOrders } from '../../data/vendorMockData';

export default function VendorOrders() {
  const [activeTab, setActiveTab] = useState<'pending' | 'preparing' | 'ready' | 'completed'>(
    'pending'
  );

  const filteredOrders = vendorOrders.filter((order) => order.status === activeTab);

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: { bg: '#FEF3C7', color: '#F59E0B' },
      preparing: { bg: '#DBEAFE', color: '#6366F1' },
      ready: { bg: '#D1FAE5', color: '#10B981' },
      completed: { bg: '#F3F4F6', color: '#6B7280' },
    };
    const style = styles[status as keyof typeof styles];
    return (
      <span
        className="px-2 py-1 rounded text-xs font-medium"
        style={{ backgroundColor: style.bg, color: style.color }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-[1024px] mx-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-lg font-bold" style={{ color: '#1F2937' }}>
            Orders
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {(['pending', 'preparing', 'ready', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-sm font-medium"
              style={{
                color: activeTab === tab ? '#6366F1' : '#6B7280',
                borderBottom: activeTab === tab ? '2px solid #6366F1' : 'none',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="px-5 py-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12" style={{ color: '#6B7280' }}>
              No {activeTab} orders
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <Link
                  key={order.id}
                  to={`/vendor/orders/${order.id}`}
                  className="block rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold mb-1" style={{ color: '#1F2937' }}>
                        {order.id}
                      </p>
                      <p className="text-xs" style={{ color: '#6B7280' }}>
                        {order.customerName}'s order
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="font-bold mt-1" style={{ color: '#1F2937' }}>
                        ₦{order.total}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm" style={{ color: '#6B7280' }}>
                        {item.quantity}x {item.name}
                      </p>
                    ))}
                  </div>
                  {activeTab === 'pending' && (
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
                  )}
                  {activeTab === 'preparing' && (
                    <button
                      className="w-full h-10 rounded-lg font-semibold text-sm"
                      style={{ backgroundColor: '#6366F1', color: 'white' }}
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Marked as ready!');
                      }}
                    >
                      Mark as Ready
                    </button>
                  )}
                  {activeTab === 'ready' && (
                    <p className="text-sm text-center" style={{ color: '#6B7280' }}>
                      Waiting for rider
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
          <div className="max-w-[1024px] mx-auto flex justify-around py-3">
            <Link to="/vendor/dashboard" className="flex flex-col items-center gap-1">
              <LayoutDashboard size={20} style={{ color: '#6B7280' }} />
              <span className="text-xs" style={{ color: '#6B7280' }}>
                Dashboard
              </span>
            </Link>
            <Link to="/vendor/orders" className="flex flex-col items-center gap-1">
              <ClipboardList size={20} style={{ color: '#6366F1' }} />
              <span className="text-xs font-medium" style={{ color: '#6366F1' }}>
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
