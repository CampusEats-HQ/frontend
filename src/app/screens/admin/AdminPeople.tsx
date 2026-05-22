import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { X, Plus, LayoutDashboard, ClipboardList, Users, DollarSign, Bell, User, Megaphone } from 'lucide-react';;
import { adminService } from '../../services/admin';
import { banks } from '../../data/riderMockData';
import AdminNav from '../../components/AdminNav';
import { toast } from 'sonner';

export default function AdminPeople() {
  const [mainTab, setMainTab] = useState<'riders' | 'vendors'>('riders');
  const [riderSubTab, setRiderSubTab] = useState<'pending' | 'active' | 'suspended'>('pending');
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);

  const [pendingRiders, setPendingRiders] = useState<any[]>([]);
  const [activeRiders, setActiveRiders] = useState<any[]>([]);
  const [suspendedRiders, setSuspendedRiders] = useState<any[]>([]);
  const [allVendors, setAllVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Vendor form state
  const [vendorName, setVendorName] = useState('');
  const [vendorOwnerName, setVendorOwnerName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorLocation, setVendorLocation] = useState('');
  const [vendorBank, setVendorBank] = useState('');
  const [vendorAccount, setVendorAccount] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      adminService.getRiders('pending'),
      adminService.getRiders('active'),
      adminService.getRiders('suspended'),
      adminService.getVendors(),
    ])
      .then(([pending, active, suspended, vendors]) => {
        setPendingRiders(pending.riders);
        setActiveRiders(active.riders);
        setSuspendedRiders(suspended.riders);
        setAllVendors(vendors.vendors);
      })
      .catch(() => toast.error('Failed to load people data'))
      .finally(() => setLoading(false));
  }, []);

  const handleApproveRider = async (riderId: string, name: string) => {
    try {
      await adminService.approveRider(riderId);
      toast.success(`${name} approved and activated!`);
      setPendingRiders((prev) => prev.filter((r) => r.id !== riderId));
    } catch (err: any) {
      toast.error(err?.message || 'Failed to approve rider');
    }
  };

  const handleRejectRider = async (riderId: string, name: string) => {
    if (confirm(`Reject ${name}'s application?`)) {
      try {
        await adminService.rejectRider(riderId);
        toast.error(`${name}'s application rejected`);
        setPendingRiders((prev) => prev.filter((r) => r.id !== riderId));
      } catch (err: any) {
        toast.error(err?.message || 'Failed to reject rider');
      }
    }
  };

  const handleSuspendRider = async (riderId: string, name: string) => {
    if (confirm(`Suspend ${name}?`)) {
      try {
        await adminService.suspendRider(riderId);
        toast.success(`${name} has been suspended`);
        setActiveRiders((prev) => prev.filter((r) => r.id !== riderId));
      } catch (err: any) {
        toast.error(err?.message || 'Failed to suspend rider');
      }
    }
  };

  const handleCreateVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminService.createVendor({
        name: vendorName,
        ownerName: vendorOwnerName,
        email: vendorEmail,
        phone: vendorPhone,
        location: vendorLocation,
        bankName: vendorBank,
        accountNumber: vendorAccount,
      });
      toast.success('Vendor account created! Login credentials sent to email.');
      setShowAddVendorModal(false);
      // Reset form
      setVendorName('');
      setVendorOwnerName('');
      setVendorEmail('');
      setVendorPhone('');
      setVendorLocation('');
      setVendorBank('');
      setVendorAccount('');
      // Refresh vendors
      adminService.getVendors().then((res) => setAllVendors(res.vendors)).catch(() => {});
    } catch (err: any) {
      toast.error(err?.message || 'Failed to create vendor');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            People Management
          </h2>

        {/* Main Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => setMainTab('riders')}
            className={`px-4 py-3 text-base font-medium ${mainTab === 'riders' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'}`}
          >
            Riders
          </button>
          <button
            type="button"
            onClick={() => setMainTab('vendors')}
            className={`px-4 py-3 text-base font-medium ${mainTab === 'vendors' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'}`}
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
                  type="button"
                  key={tab}
                  onClick={() => setRiderSubTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${riderSubTab === tab ? 'bg-indigo-500 text-white' : 'bg-gray-50 text-gray-500'}`}
                >
                  {tab}
                  {tab === 'pending' && pendingRiders.length > 0 && (
                    <span className="ml-2">({pendingRiders.length})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Pending Approval */}
            {riderSubTab === 'pending' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingRiders.length === 0 ? (
                  <p className="text-gray-500">No pending applications</p>
                ) : (
                  pendingRiders.map((rider: any) => (
                    <div key={rider.id} className="rounded-lg p-5 border border-gray-300">
                      <div className="flex gap-4 mb-4">
                        {rider.photo ? (
                          <img
                            src={rider.photo}
                            alt={rider.name}
                            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl font-bold text-indigo-500">
                              {rider.name?.[0] ?? '?'}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-base mb-1 truncate text-gray-800">
                            {rider.name}
                          </p>
                          <p className="text-sm mb-1 text-gray-500">
                            {rider.matricNumber}
                          </p>
                          <p className="text-xs break-all text-gray-500">
                            {rider.email}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4 p-3 rounded-lg bg-gray-50">
                        <p className="text-xs mb-1 text-gray-500">
                          Bank Details
                        </p>
                        <p className="text-sm font-medium break-words text-gray-800">
                          {rider.bankName} · {rider.accountNumber}
                        </p>
                      </div>

                      {rider.submittedDate && (
                        <p className="text-xs mb-4 text-gray-500">
                          Submitted {rider.submittedDate}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleApproveRider(rider.id, rider.name)}
                          className="flex-1 h-10 rounded-lg font-semibold text-sm bg-emerald-500 text-white"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRejectRider(rider.id, rider.name)}
                          className="flex-1 h-10 rounded-lg font-semibold text-sm border border-gray-300 text-red-500"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Active Riders */}
            {riderSubTab === 'active' && (
              <div className="space-y-3">
                {activeRiders.length === 0 ? (
                  <p className="text-gray-500">No active riders</p>
                ) : (
                  activeRiders.map((rider: any) => (
                    <div key={rider.id} className="rounded-lg p-4 border border-gray-300 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-base mb-1 truncate text-gray-800">
                          {rider.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ⭐ {rider.rating} · {rider.totalDeliveries} total deliveries
                          {rider.deliveriesToday != null ? ` · ${rider.deliveriesToday} today` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {rider.lastActive && (
                          <p className="text-sm whitespace-nowrap text-gray-500">
                            Last active: {rider.lastActive}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => handleSuspendRider(rider.id, rider.name)}
                          className="px-4 py-2 rounded-lg text-sm whitespace-nowrap bg-gray-50 text-red-500"
                        >
                          Suspend
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Suspended */}
            {riderSubTab === 'suspended' && (
              <div>
                {suspendedRiders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No suspended riders</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {suspendedRiders.map((rider: any) => (
                      <div key={rider.id} className="rounded-lg p-4 border border-gray-300">
                        <p className="font-semibold text-gray-800">{rider.name}</p>
                        <p className="text-sm text-gray-500">{rider.email}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* VENDORS TAB */}
        {mainTab === 'vendors' && (
          <>
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => setShowAddVendorModal(true)}
                className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 bg-indigo-500 text-white"
              >
                <Plus size={18} />
                Add New Vendor
              </button>
            </div>

            {allVendors.length === 0 ? (
              <p className="text-gray-500">No vendors yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allVendors.map((vendor: any) => (
                  <div key={vendor.id} className="rounded-lg p-4 border border-gray-300">
                    <div className="flex gap-3 mb-3">
                      {vendor.photo ? (
                        <img
                          src={vendor.photo}
                          alt={vendor.name}
                          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-indigo-500">
                            {vendor.name?.[0] ?? '?'}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm mb-1 truncate text-gray-800">
                          {vendor.name}
                        </p>
                        <p className="text-xs mb-1 truncate text-gray-500">
                          {vendor.ownerName}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${vendor.status === 'active' ? 'bg-emerald-100 text-emerald-500' : 'bg-gray-100 text-gray-500'}`}
                        >
                          {vendor.status}
                        </span>
                      </div>
                    </div>
                    {vendor.ordersThisWeek != null && (
                      <p className="text-sm text-gray-500">
                        {vendor.ordersThisWeek} orders this week
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        </div>
      </div>

      {/* Add Vendor Modal */}
      {showAddVendorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full mx-5 my-8 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Add New Vendor
              </h2>
              <button type="button" onClick={() => setShowAddVendorModal(false)} aria-label="Close modal">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleCreateVendor} className="space-y-4">
              <input
                type="text"
                placeholder="Restaurant name"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300"
                required
              />
              <input
                type="text"
                placeholder="Owner full name"
                value={vendorOwnerName}
                onChange={(e) => setVendorOwnerName(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300"
                required
              />
              <input
                type="email"
                placeholder="Owner email"
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300"
                required
              />
              <input
                type="tel"
                placeholder="Owner phone number"
                value={vendorPhone}
                onChange={(e) => setVendorPhone(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300"
                required
              />
              <input
                type="text"
                placeholder="Campus location (e.g., Near Eni-Jokun Hostel)"
                value={vendorLocation}
                onChange={(e) => setVendorLocation(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300"
                required
              />
              <select
                className="w-full h-12 px-4 rounded-lg border border-gray-300"
                aria-label="Select bank"
                value={vendorBank}
                onChange={(e) => setVendorBank(e.target.value)}
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
                value={vendorAccount}
                onChange={(e) => setVendorAccount(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-300"
                required
              />

              <button
                type="submit"
                className="w-full h-12 rounded-lg font-semibold bg-indigo-500 text-white"
              >
                Create Vendor Account
              </button>
            </form>

            <p className="text-xs mt-4 text-center text-gray-500">
              Login credentials will be automatically sent to the vendor's email
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
