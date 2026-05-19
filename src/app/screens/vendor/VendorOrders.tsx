import { useState } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign } from 'lucide-react';
import { vendorOrders } from '../../data/vendorMockData';

export default function VendorOrders() {
  const [activeTab, setActiveTab] = useState<'pending' | 'preparing' | 'ready' | 'completed'>(
    'pending'
  );

  const filteredOrders = vendorOrders.filter((order) => order.status === activeTab);

  const statusBadgeClasses: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-500',
    preparing: 'bg-blue-100 text-indigo-500',
    ready: 'bg-emerald-100 text-emerald-500',
    completed: 'bg-gray-100 text-gray-500',
  };

  const getStatusBadge = (status: string) => {
    const classes = statusBadgeClasses[status] ?? 'bg-gray-100 text-gray-500';
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${classes}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-[1024px] mx-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800">
            Orders
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {(['pending', 'preparing', 'ready', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === tab
                  ? 'text-indigo-500 border-b-2 border-indigo-500'
                  : 'text-gray-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="px-5 py-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
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
                      <p className="font-semibold mb-1 text-gray-800">
                        {order.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.customerName}'s order
                      </p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="font-bold mt-1 text-gray-800">
                        ₦{order.total}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-gray-500">
                        {item.quantity}x {item.name}
                      </p>
                    ))}
                  </div>
                  {activeTab === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="flex-1 h-10 rounded-lg font-semibold text-sm bg-emerald-500 text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Order accepted!');
                        }}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="flex-1 h-10 rounded-lg font-semibold text-sm border border-gray-300 text-red-500"
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
                      type="button"
                      className="w-full h-10 rounded-lg font-semibold text-sm bg-indigo-500 text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Marked as ready!');
                      }}
                    >
                      Mark as Ready
                    </button>
                  )}
                  {activeTab === 'ready' && (
                    <p className="text-sm text-center text-gray-500">
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
              <LayoutDashboard size={20} className="text-gray-500" />
              <span className="text-xs text-gray-500">
                Dashboard
              </span>
            </Link>
            <Link to="/vendor/orders" className="flex flex-col items-center gap-1">
              <ClipboardList size={20} className="text-indigo-500" />
              <span className="text-xs font-medium text-indigo-500">
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
