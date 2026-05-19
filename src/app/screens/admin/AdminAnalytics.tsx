import { useState } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, Users, DollarSign, Bell, User, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 1245000, orders: 1042 },
  { month: 'Feb', revenue: 1398000, orders: 1165 },
  { month: 'Mar', revenue: 1512000, orders: 1260 },
  { month: 'Apr', revenue: 1687000, orders: 1405 },
  { month: 'May', revenue: 1923000, orders: 1602 },
];

const ordersByTimeData = [
  { time: '6am', orders: 45 },
  { time: '9am', orders: 123 },
  { time: '12pm', orders: 287 },
  { time: '3pm', orders: 189 },
  { time: '6pm', orders: 245 },
  { time: '9pm', orders: 312 },
  { time: '12am', orders: 98 },
];

const vendorPerformanceData = [
  { name: 'Mavise Grill', orders: 425, revenue: 510000 },
  { name: 'Jollof Palace', orders: 389, revenue: 467000 },
  { name: 'Suya Kingdom', orders: 312, revenue: 374400 },
  { name: 'Eba & Egusi Spot', orders: 276, revenue: 276000 },
  { name: 'Quick Bites', orders: 200, revenue: 220000 },
];

const orderStatusData = [
  { name: 'Completed', value: 85, color: '#10B981' },
  { name: 'In Progress', value: 10, color: '#6366F1' },
  { name: 'Cancelled', value: 5, color: '#EF4444' },
];

const riderPerformanceData = [
  { name: 'Emeka Okafor', deliveries: 234, rating: 4.9, avgTime: 16 },
  { name: 'Ngozi Adeyemi', deliveries: 189, rating: 4.8, avgTime: 18 },
  { name: 'Ibrahim Sule', deliveries: 167, rating: 4.7, avgTime: 17 },
  { name: 'Funke Daniels', deliveries: 145, rating: 4.9, avgTime: 15 },
];

const customerGrowthData = [
  { week: 'Week 1', newUsers: 142, totalUsers: 1420 },
  { week: 'Week 2', newUsers: 189, totalUsers: 1609 },
  { week: 'Week 3', newUsers: 205, totalUsers: 1814 },
  { week: 'Week 4', newUsers: 234, totalUsers: 2048 },
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Bar */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-gray-800">
              CampusEats Admin
            </h1>
            <nav className="flex gap-4">
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
              <Link to="/admin/analytics" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-indigo-500">
                <BarChart3 size={18} />
                <span className="text-sm font-medium">Analytics</span>
              </Link>
              <Link to="/admin/finance" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <DollarSign size={18} className="text-gray-500" />
                <span className="text-sm text-gray-500">Finance</span>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Platform Analytics
            </h2>

            {/* Time Range Selector */}
            <div className="flex gap-2">
              {(['week', 'month', 'year'] as const).map((range) => (
                <button
                  type="button"
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap ${timeRange === range ? 'bg-indigo-500 text-white' : 'bg-gray-50 text-gray-500'}`}
                >
                  This {range}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="rounded-lg p-4 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold break-words text-gray-800">₦1.92M</p>
              <p className="text-xs text-emerald-500">+14% this month</p>
            </div>
            <div className="rounded-lg p-4 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">1,602</p>
              <p className="text-xs text-emerald-500">+8% this month</p>
            </div>
            <div className="rounded-lg p-4 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-gray-800">2,048</p>
              <p className="text-xs text-emerald-500">+234 this week</p>
            </div>
            <div className="rounded-lg p-4 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-800">₦1,200</p>
              <p className="text-xs text-emerald-500">+3% this month</p>
            </div>
            <div className="rounded-lg p-4 border border-gray-300">
              <p className="text-xs mb-2 text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold text-gray-800">95.2%</p>
              <p className="text-xs text-red-500">-1% this month</p>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Growth */}
            <div className="rounded-lg p-5 border border-gray-300">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Revenue Growth (Last 5 Months)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis key="xaxis" dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis key="yaxis" stroke="#6B7280" fontSize={12} />
                  <Tooltip />
                  <Area key="area" type="monotone" dataKey="revenue" stroke="#6366F1" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Orders by Time */}
            <div className="rounded-lg p-5 border border-gray-300">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Orders by Time of Day
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={ordersByTimeData}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis key="xaxis" dataKey="time" stroke="#6B7280" fontSize={12} />
                  <YAxis key="yaxis" stroke="#6B7280" fontSize={12} />
                  <Tooltip />
                  <Line key="line" type="monotone" dataKey="orders" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Vendor Performance */}
            <div className="rounded-lg p-5 border border-gray-300">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Top Vendors
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={vendorPerformanceData} layout="vertical">
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis key="xaxis" type="number" stroke="#6B7280" fontSize={12} />
                  <YAxis key="yaxis" dataKey="name" type="category" stroke="#6B7280" fontSize={12} width={100} />
                  <Tooltip />
                  <Bar key="bar" dataKey="orders" fill="#6366F1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Order Status Distribution */}
            <div className="rounded-lg p-5 border border-gray-300">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Order Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rider Performance */}
            <div className="rounded-lg border border-gray-300">
              <h3 className="font-bold text-base p-5 border-b border-gray-100 text-gray-800">
                Top Riders
              </h3>
              <div className="divide-y divide-gray-100">
                {riderPerformanceData.map((rider, index) => (
                  <div key={index} className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1 truncate text-gray-800">
                        {rider.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {rider.deliveries} deliveries · ⭐ {rider.rating} · {rider.avgTime} min avg
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-3">
                      <div className="px-3 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-500">
                        Top Performer
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Growth */}
            <div className="rounded-lg p-5 border border-gray-300">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Customer Growth
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={customerGrowthData}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis key="xaxis" dataKey="week" stroke="#6B7280" fontSize={12} />
                  <YAxis key="yaxis" stroke="#6B7280" fontSize={12} />
                  <Tooltip />
                  <Bar key="bar1" dataKey="newUsers" fill="#10B981" name="New Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
