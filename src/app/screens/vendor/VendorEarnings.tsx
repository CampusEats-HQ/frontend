import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign, User } from 'lucide-react';
import { toast } from 'sonner';
import { vendorService } from '../../services/vendor';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DailyEarning {
  day: string;
  amount: number;
  [key: string]: unknown;
}

interface Transaction {
  date: string;
  orders: number;
  amount: number;
  [key: string]: unknown;
}

interface EarningsData {
  thisMonth: number;
  thisWeek: number;
  pendingSettlement: number;
  dailyEarnings: DailyEarning[];
  transactions: Transaction[];
}

export default function VendorEarnings() {
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorService.getEarnings()
      .then((res) => setEarnings(res as EarningsData))
      .catch(() => toast.error('Failed to load earnings'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-[1024px] mx-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800">
            Earnings
          </h1>
        </div>

        <div className="px-5 py-6">
          {/* Total Earned This Month */}
          <div className="rounded-lg p-6 mb-6 bg-indigo-500">
            <p className="text-sm mb-2 text-white/80">
              Total Earned This Month
            </p>
            <p className="text-3xl font-bold text-white">
              ₦{(earnings?.thisMonth ?? 0).toLocaleString()}
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg p-4 bg-gray-50">
              <p className="text-xs mb-1 text-gray-500">
                This Week's Earnings
              </p>
              <p className="text-xl font-bold text-gray-800">
                ₦{(earnings?.thisWeek ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg p-4 bg-gray-50">
              <p className="text-xs mb-1 text-gray-500">
                Pending Settlement
              </p>
              <p className="text-xl font-bold text-amber-500">
                ₦{(earnings?.pendingSettlement ?? 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-4 text-gray-800">
              Last 7 Days
            </h2>
            <div className="rounded-lg p-4 bg-gray-50">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={earnings?.dailyEarnings ?? []}>
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
            <h2 className="text-sm font-semibold mb-4 text-gray-800">
              Transaction History
            </h2>
            <div className="space-y-3 mb-4">
              {(earnings?.transactions ?? []).map((txn, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-sm mb-1 text-gray-800">
                      {new Date(txn.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {txn.orders} orders
                    </p>
                  </div>
                  <p className="font-bold text-gray-800">
                    ₦{txn.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Settlement Note */}
            <p className="text-xs text-center text-gray-500">
              Earnings are settled every 48 hours via your registered account.
            </p>
          </div>
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
              <ClipboardList size={20} className="text-gray-500" />
              <span className="text-xs text-gray-500">
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
              <DollarSign size={20} className="text-indigo-500" />
              <span className="text-xs font-medium text-indigo-500">
                Earnings
              </span>
            </Link>
            <Link to="/vendor/profile" className="flex flex-col items-center gap-1">
              <User size={20} className="text-gray-500" />
              <span className="text-xs text-gray-500">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
