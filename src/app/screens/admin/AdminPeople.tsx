import { useState } from 'react';
import { Link } from 'react-router';
import { X, Plus, LayoutDashboard, ClipboardList, Users, DollarSign, Bell, User } from 'lucide-react';
import { pendingRiders, activeRiders, allVendors } from '../../data/adminMockData';
import { banks } from '../../data/riderMockData';
import { toast } from 'sonner';

export default function AdminPeople() {
  const [mainTab, setMainTab] = useState<'riders' | 'vendors'>('riders');
  const [riderSubTab, setRiderSubTab] = useState<'pending' | 'active' | 'suspended'>('pending');
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);

  const handleApproveRider = (riderId: string, name: string) => {
    toast.success(`${name} approved and activated!`);
  };

  const handleRejectRider = (riderId: string, name: string) => {
    if (confirm(`Reject ${name}'s application?`)) {
      toast.error(`${name}'s application rejected`);
    }
  };

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Vendor account created! Login credentials sent to email.');
    setShowAddVendorModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Bar */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold" style={{ color: '#1F2937' }}>
              CampusEats Admin
            </h1>
            <nav className="hidden lg:flex gap-4">
              <Link to="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <LayoutDashboard size={18} style={{ color: '#6B7280' }} />
                <span className="text-sm" style={{ color: '#6B7280' }}>Dashboard</span>
              </Link>
              <Link to="/admin/orders" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <ClipboardList size={18} style={{ color: '#6B7280' }} />
                <span className="text-sm" style={{ color: '#6B7280' }}>Orders</span>
              </Link>
              <Link to="/admin/people" className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: '#DBEAFE', color: '#6366F1' }}>
                <Users size={18} />
                <span className="text-sm font-medium">People</span>
              </Link>
              <Link to="/admin/analytics" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <span className="text-sm" style={{ color: '#6B7280' }}>Analytics</span>
              </Link>
              <Link to="/admin/finance" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <DollarSign size={18} style={{ color: '#6B7280' }} />
                <span className="text-sm" style={{ color: '#6B7280' }}>Finance</span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell size={20} style={{ color: '#6B7280' }} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                <User size={16} color="white" />
              </div>
              <span className="text-sm font-medium" style={{ color: '#1F2937' }}>Admin</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Header */}
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1F2937' }}>
            People Management
          </h2>

        {/* Main Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <button
            onClick={() => setMainTab('riders')}
            className="px-4 py-3 text-base font-medium"
            style={{
              color: mainTab === 'riders' ? '#6366F1' : '#6B7280',
              borderBottom: mainTab === 'riders' ? '2px solid #6366F1' : 'none',
            }}
          >
            Riders
          </button>
          <button
            onClick={() => setMainTab('vendors')}
            className="px-4 py-3 text-base font-medium"
            style={{
              color: mainTab === 'vendors' ? '#6366F1' : '#6B7280',
              borderBottom: mainTab === 'vendors' ? '2px solid #6366F1' : 'none',
            }}
          >
            Vendors
          </button>
        </div>

        {/* RIDERS TAB */}
        {mainTab === 'riders' && (
          <>
            {/* Rider Sub Tabs */}
            <div className="flex gap-3 mb-6">
              {(['pending', 'active', 'suspended'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRiderSubTab(tab)}
                  className="px-4 py-2 rounded-lg text-sm font-medium capitalize"
                  style={
                    riderSubTab === tab
                      ? { backgroundColor: '#6366F1', color: 'white' }
                      : { backgroundColor: '#F8F9FA', color: '#6B7280' }
                  }
                >
                  {tab}
                  {tab === 'pending' && (
                    <span className="ml-2">({pendingRiders.length})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Pending Approval */}
            {riderSubTab === 'pending' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingRiders.map((rider) => (
                  <div key={rider.id} className="rounded-lg p-5 border" style={{ borderColor: '#E0E0E0' }}>
                    <div className="flex gap-4 mb-4">
                      <img
                        src={rider.photo}
                        alt={rider.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base mb-1 truncate" style={{ color: '#1F2937' }}>
                          {rider.name}
                        </p>
                        <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
                          {rider.matricNumber}
                        </p>
                        <p className="text-xs break-all" style={{ color: '#6B7280' }}>
                          {rider.email}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                      <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                        Bank Details
                      </p>
                      <p className="text-sm font-medium break-words" style={{ color: '#1F2937' }}>
                        {rider.bankName} · {rider.accountNumber}
                      </p>
                    </div>

                    <p className="text-xs mb-4" style={{ color: '#6B7280' }}>
                      Submitted {rider.submittedDate}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveRider(rider.id, rider.name)}
                        className="flex-1 h-10 rounded-lg font-semibold text-sm"
                        style={{ backgroundColor: '#10B981', color: 'white' }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectRider(rider.id, rider.name)}
                        className="flex-1 h-10 rounded-lg font-semibold text-sm border"
                        style={{ borderColor: '#E0E0E0', color: '#EF4444' }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Active Riders */}
            {riderSubTab === 'active' && (
              <div className="space-y-3">
                {activeRiders.map((rider) => (
                  <div key={rider.id} className="rounded-lg p-4 border flex flex-col md:flex-row md:items-center justify-between gap-3" style={{ borderColor: '#E0E0E0' }}>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-base mb-1 truncate" style={{ color: '#1F2937' }}>
                        {rider.name}
                      </p>
                      <p className="text-sm" style={{ color: '#6B7280' }}>
                        ⭐ {rider.rating} · {rider.totalDeliveries} total deliveries · {rider.deliveriesToday} today
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm whitespace-nowrap" style={{ color: '#6B7280' }}>
                        Last active: {rider.lastActive}
                      </p>
                      <button
                        className="px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                        style={{ backgroundColor: '#F8F9FA', color: '#EF4444' }}
                      >
                        Suspend
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Suspended */}
            {riderSubTab === 'suspended' && (
              <div className="text-center py-12">
                <p style={{ color: '#6B7280' }}>No suspended riders</p>
              </div>
            )}
          </>
        )}

        {/* VENDORS TAB */}
        {mainTab === 'vendors' && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowAddVendorModal(true)}
                className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                style={{ backgroundColor: '#6366F1', color: 'white' }}
              >
                <Plus size={18} />
                Add New Vendor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allVendors.map((vendor) => (
                <div key={vendor.id} className="rounded-lg p-4 border" style={{ borderColor: '#E0E0E0' }}>
                  <div className="flex gap-3 mb-3">
                    <img
                      src={vendor.photo}
                      alt={vendor.name}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm mb-1 truncate" style={{ color: '#1F2937' }}>
                        {vendor.name}
                      </p>
                      <p className="text-xs mb-1 truncate" style={{ color: '#6B7280' }}>
                        {vendor.ownerName}
                      </p>
                      <span
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: vendor.status === 'active' ? '#D1FAE5' : '#F3F4F6',
                          color: vendor.status === 'active' ? '#10B981' : '#6B7280',
                        }}
                      >
                        {vendor.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    {vendor.ordersThisWeek} orders this week
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        </div>
      </div>

      {/* Add Vendor Modal */}
      {showAddVendorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full mx-5 my-8 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: '#1F2937' }}>
                Add New Vendor
              </h2>
              <button onClick={() => setShowAddVendorModal(false)}>
                <X size={24} style={{ color: '#6B7280' }} />
              </button>
            </div>

            <form onSubmit={handleCreateVendor} className="space-y-4">
              <input
                type="text"
                placeholder="Restaurant name"
                className="w-full h-12 px-4 rounded-lg border"
                style={{ borderColor: '#E0E0E0' }}
                required
              />
              <input
                type="text"
                placeholder="Owner full name"
                className="w-full h-12 px-4 rounded-lg border"
                style={{ borderColor: '#E0E0E0' }}
                required
              />
              <input
                type="email"
                placeholder="Owner email"
                className="w-full h-12 px-4 rounded-lg border"
                style={{ borderColor: '#E0E0E0' }}
                required
              />
              <input
                type="tel"
                placeholder="Owner phone number"
                className="w-full h-12 px-4 rounded-lg border"
                style={{ borderColor: '#E0E0E0' }}
                required
              />
              <input
                type="text"
                placeholder="Campus location (e.g., Near Eni-Jokun Hostel)"
                className="w-full h-12 px-4 rounded-lg border"
                style={{ borderColor: '#E0E0E0' }}
                required
              />
              <select
                className="w-full h-12 px-4 rounded-lg border"
                style={{ borderColor: '#E0E0E0' }}
                required
              >
                <option value="">Select bank</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Account number"
                className="w-full h-12 px-4 rounded-lg border"
                style={{ borderColor: '#E0E0E0' }}
                required
              />

              <button
                type="submit"
                className="w-full h-12 rounded-lg font-semibold"
                style={{ backgroundColor: '#6366F1', color: 'white' }}
              >
                Create Vendor Account
              </button>
            </form>

            <p className="text-xs mt-4 text-center" style={{ color: '#6B7280' }}>
              Login credentials will be automatically sent to the vendor's email
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
