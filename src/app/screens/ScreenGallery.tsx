import { Link } from 'react-router';
import { ExternalLink } from 'lucide-react';

const screens = {
  customer: [
    { name: 'Splash', path: '/', description: 'Welcome screen with portal selection' },
    { name: 'Login', path: '/login', description: 'Customer login' },
    { name: 'Sign Up', path: '/signup', description: 'Customer registration' },
    { name: 'Home', path: '/home', description: 'Browse restaurants and categories' },
    { name: 'Restaurant Detail', path: '/restaurant/r1', description: 'Menu and restaurant info' },
    { name: 'Cart', path: '/cart', description: 'Review order before checkout' },
    { name: 'Payment', path: '/payment', description: 'Select payment method and confirm' },
    { name: 'Order Tracking', path: '/tracking/1042', description: 'Live order status tracking' },
    { name: 'Order Success', path: '/success/1042', description: 'Order confirmation' },
    { name: 'Order History', path: '/orders', description: 'Past orders with reorder option' },
    { name: 'Profile', path: '/profile', description: 'Account settings and menu' },
    { name: 'Saved Addresses', path: '/addresses', description: 'Manage delivery locations' },
    { name: 'Notifications', path: '/notifications', description: 'Activity feed and updates' },
    { name: 'Help & Support', path: '/help', description: 'FAQs and contact support' },
  ],
  vendor: [
    { name: 'Vendor Login', path: '/vendor/login', description: 'Restaurant owner login' },
    { name: 'Vendor Dashboard', path: '/vendor/dashboard', description: 'Overview and new orders' },
    { name: 'Vendor Orders', path: '/vendor/orders', description: 'All orders with filters' },
    { name: 'Order Detail', path: '/vendor/orders/1', description: 'Single order details' },
    { name: 'Menu Management', path: '/vendor/menu', description: 'View and edit menu items' },
    { name: 'Edit Menu Item', path: '/vendor/menu/r1', description: 'Edit item details' },
    { name: 'Analytics & Reports', path: '/vendor/analytics', description: 'Sales charts and performance' },
    { name: 'Earnings', path: '/vendor/earnings', description: 'Revenue and payouts' },
    { name: 'Vendor Profile', path: '/vendor/profile', description: 'Account and settings' },
  ],
  rider: [
    { name: 'Rider Login', path: '/rider/login', description: 'Rider login portal' },
    { name: 'Rider Signup', path: '/rider/signup', description: 'Apply to become a rider' },
    { name: 'Rider Home', path: '/rider/home', description: 'Online/offline toggle and stats' },
    { name: 'Order Alert', path: '/rider/order-alert', description: 'Incoming order notification' },
    { name: 'Active Delivery', path: '/rider/delivery', description: 'Delivery in progress' },
    { name: 'Rider Earnings', path: '/rider/earnings', description: 'Income and payout history' },
    { name: 'Rider Profile', path: '/rider/profile', description: 'Settings and bank details' },
  ],
  admin: [
    { name: 'Admin Login', path: '/admin/login', description: 'Admin portal login' },
    { name: 'Admin Dashboard', path: '/admin/dashboard', description: 'Platform overview and live feed' },
    { name: 'Order Management', path: '/admin/orders', description: 'Assign riders and manage orders' },
    { name: 'People Management', path: '/admin/people', description: 'Riders and vendors' },
    { name: 'Platform Analytics', path: '/admin/analytics', description: 'Charts and performance metrics' },
    { name: 'Finance & Settlements', path: '/admin/finance', description: 'Payouts and settlement tracking' },
  ],
};

