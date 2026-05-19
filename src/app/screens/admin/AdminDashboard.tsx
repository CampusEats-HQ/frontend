import { Link } from 'react-router';
import { Bell, User, LayoutDashboard, ClipboardList, Users, DollarSign } from 'lucide-react';
import { adminStats, liveOrders, onlineRiders, closedVendors } from '../../data/adminMockData';

export default function AdminDashboard() {
  const getStatusBadge = (status: string) => {
    const styles = {
      pending: { bg: '#FEF3C7', color: '#F59E0B', text: 'Pending' },
      preparing: { bg: '#DBEAFE', color: '#6366F1', text: 'Preparing' },
      'on-the-way': { bg: '#D1FAE5', color: '#10B981', text: 'On the Way' },
      delivered: { bg: '#F3F4F6', color: '#6B7280', text: 'Delivered' },
    };
    const style = styles[status as keyof typeof styles];
    return (
      <span
        className="px-2 py-1 rounded text-xs font-medium"
        style={{ backgroundColor: style.bg, color: style.color }}
      >
        {style.text}
      </span>
    );
  };

  const formatElapsedTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Bar */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold" style={{ color: '#1F2937' }}>
              CampusEats Admin
            </h1>
            <nav className="hidden lg:flex gap-4">
              <Link to="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: '#DBEAFE', color: '#6366F1' }}>
                <LayoutDashboard size={18} />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link to="/admin/orders" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <ClipboardList size={18} style={{ color: '#6B7280' }} />
                <span className="text-sm" style={{ color: '#6B7280' }}>Orders</span>
              </Link>
              <Link to="/admin/people" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Users size={18} style={{ color: '#6B7280' }} />
                <span className="text-sm" style={{ color: '#6B7280' }}>People</span>
              </Link>
              <Link to="/admin/analytics" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <span className="text-sm" style={{ color: '#6B7280' }}>Analytics</span>
              </Link>
              <Link to="/admin/finance" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <DollarSign size={18} style={{ color: '#6B7280' }} />
                <span className="text-sm" style={{ color: '#6B7280' }}>Finance</span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell size={20} style={{ color: '#6B7280' }} />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#EF4444' }} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                <User size={16} color="white" />
              </div>
              <span className="text-sm font-medium" style={{ color: '#1F2937' }}>
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0' }}>
              <p className="text-xs mb-2" style={{ color: '#6B7280' }}>
                Live Orders
              </p>
              <p className="text-2xl md:text-3xl font-bold" style={{ color: '#1F2937' }}>
                {adminStats.liveOrders}
              </p>
            </div>
            <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0' }}>
              <p className="text-xs mb-2" style={{ color: '#6B7280' }}>
                Online Riders
              </p>
              <p className="text-2xl md:text-3xl font-bold" style={{ color: '#10B981' }}>
                {adminStats.onlineRiders}
              </p>
            </div>
            <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0' }}>
              <p className="text-xs mb-2" style={{ color: '#6B7280' }}>
                Active Vendors
              </p>
              <p className="text-2xl md:text-3xl font-bold" style={{ color: '#6366F1' }}>
                {adminStats.activeVendors}
              </p>
            </div>
            <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0' }}>
              <p className="text-xs mb-2" style={{ color: '#6B7280' }}>
                Revenue Today
              </p>
              <p className="text-2xl md:text-3xl font-bold break-words" style={{ color: '#1F2937' }}>
                ₦{adminStats.revenueToday.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT: Live Order Feed */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold" style={{ color: '#1F2937' }}>
                  Live Order Feed
                </h2>
                <Link to="/admin/orders" className="text-sm font-medium" style={{ color: '#6366F1' }}>
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {liveOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg p-4 border"
                    style={{
                      borderColor: order.needsRider ? '#F59E0B' : '#E0E0E0',
                      backgroundColor: order.needsRider ? '#FFFBEB' : 'white',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm mb-1" style={{ color: '#1F2937' }}>
                          {order.id}
                        </p>
                        <p className="text-xs break-words" style={{ color: '#6B7280' }}>
                          {order.customerName} · {order.restaurant}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {getStatusBadge(order.status)}
                        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                          {formatElapsedTime(order.elapsedTime)}
                        </p>
                      </div>
                    </div>
                    {order.needsRider && (
                      <Link
                        to="/admin/orders"
                        className="block w-full mt-3 h-9 rounded-lg flex items-center justify-center text-sm font-semibold"
                        style={{ backgroundColor: '#F59E0B', color: 'white' }}
                      >
                        Assign Rider
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Platform Snapshot */}
            <div>
              <h2 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>
                Platform Snapshot
              </h2>

              {/* Online Riders */}
              <div className="rounded-lg p-4 border mb-4" style={{ borderColor: '#E0E0E0' }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>
                  Online Riders ({onlineRiders.length})
                </h3>
                <div className="space-y-2">
                  {onlineRiders.map((rider) => (
                    <div key={rider.id} className="flex items-center justify-between gap-3">
                      <p className="text-sm truncate flex-1 min-w-0" style={{ color: '#1F2937' }}>
                        {rider.name}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs" style={{ color: '#6B7280' }}>
                          ⭐ {rider.rating}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded text-xs whitespace-nowrap"
                          style={{
                            backgroundColor: rider.status === 'available' ? '#D1FAE5' : '#FEF3C7',
                            color: rider.status === 'available' ? '#10B981' : '#F59E0B',
                          }}
                        >
                          {rider.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closed Vendors */}
              <div className="rounded-lg p-4 border mb-4" style={{ borderColor: '#E0E0E0' }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>
                  Closed Vendors
                </h3>
                {closedVendors.length === 0 ? (
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    All vendors open
                  </p>
                ) : (
                  <div className="space-y-1">
                    {closedVendors.map((vendor, idx) => (
                      <p key={idx} className="text-sm" style={{ color: '#EF4444' }}>
                        • {vendor}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Notifications */}
              <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0' }}>
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>
                  Recent Notifications
                </h3>
                <div className="space-y-2">
                  <p className="text-xs" style={{ color: '#F59E0B' }}>
                    • ORD-1050 waiting 45s without rider
                  </p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    • ORD-1049 assigned to Emeka
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
