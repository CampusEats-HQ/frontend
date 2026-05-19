import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign } from 'lucide-react';
import { earningsData } from '../../data/vendorMockData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function VendorEarnings() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-[1024px] mx-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-lg font-bold" style={{ color: '#1F2937' }}>
            Earnings
          </h1>
        </div>

        <div className="px-5 py-6">
          {/* Total Earned This Month */}
          <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#6366F1' }}>
            <p className="text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Total Earned This Month
            </p>
            <p className="text-3xl font-bold text-white">
              ₦{earningsData.thisMonth.toLocaleString()}
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg p-4" style={{ backgroundColor: '#F8F9FA' }}>
              <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                This Week's Earnings
              </p>
              <p className="text-xl font-bold" style={{ color: '#1F2937' }}>
                ₦{earningsData.thisWeek.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg p-4" style={{ backgroundColor: '#F8F9FA' }}>
              <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                Pending Settlement
              </p>
              <p className="text-xl font-bold" style={{ color: '#F59E0B' }}>
                ₦{earningsData.pendingSettlement.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#1F2937' }}>
              Last 7 Days
            </h2>
            <div className="rounded-lg p-4" style={{ backgroundColor: '#F8F9FA' }}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={earningsData.dailyEarnings}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis key="xaxis" dataKey="day" stroke="#6B7280" fontSize={12} />
                  <YAxis key="yaxis" stroke="#6B7280" fontSize={12} />
                  <Bar key="bar" dataKey="amount" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#1F2937' }}>
              Transaction History
            </h2>
            <div className="space-y-3 mb-4">
              {earningsData.transactions.map((txn, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg"
                  style={{ backgroundColor: '#F8F9FA' }}
                >
                  <div>
                    <p className="font-medium text-sm mb-1" style={{ color: '#1F2937' }}>
                      {new Date(txn.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>
                      {txn.orders} orders
                    </p>
                  </div>
                  <p className="font-bold" style={{ color: '#1F2937' }}>
                    ₦{txn.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Settlement Note */}
            <p className="text-xs text-center" style={{ color: '#6B7280' }}>
              Earnings are settled every 48 hours via your registered account.
            </p>
          </div>
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
              <DollarSign size={20} style={{ color: '#6366F1' }} />
              <span className="text-xs font-medium" style={{ color: '#6366F1' }}>
                Earnings
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
