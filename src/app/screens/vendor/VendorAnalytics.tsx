import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign, Settings, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { vendorService } from '../../services/vendor';

interface DailySaleItem {
  day: string;
  orders?: number;
  revenue?: number;
  [key: string]: unknown;
}

interface PeakHourItem {
  hour: string;
  orders?: number;
  [key: string]: unknown;
}

interface TopItem {
  name: string;
  orders?: number;
  revenue?: number;
  [key: string]: unknown;
}

interface OrderSourceItem {
  name: string;
  value?: number;
  color?: string;
  [key: string]: unknown;
}

interface AnalyticsData {
  dailySales: DailySaleItem[];
  peakHours: PeakHourItem[];
  topItems: TopItem[];
  orderSources: OrderSourceItem[];
}

export default function VendorAnalytics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    vendorService.getAnalytics(timeRange === 'year' ? undefined : timeRange)
      .then((res) => setAnalytics(res as AnalyticsData))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, [timeRange]);

  const dailySales = analytics?.dailySales ?? [];
  const peakHours = analytics?.peakHours ?? [];
  const topItems = analytics?.topItems ?? [];
  const orderSources = analytics?.orderSources ?? [];

  const topItemsMax = topItems.length > 0 ? ((topItems[0].orders as number) ?? 1) : 1;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1024px] mx-auto">
        {/* Top Bar */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            Mavise Grill
          </h1>
          <div className="flex items-center gap-4">
            <nav className="flex gap-2">
              <Link to="/vendor/dashboard" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100 text-gray-500">
                <LayoutDashboard size={18} />
              </Link>
              <Link to="/vendor/orders" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100 text-gray-500">
                <ClipboardList size={18} />
              </Link>
              <Link to="/vendor/menu" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100 text-gray-500">
                <UtensilsCrossed size={18} />
              </Link>
              <Link to="/vendor/analytics" className="px-3 py-2 rounded-lg text-sm bg-blue-100 text-indigo-500">
                <TrendingUp size={18} />
              </Link>
              <Link to="/vendor/earnings" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100 text-gray-500">
                <DollarSign size={18} />
              </Link>
            </nav>
            <Link to="/vendor/profile">
              <Settings size={20} className="text-gray-500" />
            </Link>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Analytics & Reports
            </h2>

            {/* Time Range Selector */}
            <div className="flex gap-2">
              {(['week', 'month', 'year'] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${
                    timeRange === range
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  This {range}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg p-4 border border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">Total Orders</p>
                <TrendingUp size={16} className="text-emerald-500" />
              </div>
              <p className="text-2xl font-bold mb-1 text-gray-800">
                {dailySales.reduce((sum, d) => sum + ((d.orders as number) ?? 0), 0)}
              </p>
              <p className="text-xs text-emerald-500">
                +12% from last week
              </p>
            </div>

            <div className="rounded-lg p-4 border border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">Total Revenue</p>
                <TrendingUp size={16} className="text-emerald-500" />
              </div>
              <p className="text-2xl font-bold mb-1 text-gray-800">
                ₦{dailySales.reduce((sum, d) => sum + ((d.revenue as number) ?? 0), 0).toLocaleString()}
              </p>
              <p className="text-xs text-emerald-500">
                +18% from last week
              </p>
            </div>

            <div className="rounded-lg p-4 border border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">Avg Order Value</p>
                <TrendingUp size={16} className="text-emerald-500" />
              </div>
              <p className="text-2xl font-bold mb-1 text-gray-800">
                {(() => {
                  const totalOrders = dailySales.reduce((sum, d) => sum + ((d.orders as number) ?? 0), 0);
                  const totalRevenue = dailySales.reduce((sum, d) => sum + ((d.revenue as number) ?? 0), 0);
                  return totalOrders > 0 ? `₦${Math.round(totalRevenue / totalOrders).toLocaleString()}` : '₦0';
                })()}
              </p>
              <p className="text-xs text-emerald-500">
                +5% from last week
              </p>
            </div>

            <div className="rounded-lg p-4 border border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">Completion Rate</p>
                <TrendingDown size={16} className="text-red-500" />
              </div>
              <p className="text-2xl font-bold mb-1 text-gray-800">94.2%</p>
              <p className="text-xs text-red-500">
                -2% from last week
              </p>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Daily Sales */}
            <div className="rounded-lg p-5 border border-gray-300">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Daily Sales (This Week)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailySales}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis key="xaxis" dataKey="day" stroke="#6B7280" fontSize={12} />
                  <YAxis key="yaxis" stroke="#6B7280" fontSize={12} />
                  <Tooltip />
                  <Bar key="bar" dataKey="revenue" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Peak Hours */}
            <div className="rounded-lg p-5 border border-gray-300">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Peak Order Hours
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={peakHours}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis key="xaxis" dataKey="hour" stroke="#6B7280" fontSize={12} />
                  <YAxis key="yaxis" stroke="#6B7280" fontSize={12} />
                  <Tooltip />
                  <Line key="line" type="monotone" dataKey="orders" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Selling Items */}
            <div className="rounded-lg p-5 border border-gray-300">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Top Selling Items
              </h3>
              <div className="space-y-3">
                {topItems.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-800">
                        {index + 1}. {item.name}
                      </p>
                      <p className="text-sm font-bold text-indigo-500">
                        {item.orders} orders
                      </p>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden bg-gray-50">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${(((item.orders as number) ?? 0) / topItemsMax) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Sources */}
            <div className="rounded-lg p-5 border border-gray-300">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Order Sources
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={orderSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={(entry.color as string) ?? '#6366F1'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
