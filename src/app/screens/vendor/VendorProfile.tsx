import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Camera, X, Clock, Phone, Landmark, Bell, Lock, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../../services/auth';
import { vendorService } from '../../services/vendor';

interface ProfileData {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  contact: string;
  bankAccount: string;
}

type ActiveModal = 'hours' | 'contact' | 'bank' | 'password' | 'notifications' | 'help' | null;

export default function VendorProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  // Contact edit state
  const [contactValue, setContactValue] = useState('');
  const [savingContact, setSavingContact] = useState(false);

  useEffect(() => {
    vendorService.getProfile()
      .then((res) => {
        setProfile(res);
        setContactValue(res.contact ?? '');
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));

    vendorService.getDashboard()
      .then((res) => setIsOpen(res.isOpen))
      .catch(() => {});
  }, []);

  const handleToggleHours = () => {
    setTogglingStatus(true);
    vendorService.setStoreStatus(!isOpen)
      .then((res) => {
        setIsOpen(res.isOpen);
        toast.success(res.isOpen ? 'Store is now open' : 'Store is now closed');
        setActiveModal(null);
      })
      .catch(() => toast.error('Failed to update store status'))
      .finally(() => setTogglingStatus(false));
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingContact(true);
    vendorService.updateProfile({ contact: contactValue })
      .then(() => {
        setProfile((prev) => prev ? { ...prev, contact: contactValue } : prev);
        toast.success('Contact number updated');
        setActiveModal(null);
      })
      .catch(() => toast.error('Failed to update contact'))
      .finally(() => setSavingContact(false));
  };

  const handleLogout = () => {
    authService.logout('vendor');
    navigate('/vendor/login');
  };

  const settingsItems = [
    { icon: Clock,     key: 'hours',         label: 'Opening Hours',    sub: isOpen ? 'Open now' : 'Closed' },
    { icon: Phone,     key: 'contact',        label: 'Contact Number',   sub: profile?.contact ?? '—' },
    { icon: Landmark,  key: 'bank',           label: 'Bank Account',     sub: profile?.bankAccount ?? '—' },
    { icon: Bell,      key: 'notifications',  label: 'Notifications',    sub: '' },
    { icon: Lock,      key: 'password',       label: 'Change Password',  sub: '' },
    { icon: HelpCircle,key: 'help',           label: 'Help & Support',   sub: '' },
  ] as const;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[480px] mx-auto px-5 py-6">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Profile & Settings</h1>

        {/* Restaurant Profile */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={profile?.image ?? ''}
              alt={profile?.name ?? 'Restaurant'}
              className="w-full h-full rounded-xl object-cover bg-gray-100"
            />
            <button
              type="button"
              aria-label="Change restaurant photo"
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500"
            >
              <Camera size={18} color="white" />
            </button>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold mb-1 text-gray-800">{profile?.name ?? ''}</h2>
            <p className="text-sm mb-1 text-gray-500">{profile?.category ?? ''}</p>
            <p className="text-sm text-gray-500">{profile?.location ?? ''}</p>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="space-y-1 mb-6">
          {settingsItems.map(({ icon: Icon, key, label, sub }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveModal(key)}
              className="w-full flex items-center justify-between py-4 border-b border-gray-100"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-gray-500" />
                <div className="text-left">
                  <span className="font-medium text-gray-800 block">{label}</span>
                  {sub ? <span className="text-xs text-gray-400">{sub}</span> : null}
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-500" />
            </button>
          ))}
        </div>

        <div className="h-px my-6 bg-gray-200" />

        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-4 text-center font-medium text-red-500"
        >
          Log Out
        </button>
      </div>

      {/* ── Modals ── */}

      {/* Opening Hours */}
      {activeModal === 'hours' && (
        <Modal title="Opening Hours" onClose={() => setActiveModal(null)}>
          <p className="text-sm text-gray-500 mb-6">
            Toggle your store status. Customers can only order from open stores.
          </p>
          <div className={`flex items-center justify-between p-4 rounded-lg mb-6 ${isOpen ? 'bg-emerald-50' : 'bg-gray-50'}`}>
            <div>
              <p className="font-semibold text-gray-800">{isOpen ? 'Store is Open' : 'Store is Closed'}</p>
              <p className="text-xs text-gray-500 mt-0.5">{isOpen ? 'Accepting orders' : 'Not accepting orders'}</p>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-colors ${isOpen ? 'bg-emerald-500' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${isOpen ? 'right-0.5' : 'left-0.5'}`} />
            </div>
          </div>
          <button
            type="button"
            onClick={handleToggleHours}
            disabled={togglingStatus}
            className={`w-full h-12 rounded-lg font-semibold disabled:opacity-60 ${isOpen ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}
          >
            {togglingStatus ? 'Updating...' : isOpen ? 'Close Store' : 'Open Store'}
          </button>
        </Modal>
      )}

      {/* Contact Number */}
      {activeModal === 'contact' && (
        <Modal title="Contact Number" onClose={() => setActiveModal(null)}>
          <p className="text-sm text-gray-500 mb-4">
            This number is shown to riders and customers when needed.
          </p>
          <form onSubmit={handleSaveContact}>
            <input
              type="tel"
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              placeholder="+234 800 000 0000"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 mb-4"
              required
            />
            <button
              type="submit"
              disabled={savingContact}
              className="w-full h-12 rounded-lg font-semibold bg-indigo-500 text-white disabled:opacity-60"
            >
              {savingContact ? 'Saving...' : 'Save'}
            </button>
          </form>
        </Modal>
      )}

      {/* Bank Account */}
      {activeModal === 'bank' && (
        <Modal title="Bank Account" onClose={() => setActiveModal(null)}>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-xs text-gray-500 mb-1">Current account</p>
            <p className="font-semibold text-gray-800">{profile?.bankAccount || '—'}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-600">
              💡 To update your bank account, contact CampusEats support at <strong>support@campus-eats.me</strong>
            </p>
          </div>
        </Modal>
      )}

      {/* Notifications */}
      {activeModal === 'notifications' && (
        <Modal title="Notifications" onClose={() => setActiveModal(null)}>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <Bell size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Notification preferences coming soon.</p>
          </div>
        </Modal>
      )}

      {/* Change Password */}
      {activeModal === 'password' && (
        <Modal title="Change Password" onClose={() => setActiveModal(null)}>
          <p className="text-sm text-gray-500 mb-6">
            To change your password, use the forgot password flow on the login page.
          </p>
          <button
            type="button"
            onClick={() => { setActiveModal(null); navigate('/vendor/login'); }}
            className="w-full h-12 rounded-lg font-semibold bg-indigo-500 text-white"
          >
            Go to Login
          </button>
        </Modal>
      )}

      {/* Help & Support */}
      {activeModal === 'help' && (
        <Modal title="Help & Support" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            <a
              href="mailto:support@campus-eats.me"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200"
            >
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-medium text-gray-800">Email Support</p>
                <p className="text-sm text-gray-500">support@campus-eats.me</p>
              </div>
            </a>
            <a
              href="https://wa.me/2340000000000"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200"
            >
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-medium text-gray-800">WhatsApp</p>
                <p className="text-sm text-gray-500">Chat with us</p>
              </div>
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
