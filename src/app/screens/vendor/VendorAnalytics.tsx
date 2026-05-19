import { useState } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign, Settings, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const dailySalesData = [
  { day: 'Mon', orders: 45, revenue: 54000 },
  { day: 'Tue', orders: 52, revenue: 62400 },
  { day: 'Wed', orders: 38, revenue: 45600 },
  { day: 'Thu', orders: 61, revenue: 73200 },
  { day: 'Fri', orders: 73, revenue: 87600 },
  { day: 'Sat', orders: 89, revenue: 106800 },
  { day: 'Sun', orders: 67, revenue: 80400 },
];

const topItemsData = [
  { name: 'Jollof Rice', orders: 234, revenue: 280800 },
  { name: 'Fried Rice', orders: 189, revenue: 283500 },
  { name: 'Chicken Wings', orders: 156, revenue: 124800 },
  { name: 'Suya', orders: 142, revenue: 255600 },
  { name: 'Moi Moi', orders: 98, revenue: 19600 },
];

const orderSourceData = [
  { name: 'Direct Orders', value: 65, color: '#6366F1' },
  { name: 'Search', value: 25, color: '#F59E0B' },
  { name: 'Favorites', value: 10, color: '#10B981' },
];

const peakHoursData = [
  { hour: '8am', orders: 12 },
  { hour: '10am', orders: 28 },
  { hour: '12pm', orders: 65 },
  { hour: '2pm', orders: 54 },
  { hour: '4pm', orders: 32 },
  { hour: '6pm', orders: 48 },
  { hour: '8pm', orders: 71 },
  { hour: '10pm', orders: 45 },
];

export default function VendorAnalytics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1024px] mx-auto">
        {/* Top Bar */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-xl font-bold" style={{ color: '#1F2937' }}>
            Mavise Grill
          </h1>
          <div className="flex items-center gap-4">
            <nav className="flex gap-2">
              <Link to="/vendor/dashboard" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100" style={{ color: '#6B7280' }}>
                <LayoutDashboard size={18} />
              </Link>
              <Link to="/vendor/orders" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100" style={{ color: '#6B7280' }}>
                <ClipboardList size={18} />
              </Link>
              <Link to="/vendor/menu" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100" style={{ color: '#6B7280' }}>
                <UtensilsCrossed size={18} />
              </Link>
              <Link to="/vendor/analytics" className="px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: '#DBEAFE', color: '#6366F1' }}>
                <TrendingUp size={18} />
              </Link>
              <Link to="/vendor/earnings" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100" style={{ color: '#6B7280' }}>
                <DollarSign size={18} />
              </Link>
            </nav>
            <Link to="/vendor/profile">
              <Settings size={20} style={{ color: '#6B7280' }} />
            </Link>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#1F2937' }}>
              Analytics & Reports
            </h2>

            {/* Time Range Selector */}
            <div className="flex gap-2">
              {(['week', 'month', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize"
                  style={
                    timeRange === range
                      ? { backgroundColor: '#6366F1', color: 'white' }
                      : { backgroundColor: '#F8F9FA', color: '#6B7280' }
                  }
                >
                  This {range}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs" style={{ color: '#6B7280' }}>Total Orders</p>
                <TrendingUp size={16} style={{ color: '#10B981' }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: '#1F2937' }}>425</p>
              <p className="text-xs" style={{ color: '#10B981' }}>
                +12% from last week
              </p>
            </div>

            <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs" style={{ color: '#6B7280' }}>Total Revenue</p>
                <TrendingUp size={16} style={{ color: '#10B981' }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: '#1F2937' }}>₦510,000</p>
              <p className="text-xs" style={{ color: '#10B981' }}>
                +18% from last week
              </p>
            </div>

            <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs" style={{ color: '#6B7280' }}>Avg Order Value</p>
                <TrendingUp size={16} style={{ color: '#10B981' }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: '#1F2937' }}>₦1,200</p>
              <p className="text-xs" style={{ color: '#10B981' }}>
                +5% from last week
              </p>
            </div>

            <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs" style={{ color: '#6B7280' }}>Completion Rate</p>
                <TrendingDown size={16} style={{ color: '#EF4444' }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: '#1F2937' }}>94.2%</p>
              <p className="text-xs" style={{ color: '#EF4444' }}>
                -2% from last week
              </p>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Daily Sales */}
            <div className="rounded-lg p-5 border" style={{ borderColor: '#E0E0E0' }}>
              <h3 className="font-bold text-base mb-4" style={{ color: '#1F2937' }}>
                Daily Sales (This Week)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailySalesData}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis key="xaxis" dataKey="day" stroke="#6B7280" fontSize={12} />
                  <YAxis key="yaxis" stroke="#6B7280" fontSize={12} />
                  <Tooltip />
                  <Bar key="bar" dataKey="revenue" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Peak Hours */}
            <div className="rounded-lg p-5 border" style={{ borderColor: '#E0E0E0' }}>
              <h3 className="font-bold text-base mb-4" style={{ color: '#1F2937' }}>
                Peak Order Hours
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={peakHoursData}>
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
            <div className="rounded-lg p-5 border" style={{ borderColor: '#E0E0E0' }}>
              <h3 className="font-bold text-base mb-4" style={{ color: '#1F2937' }}>
                Top Selling Items
              </h3>
              <div className="space-y-3">
                {topItemsData.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium" style={{ color: '#1F2937' }}>
                        {index + 1}. {item.name}
                      </p>
                      <p className="text-sm font-bold" style={{ color: '#6366F1' }}>
                        {item.orders} orders
                      </p>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(item.orders / topItemsData[0].orders) * 100}%`,
                          backgroundColor: '#6366F1',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Sources */}
            <div className="rounded-lg p-5 border" style={{ borderColor: '#E0E0E0' }}>
              <h3 className="font-bold text-base mb-4" style={{ color: '#1F2937' }}>
                Order Sources
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={orderSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
