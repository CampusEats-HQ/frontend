import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, MapPin, X, Home, Book, Building2 } from 'lucide-react';
import { toast } from 'sonner';

const defaultAddresses = [
  {
    id: '1',
    label: 'Hostel',
    icon: Home,
    name: 'Fabian House',
    details: 'Room 204, Block A',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Class',
    icon: Book,
    name: 'Faculty of Engineering',
    details: 'Lecture Hall 2',
    isDefault: false,
  },
];

export default function SavedAddresses() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    name: '',
    details: '',
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const address = {
      id: Date.now().toString(),
      label: newAddress.label,
      icon: MapPin,
      name: newAddress.name,
      details: newAddress.details,
      isDefault: false,
    };
    setAddresses([...addresses, address]);
    setShowAddModal(false);
    setNewAddress({ label: '', name: '', details: '' });
    toast.success('Address added successfully!');
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
    toast.success('Default address updated!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      toast.success('Address deleted');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <button onClick={() => navigate('/profile')} className="mr-4">
            <ArrowLeft size={24} style={{ color: '#1F2937' }} />
          </button>
          <h1 className="text-xl font-bold" style={{ color: '#1F2937' }}>
            Saved Addresses
          </h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-2 rounded-lg"
          style={{ backgroundColor: '#6366F1' }}
        >
          <Plus size={20} color="white" />
        </button>
      </div>

      {/* Addresses List */}
      <div className="px-6 py-6 space-y-3 max-w-4xl mx-auto">
        {addresses.map((address) => {
          const Icon = address.icon;
          return (
            <div
              key={address.id}
              className="rounded-lg p-4 border"
              style={{
                borderColor: address.isDefault ? '#6366F1' : '#E0E0E0',
                backgroundColor: address.isDefault ? '#EEF2FF' : 'white',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#F8F9FA' }}
                >
                  <Icon size={20} style={{ color: '#6366F1' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-base" style={{ color: '#1F2937' }}>
                      {address.label}
                    </p>
                    {address.isDefault && (
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: '#6366F1', color: 'white' }}
                      >
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-1" style={{ color: '#1F2937' }}>
                    {address.name}
                  </p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    {address.details}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 flex-shrink-0"
                >
                  <X size={20} style={{ color: '#6B7280' }} />
                </button>
              </div>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="mt-3 w-full h-9 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: '#F8F9FA', color: '#6366F1' }}
                >
                  Set as Default
                </button>
              )}
            </div>
          );
        })}

        {addresses.length === 0 && (
          <div className="text-center py-12">
            <MapPin size={48} style={{ color: '#E0E0E0', margin: '0 auto 16px' }} />
            <p className="text-lg font-semibold mb-2" style={{ color: '#1F2937' }}>
              No saved addresses
            </p>
            <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
              Add your frequent delivery locations
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 h-12 rounded-lg font-semibold"
              style={{ backgroundColor: '#6366F1', color: 'white' }}
            >
              Add Address
            </button>
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: '#1F2937' }}>
                Add New Address
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <X size={24} style={{ color: '#6B7280' }} />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1F2937' }}>
                  Label (e.g., Home, Class, Library)
                </label>
                <input
                  type="text"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                  placeholder="Hostel"
                  className="w-full h-12 px-4 rounded-lg border"
                  style={{ borderColor: '#E0E0E0' }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1F2937' }}>
                  Location Name
                </label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  placeholder="Fabian House"
                  className="w-full h-12 px-4 rounded-lg border"
                  style={{ borderColor: '#E0E0E0' }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1F2937' }}>
                  Additional Details
                </label>
                <input
                  type="text"
                  value={newAddress.details}
                  onChange={(e) => setNewAddress({ ...newAddress, details: e.target.value })}
                  placeholder="Room 204, Block A"
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
                Add Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
