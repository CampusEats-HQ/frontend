import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Edit2, X } from 'lucide-react';
import { useRider } from '../../context/RiderContext';
import { banks } from '../../data/riderMockData';
import { riderService, RiderProfile as RiderProfileData } from '../../services/rider';
import { authService } from '../../services/auth';
import { toast } from 'sonner';
import LogoutModal from '../../components/LogoutModal';

export default function RiderProfile() {
  const navigate = useNavigate();
  const { rider, logout } = useRider();
  const [showEditBank, setShowEditBank] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [profile, setProfile] = useState<RiderProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
  });

  useEffect(() => {
    if (!rider) {
      navigate('/rider/login');
      return;
    }
    riderService
      .getProfile()
      .then((res) => {
        setProfile(res);
        setBankDetails({ bankName: res.bankName, accountNumber: res.accountNumber });
      })
      .catch(() => {
        // Fall back to context rider data
        setProfile(rider);
        setBankDetails({ bankName: rider.bankName, accountNumber: rider.accountNumber });
      })
      .finally(() => setLoading(false));
  }, [rider, navigate]);

  const handleUpdateBank = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await riderService.updateBank(bankDetails);
      setBankDetails({ bankName: res.bankName, accountNumber: res.accountNumber });
      toast.success('Bank details updated successfully!');
      setShowEditBank(false);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to update bank details');
    }
  };

  const handleLogout = () => {
    authService.logout('rider');
    logout();
    navigate('/rider/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!rider && !profile) {
    return null;
  }

  const displayProfile = profile ?? rider!;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center border-b border-gray-200">
        <button type="button" onClick={() => navigate('/rider/home')} className="mr-4" aria-label="Go back">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Profile &amp; Settings
        </h1>
      </div>

      <div className="px-6 py-6 space-y-6 max-w-4xl mx-auto">
        {/* Profile Info */}
        <div className="rounded-lg p-5 border border-gray-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold bg-indigo-500 text-white">
              {displayProfile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-lg mb-1 truncate text-gray-800">
                {displayProfile.name}
              </p>
              <p className="text-sm truncate text-gray-500">
                {displayProfile.email}
              </p>
              <p className="text-sm text-gray-500">
                {displayProfile.phone}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50">
            <div className="text-center">
              <p className="text-xs mb-1 text-gray-500">
                Rating
              </p>
              <p className="text-2xl font-bold text-gray-800">
                ⭐ {displayProfile.rating}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1 text-gray-500">
                Total Deliveries
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {displayProfile.totalDeliveries}
              </p>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="rounded-lg p-5 border border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-gray-800">
              Bank Account Details
            </h3>
            <button
              type="button"
              onClick={() => setShowEditBank(true)}
              className="flex items-center gap-1 text-sm font-medium text-indigo-500"
            >
              <Edit2 size={14} />
              Edit
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs mb-1 text-gray-500">
                Bank Name
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {bankDetails.bankName}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1 text-gray-500">
                Account Number
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {bankDetails.accountNumber}
              </p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-amber-50">
            <p className="text-xs text-amber-500">
              💡 Earnings are sent to this account every 48 hours
            </p>
          </div>
        </div>

        {/* Settings */}
        <div className="rounded-lg border border-gray-300 overflow-hidden">
          <h3 className="font-bold text-base p-5 border-b border-gray-50 text-gray-800">
            Settings
          </h3>
          <button type="button" className="w-full text-left px-5 py-4 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50">
            <span className="text-gray-800">Notification Preferences</span>
            <span className="text-gray-500">›</span>
          </button>
          <button type="button" className="w-full text-left px-5 py-4 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50">
            <span className="text-gray-800">Availability Schedule</span>
            <span className="text-gray-500">›</span>
          </button>
          <button type="button" className="w-full text-left px-5 py-4 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50">
            <span className="text-gray-800">Help &amp; Support</span>
            <span className="text-gray-500">›</span>
          </button>
          <button type="button" className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50">
            <span className="text-gray-800">About CampusEats</span>
            <span className="text-gray-500">›</span>
          </button>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={() => setShowLogout(true)}
          className="w-full h-12 rounded-lg font-semibold bg-gray-50 text-red-500"
        >
          Log Out
        </button>
      </div>

      {showLogout && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}

      {/* Edit Bank Modal */}
      {showEditBank && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Update Bank Details
              </h2>
              <button type="button" onClick={() => setShowEditBank(false)} aria-label="Close modal">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleUpdateBank} className="space-y-4">
              <div>
                <label htmlFor="bank-name" className="block text-sm font-medium mb-2 text-gray-800">
                  Bank Name
                </label>
                <select
                  id="bank-name"
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300"
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
                <label className="block text-sm font-medium mb-2 text-gray-800">
                  Account Number
                </label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                  placeholder="0123456789"
                  className="w-full h-12 px-4 rounded-lg border border-gray-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-lg font-semibold bg-indigo-500 text-white"
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
