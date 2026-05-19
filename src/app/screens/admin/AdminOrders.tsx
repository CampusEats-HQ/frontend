import { useState } from 'react';
import { Link } from 'react-router';
import { X, LayoutDashboard, ClipboardList, Users, DollarSign, Bell, User } from 'lucide-react';
import { unassignedOrders, liveOrders, completedOrders, onlineRiders } from '../../data/adminMockData';
import { toast } from 'sonner';

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState<'all' | 'unassigned' | 'active' | 'completed'>('unassigned');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleAssignRider = (riderId: string, riderName: string) => {
    toast.success(`Order ${selectedOrder?.id} assigned to ${riderName}`);
    setShowAssignModal(false);
    setSelectedOrder(null);
  };

  const formatWaitingTime = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
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
              <Link to="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <LayoutDashboard size={18} style={{ color: '#6B7280' }} />
                <span className="text-sm" style={{ color: '#6B7280' }}>Dashboard</span>
              </Link>
              <Link to="/admin/orders" className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: '#DBEAFE', color: '#6366F1' }}>
                <ClipboardList size={18} />
                <span className="text-sm font-medium">Orders</span>
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
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                <User size={16} color="white" />
              </div>
              <span className="text-sm font-medium" style={{ color: '#1F2937' }}>Admin</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Header */}
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1F2937' }}>
            Order Management
          </h2>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          {(['all', 'unassigned', 'active', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-3 text-sm font-medium capitalize"
              style={{
                color: activeTab === tab ? '#6366F1' : '#6B7280',
                borderBottom: activeTab === tab ? '2px solid #6366F1' : 'none',
              }}
            >
              {tab}
              {tab === 'unassigned' && (
                <span
                  className="ml-2 px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: '#FEF3C7', color: '#F59E0B' }}
                >
                  {unassignedOrders.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'unassigned' && (
          <div className="space-y-4">
            {unassignedOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg p-4 md:p-5 border-2"
                style={{ borderColor: '#F59E0B', backgroundColor: '#FFFBEB' }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-base mb-1" style={{ color: '#1F2937' }}>
                      {order.id}
                    </p>
                    <p className="text-sm mb-1 break-words" style={{ color: '#6B7280' }}>
                      {order.customerName} · {order.restaurant}
                    </p>
                    <div className="mt-2">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-xs break-words" style={{ color: '#6B7280' }}>
                          • {item}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-base md:text-lg font-bold mb-1" style={{ color: '#F59E0B' }}>
                      Waiting {formatWaitingTime(order.timestamp)}
                    </p>
                    <p className="text-sm" style={{ color: '#6B7280' }}>
                      ₦{order.total}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowAssignModal(true);
                  }}
                  className="w-full h-11 rounded-lg font-semibold text-sm md:text-base"
                  style={{ backgroundColor: '#F59E0B', color: 'white' }}
                >
                  Assign Rider
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'active' && (
          <div className="space-y-4">
            {liveOrders.filter(o => o.status !== 'delivered' && !o.needsRider).map((order) => (
              <div key={order.id} className="rounded-lg p-4 md:p-5 border" style={{ borderColor: '#E0E0E0' }}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-base mb-1" style={{ color: '#1F2937' }}>
                      {order.id}
                    </p>
                    <p className="text-sm mb-1 break-words" style={{ color: '#6B7280' }}>
                      {order.customerName} · {order.restaurant}
                    </p>
                    <p className="text-sm truncate" style={{ color: '#6366F1' }}>
                      Rider: {order.riderName}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded text-sm font-medium self-start whitespace-nowrap"
                    style={{ backgroundColor: '#DBEAFE', color: '#6366F1' }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedOrders.map((order) => (
              <div key={order.id} className="rounded-lg p-4 md:p-5 border" style={{ borderColor: '#E0E0E0' }}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-base mb-1" style={{ color: '#1F2937' }}>
                      {order.id}
                    </p>
                    <p className="text-sm mb-1 break-words" style={{ color: '#6B7280' }}>
                      {order.customerName} · {order.restaurant} · Rider: {order.riderName}
                    </p>
                    <p className="text-xs break-words" style={{ color: '#6B7280' }}>
                      {order.completedAt} · Duration: {order.duration}
                    </p>
                  </div>
                  <p className="font-bold text-left md:text-right whitespace-nowrap" style={{ color: '#1F2937' }}>
                    ₦{order.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'all' && (
          <div className="space-y-4">
            {[...unassignedOrders, ...liveOrders].map((order: any) => (
              <div key={order.id} className="rounded-lg p-4 md:p-5 border" style={{ borderColor: '#E0E0E0' }}>
                <p className="font-bold break-words" style={{ color: '#1F2937' }}>{order.id}</p>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Assign Rider Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: '#1F2937' }}>
                Assign Rider to {selectedOrder?.id}
              </h2>
              <button onClick={() => setShowAssignModal(false)}>
                <X size={24} style={{ color: '#6B7280' }} />
              </button>
            </div>

            <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
              Select an available rider to assign this order
            </p>

            <div className="space-y-2">
              {onlineRiders.filter(r => r.status === 'available').map((rider) => (
                <button
                  key={rider.id}
                  onClick={() => handleAssignRider(rider.id, rider.name)}
                  className="w-full p-4 rounded-lg border text-left hover:border-blue-500 transition-colors"
                  style={{ borderColor: '#E0E0E0' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#1F2937' }}>
                        {rider.name}
                      </p>
                      <p className="text-xs" style={{ color: '#6B7280' }}>
                        ⭐ {rider.rating} · {rider.deliveriesToday} deliveries today
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