export default function ScreenGallery() {
  const totalScreens = Object.values(screens).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1F2937' }}>
            CampusEats Screen Gallery
          </h1>
          <p className="text-lg" style={{ color: '#6B7280' }}>
            Complete design system • {totalScreens} screens across 4 portals
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0', backgroundColor: '#EEF2FF' }}>
            <p className="text-xs mb-1" style={{ color: '#6366F1' }}>Customer App</p>
            <p className="text-2xl font-bold" style={{ color: '#6366F1' }}>{screens.customer.length}</p>
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0', backgroundColor: '#FEF3C7' }}>
            <p className="text-xs mb-1" style={{ color: '#F59E0B' }}>Vendor Portal</p>
            <p className="text-2xl font-bold" style={{ color: '#F59E0B' }}>{screens.vendor.length}</p>
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0', backgroundColor: '#D1FAE5' }}>
            <p className="text-xs mb-1" style={{ color: '#10B981' }}>Rider Portal</p>
            <p className="text-2xl font-bold" style={{ color: '#10B981' }}>{screens.rider.length}</p>
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0', backgroundColor: '#DBEAFE' }}>
            <p className="text-xs mb-1" style={{ color: '#6366F1' }}>Admin Portal</p>
            <p className="text-2xl font-bold" style={{ color: '#6366F1' }}>{screens.admin.length}</p>
          </div>
        </div>

        {/* Customer App */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#6366F1' }}>
            Customer App ({screens.customer.length} screens)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.customer.map((screen, index) => (
              <Link
                key={index}
                to={screen.path}
                className="rounded-lg p-4 border hover:border-blue-500 transition-colors"
                style={{ borderColor: '#E0E0E0' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-base" style={{ color: '#1F2937' }}>
                    {screen.name}
                  </h3>
                  <ExternalLink size={16} style={{ color: '#6366F1' }} />
                </div>
                <p className="text-sm mb-2" style={{ color: '#6B7280' }}>
                  {screen.description}
                </p>
                <p className="text-xs font-mono" style={{ color: '#9CA3AF' }}>
                  {screen.path}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Vendor Portal */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#F59E0B' }}>
            Vendor Portal ({screens.vendor.length} screens)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.vendor.map((screen, index) => (
              <Link
                key={index}
                to={screen.path}
                className="rounded-lg p-4 border hover:border-amber-500 transition-colors"
                style={{ borderColor: '#E0E0E0' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-base" style={{ color: '#1F2937' }}>
                    {screen.name}
                  </h3>
                  <ExternalLink size={16} style={{ color: '#F59E0B' }} />
                </div>
                <p className="text-sm mb-2" style={{ color: '#6B7280' }}>
                  {screen.description}
                </p>
                <p className="text-xs font-mono" style={{ color: '#9CA3AF' }}>
                  {screen.path}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Rider Portal */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#10B981' }}>
            Rider Portal ({screens.rider.length} screens)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.rider.map((screen, index) => (
              <Link
                key={index}
                to={screen.path}
                className="rounded-lg p-4 border hover:border-green-500 transition-colors"
                style={{ borderColor: '#E0E0E0' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-base" style={{ color: '#1F2937' }}>
                    {screen.name}
                  </h3>
                  <ExternalLink size={16} style={{ color: '#10B981' }} />
                </div>
                <p className="text-sm mb-2" style={{ color: '#6B7280' }}>
                  {screen.description}
                </p>
                <p className="text-xs font-mono" style={{ color: '#9CA3AF' }}>
                  {screen.path}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Admin Portal */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#6366F1' }}>
            Admin Portal ({screens.admin.length} screens)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screens.admin.map((screen, index) => (
              <Link
                key={index}
                to={screen.path}
                className="rounded-lg p-4 border hover:border-blue-500 transition-colors"
                style={{ borderColor: '#E0E0E0' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-base" style={{ color: '#1F2937' }}>
                    {screen.name}
                  </h3>
                  <ExternalLink size={16} style={{ color: '#6366F1' }} />
                </div>
                <p className="text-sm mb-2" style={{ color: '#6B7280' }}>
                  {screen.description}
                </p>
                <p className="text-xs font-mono" style={{ color: '#9CA3AF' }}>
                  {screen.path}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: '#E0E0E0' }}>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            CampusEats • Complete Food Delivery Platform for University of Lagos
          </p>
          <p className="text-xs mt-2" style={{ color: '#9CA3AF' }}>
            Built with React, TypeScript, Tailwind CSS, and Recharts
          </p>
        </div>
      </div>
    </div>
  );
}
