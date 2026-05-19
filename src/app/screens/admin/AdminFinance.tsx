import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, Users, DollarSign, Bell, User } from 'lucide-react';
import { financeStats, vendorPayouts, riderPayouts, settlementHistory } from '../../data/adminMockData';
import { toast } from 'sonner';

export default function AdminFinance() {
  const [activeTab, setActiveTab] = useState<'vendors' | 'riders'>('vendors');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('today');
  const [settledIds, setSettledIds] = useState<string[]>([]);

  const handleMarkSettled = (id: string, type: string, name: string, amount: number) => {
    if (confirm(`Mark ₦${amount.toLocaleString()} payment to ${name} as settled?`)) {
      setSettledIds([...settledIds, id]);
      toast.success(`Payment to ${name} marked as settled and moved to history!`);
    }
  };

  // Filter pending payouts (exclude settled items)
  const filteredVendorPayouts = useMemo(() => {
    return vendorPayouts.filter(v => !settledIds.includes(v.id));
  }, [settledIds]);

  const filteredRiderPayouts = useMemo(() => {
    return riderPayouts.filter(r => !settledIds.includes(r.id));
  }, [settledIds]);

  // Filter settlement history by date and include newly settled items
  const filteredSettlementHistory = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    // Add newly settled items to history
    const newSettlements = [
      ...vendorPayouts.filter(v => settledIds.includes(v.id)).map(v => ({
        id: `NEW-${v.id}`,
        date: new Date().toISOString().split('T')[0],
        recipientType: 'Vendor',
        recipientName: v.vendorName,
        amount: v.amountOwed,
        reference: `REF-${new Date().toISOString().split('T')[0]}-${v.id}`,
      })),
      ...riderPayouts.filter(r => settledIds.includes(r.id)).map(r => ({
        id: `NEW-${r.id}`,
        date: new Date().toISOString().split('T')[0],
        recipientType: 'Rider',
        recipientName: r.riderName,
        amount: r.amountOwed,
        reference: `REF-${new Date().toISOString().split('T')[0]}-${r.id}`,
      })),
    ];

    const allSettlements = [...newSettlements, ...settlementHistory];

    return allSettlements.filter((settlement) => {
      const settlementDate = new Date(settlement.date);
      if (dateFilter === 'today') return settlementDate >= today;
      if (dateFilter === 'week') return settlementDate >= weekAgo;
      if (dateFilter === 'month') return settlementDate >= monthAgo;
      return true; // 'all'
    });
  }, [dateFilter, settledIds]);

  // Calculate stats based on filtered data
  const calculatedStats = useMemo(() => {
    const totalSettled = filteredSettlementHistory.reduce((sum, s) => sum + s.amount, 0);

    // Calculate pending payouts (exclude settled items)
    const vendorPending = filteredVendorPayouts.reduce((sum, v) => sum + v.amountOwed, 0);
    const riderPending = filteredRiderPayouts.reduce((sum, r) => sum + r.amountOwed, 0);
    const totalPending = vendorPending + riderPending;

    // For demo purposes, using mock data for earnings
    const earnings = dateFilter === 'today' ? financeStats.platformEarningsToday :
                     dateFilter === 'week' ? financeStats.platformEarningsToday * 7 :
                     dateFilter === 'month' ? financeStats.platformEarningsToday * 30 :
                     financeStats.platformEarningsToday * 90;

    return {
      earnings,
      settled: totalSettled,
      pending: totalPending,
    };
  }, [dateFilter, filteredSettlementHistory, filteredVendorPayouts, filteredRiderPayouts]);

  const getPeriodLabel = () => {
    if (dateFilter === 'today') return 'Today';
    if (dateFilter === 'week') return 'This Week';
    if (dateFilter === 'month') return 'This Month';
    return 'All Time';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Bar */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-gray-800">
              CampusEats Admin
            </h1>
            <nav className="hidden lg:flex gap-4">
              <Link to="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <LayoutDashboard size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">Dashboard</span>
              </Link>
              <Link to="/admin/orders" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <ClipboardList size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">Orders</span>
              </Link>
              <Link to="/admin/people" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Users size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">People</span>
              </Link>
              <Link to="/admin/analytics" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <span className="text-sm text-gray-500">Analytics</span>
              </Link>
              <Link to="/admin/finance" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-indigo-500">
                <DollarSign size={18} />
                <span className="text-sm font-medium">Finance</span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="relative" aria-label="Notifications">
              <Bell size={20} className="text-gray-500" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-500">
                <User size={16} color="white" />
              </div>
              <span className="text-sm font-medium text-gray-800">Admin</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Finance &amp; Settlements
            </h2>

            {/* Date Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {(['today', 'week', 'month', 'all'] as const).map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setDateFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap ${dateFilter === filter ? 'bg-indigo-500 text-white' : 'bg-gray-50 text-gray-500'}`}
                >
                  {filter === 'all' ? 'All Time' : filter}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-lg p-4 md:p-5 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">
                Platform Earnings {getPeriodLabel()}
              </p>
              <p className="text-2xl md:text-3xl font-bold break-words text-gray-800">
                ₦{calculatedStats.earnings.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg p-4 md:p-5 border-2 border-amber-500">
              <p className="text-xs mb-2 text-gray-500">
                Pending Payouts
              </p>
              <p className="text-2xl md:text-3xl font-bold break-words text-amber-500">
                ₦{calculatedStats.pending.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg p-4 md:p-5 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">
                Settled {getPeriodLabel()}
              </p>
              <p className="text-2xl md:text-3xl font-bold break-words text-emerald-500">
                ₦{calculatedStats.settled.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 md:gap-4 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('vendors')}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'vendors' ? 'bg-indigo-500 text-white' : 'bg-gray-50 text-gray-500'}`}
            >
              Vendors
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('riders')}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'riders' ? 'bg-indigo-500 text-white' : 'bg-gray-50 text-gray-500'}`}
            >
              Riders
            </button>
          </div>

          {/* Vendors Tab */}
          {activeTab === 'vendors' && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Vendor Payouts
              </h3>
              {filteredVendorPayouts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">All vendors settled!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredVendorPayouts.map((vendor) => (
                    <div
                      key={vendor.id}
                      className="rounded-lg p-4 md:p-5 border border-gray-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base mb-1 truncate text-gray-800">
                          {vendor.vendorName}
                        </p>
                        <p className="text-sm mb-1 text-gray-500">
                          {vendor.ordersSinceLastSettlement} orders since last settlement
                        </p>
                        <p className="text-xs text-gray-500">
                          Last settled: {new Date(vendor.lastSettlementDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="text-left md:text-right flex-1">
                          <p className="text-xs mb-1 text-gray-500">
                            Amount Owed
                          </p>
                          <p className="text-xl md:text-2xl font-bold truncate text-amber-500">
                            ₦{vendor.amountOwed.toLocaleString()}
                          </p>
                        </div>
                        {vendor.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => handleMarkSettled(vendor.id, 'Vendor', vendor.vendorName, vendor.amountOwed)}
                            className="px-3 md:px-4 py-2 rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap bg-emerald-500 text-white"
                          >
                            Mark Settled
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Riders Tab */}
          {activeTab === 'riders' && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Rider Payouts
              </h3>
              {filteredRiderPayouts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">All riders settled!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRiderPayouts.map((rider) => (
                    <div
                      key={rider.id}
                      className="rounded-lg p-4 md:p-5 border border-gray-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base mb-1 truncate text-gray-800">
                          {rider.riderName}
                        </p>
                        <p className="text-sm mb-1 text-gray-500">
                          {rider.deliveriesSinceLastSettlement} deliveries × ₦300 = ₦{rider.amountOwed.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Last settled: {new Date(rider.lastSettlementDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="text-left md:text-right flex-1">
                          <p className="text-xs mb-1 text-gray-500">
                            Amount Owed
                          </p>
                          <p className="text-xl md:text-2xl font-bold truncate text-amber-500">
                            ₦{rider.amountOwed.toLocaleString()}
                          </p>
                        </div>
                        {rider.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => handleMarkSettled(rider.id, 'Rider', rider.riderName, rider.amountOwed)}
                            className="px-3 md:px-4 py-2 rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap bg-emerald-500 text-white"
                          >
                            Mark Settled
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settlement History */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Settlement History
              <span className="text-sm font-normal ml-2 text-gray-500">
                ({filteredSettlementHistory.length} {filteredSettlementHistory.length === 1 ? 'settlement' : 'settlements'})
              </span>
            </h3>
            {filteredSettlementHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No settlements in this period</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSettlementHistory.map((settlement) => (
                <div
                  key={settlement.id}
                  className="rounded-lg p-4 border border-gray-300 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm mb-1 truncate text-gray-800">
                      {settlement.recipientName}
                    </p>
                    <p className="text-xs mb-1 text-gray-500">
                      {settlement.recipientType} · {new Date(settlement.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs font-mono truncate text-gray-500">
                      Ref: {settlement.reference}
                    </p>
                  </div>
                  <div className="text-left md:text-right flex items-center md:flex-col md:items-end gap-2">
                    <p className="text-lg md:text-xl font-bold text-emerald-500">
                      ₦{settlement.amount.toLocaleString()}
                    </p>
                    <span className="px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap bg-emerald-100 text-emerald-500">
                      Settled
                    </span>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
