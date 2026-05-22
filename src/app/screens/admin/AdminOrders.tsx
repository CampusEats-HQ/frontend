import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { X, LayoutDashboard, ClipboardList, Users, DollarSign, Bell, User, Megaphone } from 'lucide-react';;
import { adminService } from '../../services/admin';
import AdminNav from '../../components/AdminNav';
import { toast } from 'sonner';

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState<'all' | 'unassigned' | 'active' | 'completed'>('unassigned');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [unassignedOrders, setUnassignedOrders] = useState<any[]>([]);
  const [availableRiders, setAvailableRiders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = (tab: typeof activeTab) => {
    setLoading(true);
    const statusMap: Record<typeof activeTab, string | undefined> = {
      all: undefined,
      unassigned: undefined,
      active: 'active',
      completed: 'completed',
    };

    if (tab === 'unassigned') {
      Promise.all([
        adminService.getUnassignedOrders(),
        adminService.getRiders('active'),
      ])
        .then(([unassigned, riders]) => {
          setUnassignedOrders(unassigned.orders);
          setAvailableRiders(riders.riders.filter((r: any) => r.status === 'available'));
        })
        .catch(() => toast.error('Failed to load orders'))
        .finally(() => setLoading(false));
    } else {
      adminService
        .getOrders(statusMap[tab])
        .then((res) => setAllOrders(res.orders))
        .catch(() => toast.error('Failed to load orders'))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchOrders(activeTab);
  }, [activeTab]);

  const handleAssignRider = async (riderId: string, riderName: string) => {
    if (!selectedOrder) return;
    try {
      await adminService.assignRider(selectedOrder.id, riderId);
      toast.success(`Order ${selectedOrder.id} assigned to ${riderName}`);
      setShowAssignModal(false);
      setSelectedOrder(null);
      fetchOrders(activeTab);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to assign rider');
    }
  };

  const formatWaitingTime = (timestamp: string | Date) => {
    const ts = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    const seconds = Math.floor((Date.now() - ts.getTime()) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-[1400px] mx-auto">
        <AdminNav />

        <div className="px-6 py-6">
          {/* Header */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Order Management
          </h2>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
          {(['all', 'unassigned', 'active', 'completed'] as const).map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize ${activeTab === tab ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {tab}
              {tab === 'unassigned' && unassignedOrders.length > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-500 dark:bg-amber-900/30 dark:text-amber-400">
                  {unassignedOrders.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Content */}
            {activeTab === 'unassigned' && (
              <div className="space-y-4">
                {unassignedOrders.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">No unassigned orders</p>
                ) : (
                  unassignedOrders.map((order: any) => (
                    <div
                      key={order.id}
                      className="rounded-lg p-4 md:p-5 border-2 border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-base mb-1 text-gray-800 dark:text-gray-100">
                            {order.id}
                          </p>
                          <p className="text-sm mb-1 break-words text-gray-500 dark:text-gray-400">
                            {order.customerName} · {order.restaurant}
                          </p>
                          <div className="mt-2">
                            {(order.items ?? []).map((item: string, idx: number) => (
                              <p key={idx} className="text-xs break-words text-gray-500 dark:text-gray-400">
                                • {item}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                          {order.timestamp && (
                            <p className="text-base md:text-lg font-bold mb-1 text-amber-500">
                              Waiting {formatWaitingTime(order.timestamp)}
                            </p>
                          )}
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ₦{order.total}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowAssignModal(true);
                        }}
                        className="w-full h-11 rounded-lg font-semibold text-sm md:text-base bg-amber-500 text-white"
                      >
                        Assign Rider
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'active' && (
              <div className="space-y-4">
                {allOrders.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">No active orders</p>
                ) : (
                  allOrders.map((order: any) => (
                    <div key={order.id} className="rounded-lg p-4 md:p-5 border border-gray-300 dark:border-gray-600">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-base mb-1 text-gray-800 dark:text-gray-100">
                            {order.id}
                          </p>
                          <p className="text-sm mb-1 break-words text-gray-500 dark:text-gray-400">
                            {order.customerName} · {order.restaurant}
                          </p>
                          {order.riderName && (
                            <p className="text-sm truncate text-indigo-500">
                              Rider: {order.riderName}
                            </p>
                          )}
                        </div>
                        <span className="px-3 py-1 rounded text-sm font-medium self-start whitespace-nowrap bg-blue-100 text-indigo-500 dark:bg-indigo-900">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="space-y-4">
                {allOrders.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">No completed orders</p>
                ) : (
                  allOrders.map((order: any) => (
                    <div key={order.id} className="rounded-lg p-4 md:p-5 border border-gray-300 dark:border-gray-600">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-base mb-1 text-gray-800 dark:text-gray-100">
                            {order.id}
                          </p>
                          <p className="text-sm mb-1 break-words text-gray-500 dark:text-gray-400">
                            {order.customerName} · {order.restaurant}
                            {order.riderName ? ` · Rider: ${order.riderName}` : ''}
                          </p>
                          {(order.completedAt || order.duration) && (
                            <p className="text-xs break-words text-gray-500 dark:text-gray-400">
                              {order.completedAt}{order.duration ? ` · Duration: ${order.duration}` : ''}
                            </p>
                          )}
                        </div>
                        <p className="font-bold text-left md:text-right whitespace-nowrap text-gray-800 dark:text-gray-100">
                          ₦{order.total}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'all' && (
              <div className="space-y-4">
                {allOrders.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">No orders found</p>
                ) : (
                  allOrders.map((order: any) => (
                    <div key={order.id} className="rounded-lg p-4 md:p-5 border border-gray-300 dark:border-gray-600">
                      <p className="font-bold break-words text-gray-800 dark:text-gray-100">{order.id}</p>
                      {order.customerName && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{order.customerName} · {order.restaurant}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
        </div>
      </div>

      {/* Assign Rider Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full mx-5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Assign Rider to {selectedOrder?.id}
              </h2>
              <button type="button" onClick={() => setShowAssignModal(false)} aria-label="Close modal">
                <X size={24} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
              Select an available rider to assign this order
            </p>

            {availableRiders.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">No available riders at this time</p>
            ) : (
              <div className="space-y-2">
                {availableRiders.map((rider: any) => (
                  <button
                    type="button"
                    key={rider.id}
                    onClick={() => handleAssignRider(rider.id, rider.name)}
                    className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 text-left hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                          {rider.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ⭐ {rider.rating} · {rider.deliveriesToday} deliveries today
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
