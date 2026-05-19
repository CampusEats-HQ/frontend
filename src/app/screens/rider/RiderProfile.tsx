import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Edit2, X } from 'lucide-react';
import { useRider } from '../../context/RiderContext';
import { banks } from '../../data/riderMockData';
import { toast } from 'sonner';

export default function RiderProfile() {
  const navigate = useNavigate();
  const { rider, logout } = useRider();
  const [showEditBank, setShowEditBank] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankName: rider?.bankName || 'GTBank',
    accountNumber: rider?.accountNumber || '0123456789',
  });

  useEffect(() => {
    if (!rider) {
      navigate('/rider/login');
    }
  }, [rider, navigate]);

  const handleUpdateBank = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Bank details updated successfully!');
    setShowEditBank(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/rider/login');
    }
  };

  if (!rider) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center border-b border-gray-200">
        <button onClick={() => navigate('/rider/home')} className="mr-4">
          <ArrowLeft size={24} style={{ color: '#1F2937' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: '#1F2937' }}>
          Profile & Settings
        </h1>
      </div>

      <div className="px-6 py-6 space-y-6 max-w-4xl mx-auto">
        {/* Profile Info */}
        <div className="rounded-lg p-5 border" style={{ borderColor: '#E0E0E0' }}>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: '#6366F1', color: 'white' }}
            >
              {rider.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-lg mb-1 truncate" style={{ color: '#1F2937' }}>
                {rider.name}
              </p>
              <p className="text-sm truncate" style={{ color: '#6B7280' }}>
                {rider.email}
              </p>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                {rider.phone}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                Rating
              </p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>
                ⭐ {rider.rating}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                Total Deliveries
              </p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>
                {rider.totalDeliveries}
              </p>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="rounded-lg p-5 border" style={{ borderColor: '#E0E0E0' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base" style={{ color: '#1F2937' }}>
              Bank Account Details
            </h3>
            <button
              onClick={() => setShowEditBank(true)}
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: '#6366F1' }}
            >
              <Edit2 size={14} />
              Edit
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                Bank Name
              </p>
              <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
                {bankDetails.bankName}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
                Account Number
              </p>
              <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
                {bankDetails.accountNumber}
              </p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#FFFBEB' }}>
            <p className="text-xs" style={{ color: '#F59E0B' }}>
              💡 Earnings are sent to this account every 48 hours
            </p>
          </div>
        </div>

        {/* Settings */}
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: '#E0E0E0' }}>
          <h3 className="font-bold text-base p-5 border-b" style={{ color: '#1F2937', borderColor: '#F8F9FA' }}>
            Settings
          </h3>
          <button className="w-full text-left px-5 py-4 border-b flex items-center justify-between hover:bg-gray-50" style={{ borderColor: '#F8F9FA' }}>
            <span style={{ color: '#1F2937' }}>Notification Preferences</span>
            <span style={{ color: '#6B7280' }}>›</span>
          </button>
          <button className="w-full text-left px-5 py-4 border-b flex items-center justify-between hover:bg-gray-50" style={{ borderColor: '#F8F9FA' }}>
            <span style={{ color: '#1F2937' }}>Availability Schedule</span>
            <span style={{ color: '#6B7280' }}>›</span>
          </button>
          <button className="w-full text-left px-5 py-4 border-b flex items-center justify-between hover:bg-gray-50" style={{ borderColor: '#F8F9FA' }}>
            <span style={{ color: '#1F2937' }}>Help & Support</span>
            <span style={{ color: '#6B7280' }}>›</span>
          </button>
          <button className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50">
            <span style={{ color: '#1F2937' }}>About CampusEats</span>
            <span style={{ color: '#6B7280' }}>›</span>
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full h-12 rounded-lg font-semibold"
          style={{ backgroundColor: '#F8F9FA', color: '#EF4444' }}
        >
          Log Out
        </button>
      </div>

      {/* Edit Bank Modal */}
      {showEditBank && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: '#1F2937' }}>
                Update Bank Details
              </h2>
              <button onClick={() => setShowEditBank(false)}>
                <X size={24} style={{ color: '#6B7280' }} />
              </button>
            </div>

            <form onSubmit={handleUpdateBank} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1F2937' }}>
                  Bank Name
                </label>
                <select
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border"
                  style={{ borderColor: '#E0E0E0' }}
                  required
                >
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1F2937' }}>
                  Account Number
                </label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                  placeholder="0123456789"
                  className="w-full h-12 px-4 rounded-lg border"
                  style={{ borderColor: '#E0E0E0' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-lg font-semibold"
                style={{ backgroundColor: '#6366F1', color: 'white' }}
              >
                Update Bank Details
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
