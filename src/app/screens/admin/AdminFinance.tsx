import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, Users, DollarSign, Bell, User, Megaphone } from 'lucide-react';;
import { adminService } from '../../services/admin';
import { toast } from 'sonner';

export default function AdminFinance() {
  const [activeTab, setActiveTab] = useState<'vendors' | 'riders'>('vendors');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('today');

  const [financeStats, setFinanceStats] = useState({
    platformEarningsToday: 0,
    pendingPayouts: 0,
    settledThisWeek: 0,
  });
  const [vendorPayouts, setVendorPayouts] = useState<any[]>([]);
  const [riderPayouts, setRiderPayouts] = useState<any[]>([]);
  const [settlements, setSettlements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      adminService.getFinance(),
      adminService.getVendorPayouts(),
      adminService.getRiderPayouts(),
      adminService.getSettlements(dateFilter !== 'all' ? dateFilter : undefined),
    ])
      .then(([finance, vendorRes, riderRes, settlementsRes]) => {
        setFinanceStats(finance);
        setVendorPayouts(vendorRes.payouts);
        setRiderPayouts(riderRes.payouts);
        setSettlements(settlementsRes.settlements);
      })
      .catch(() => toast.error('Failed to load finance data'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [dateFilter]);

  const handleMarkSettled = async (id: string, name: string, amount: number) => {
    if (confirm(`Mark ₦${amount.toLocaleString()} payment to ${name} as settled?`)) {
      try {
        await adminService.settlePayout(id);
        toast.success(`Payment to ${name} marked as settled and moved to history!`);
        loadData();
      } catch (err: any) {
        toast.error(err?.message || 'Failed to settle payout');
      }
    }
  };

  const getPeriodLabel = () => {
    if (dateFilter === 'today') return 'Today';
    if (dateFilter === 'week') return 'This Week';
    if (dateFilter === 'month') return 'This Month';
    return 'All Time';
  };

  const calculatedStats = useMemo(() => {
    const vendorPending = vendorPayouts
      .filter((v) => v.status === 'pending')
      .reduce((sum: number, v: any) => sum + (v.amountOwed ?? 0), 0);
    const riderPending = riderPayouts
      .filter((r) => r.status === 'pending')
      .reduce((sum: number, r: any) => sum + (r.amountOwed ?? 0), 0);
    const totalSettled = settlements.reduce(
      (sum: number, s: any) => sum + (s.amount ?? 0),
      0,
    );
    return {
      earnings: financeStats.platformEarningsToday,
      pending: vendorPending + riderPending,
      settled: totalSettled,
    };
  }, [vendorPayouts, riderPayouts, settlements, financeStats]);

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
              <Link to="/admin/promotions" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Megaphone size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">Promotions</span>
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

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
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
                  {vendorPayouts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">All vendors settled!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {vendorPayouts.map((vendor: any) => (
                        <div
                          key={vendor.id}
                          className="rounded-lg p-4 md:p-5 border border-gray-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-base mb-1 truncate text-gray-800">
                              {vendor.vendorName}
                            </p>
                            {vendor.ordersSinceLastSettlement != null && (
                              <p className="text-sm mb-1 text-gray-500">
                                {vendor.ordersSinceLastSettlement} orders since last settlement
                              </p>
                            )}
                            {vendor.lastSettlementDate && (
                              <p className="text-xs text-gray-500">
                                Last settled: {new Date(vendor.lastSettlementDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="text-left md:text-right flex-1">
                              <p className="text-xs mb-1 text-gray-500">
                                Amount Owed
                              </p>
                              <p className="text-xl md:text-2xl font-bold truncate text-amber-500">
                                ₦{(vendor.amountOwed ?? 0).toLocaleString()}
                              </p>
                            </div>
                            {vendor.status === 'pending' && (
                              <button
                                type="button"
                                onClick={() => handleMarkSettled(vendor.id, vendor.vendorName, vendor.amountOwed)}
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
                  {riderPayouts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">All riders settled!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {riderPayouts.map((rider: any) => (
                        <div
                          key={rider.id}
                          className="rounded-lg p-4 md:p-5 border border-gray-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-base mb-1 truncate text-gray-800">
                              {rider.riderName}
                            </p>
                            {rider.deliveriesSinceLastSettlement != null && (
                              <p className="text-sm mb-1 text-gray-500">
                                {rider.deliveriesSinceLastSettlement} deliveries × ₦300 = ₦{(rider.amountOwed ?? 0).toLocaleString()}
                              </p>
                            )}
                            {rider.lastSettlementDate && (
                              <p className="text-xs text-gray-500">
                                Last settled: {new Date(rider.lastSettlementDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="text-left md:text-right flex-1">
                              <p className="text-xs mb-1 text-gray-500">
                                Amount Owed
                              </p>
                              <p className="text-xl md:text-2xl font-bold truncate text-amber-500">
                                ₦{(rider.amountOwed ?? 0).toLocaleString()}
                              </p>
                            </div>
                            {rider.status === 'pending' && (
                              <button
                                type="button"
                                onClick={() => handleMarkSettled(rider.id, rider.riderName, rider.amountOwed)}
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
                    ({settlements.length} {settlements.length === 1 ? 'settlement' : 'settlements'})
                  </span>
                </h3>
                {settlements.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No settlements in this period</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {settlements.map((settlement: any) => (
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
                          ₦{(settlement.amount ?? 0).toLocaleString()}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
