import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, Users, DollarSign, Bell, User, BarChart3, Megaphone } from 'lucide-react';;
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { adminService } from '../../services/admin';
import AdminNav from '../../components/AdminNav';
import { toast } from 'sonner';

const orderStatusColors = ['#10B981', '#6366F1', '#EF4444'];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = (period: string) => {
    setLoading(true);
    adminService
      .getAnalytics(period)
      .then((res) => setAnalytics(res))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAnalytics(timeRange);
  }, [timeRange]);

  const revenueData = analytics?.revenueData ?? [];
  const ordersByTimeData = analytics?.ordersByTimeData ?? [];
  const vendorPerformanceData = analytics?.vendorPerformanceData ?? [];
  const orderStatusData = analytics?.orderStatusData ?? [];
  const riderPerformanceData = analytics?.riderPerformanceData ?? [];
  const customerGrowthData = analytics?.customerGrowthData ?? [];

  const metrics = analytics?.metrics ?? {
    totalRevenue: 0,
    totalOrders: 0,
    activeUsers: 0,
    avgOrderValue: 0,
    successRate: 0,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        <AdminNav />
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

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="rounded-lg p-4 border border-gray-300">
                  <p className="text-xs mb-2 text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold break-words text-gray-800">
                    ₦{(metrics.totalRevenue ?? 0).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg p-4 border border-gray-300">
                  <p className="text-xs mb-2 text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {(metrics.totalOrders ?? 0).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg p-4 border border-gray-300">
                  <p className="text-xs mb-2 text-gray-500">Active Users</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {(metrics.activeUsers ?? 0).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg p-4 border border-gray-300">
                  <p className="text-xs mb-2 text-gray-500">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ₦{(metrics.avgOrderValue ?? 0).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg p-4 border border-gray-300">
                  <p className="text-xs mb-2 text-gray-500">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {metrics.successRate ?? 0}%
                  </p>
                </div>
              </div>

              {/* Charts Row 1 */}
              {(revenueData.length > 0 || ordersByTimeData.length > 0) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Revenue Growth */}
                  {revenueData.length > 0 && (
                    <div className="rounded-lg p-5 border border-gray-300">
                      <h3 className="font-bold text-base mb-4 text-gray-800">
                        Revenue Growth
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
                  )}

                  {/* Orders by Time */}
                  {ordersByTimeData.length > 0 && (
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
                  )}
                </div>
              )}

              {/* Charts Row 2 */}
              {(vendorPerformanceData.length > 0 || orderStatusData.length > 0) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Vendor Performance */}
                  {vendorPerformanceData.length > 0 && (
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
                  )}

                  {/* Order Status Distribution */}
                  {orderStatusData.length > 0 && (
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
                            label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {orderStatusData.map((_entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={orderStatusColors[index % orderStatusColors.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )}

              {/* Tables Row */}
              {(riderPerformanceData.length > 0 || customerGrowthData.length > 0) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Rider Performance */}
                  {riderPerformanceData.length > 0 && (
                    <div className="rounded-lg border border-gray-300">
                      <h3 className="font-bold text-base p-5 border-b border-gray-100 text-gray-800">
                        Top Riders
                      </h3>
                      <div className="divide-y divide-gray-100">
                        {riderPerformanceData.map((rider: any, index: number) => (
                          <div key={index} className="p-4 flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm mb-1 truncate text-gray-800">
                                {rider.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {rider.deliveries} deliveries · ⭐ {rider.rating}
                                {rider.avgTime != null ? ` · ${rider.avgTime} min avg` : ''}
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
                  )}

                  {/* Customer Growth */}
                  {customerGrowthData.length > 0 && (
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
                  )}
                </div>
              )}

              {!analytics && (
                <p className="text-center text-gray-500 py-12">No analytics data available</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
