import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Upload } from 'lucide-react';
import { vendorMenuItems } from '../../data/vendorMockData';

export default function VendorMenuEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== 'add';
  const item = isEditing ? vendorMenuItems.find((i) => i.id === id) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isEditing ? 'Item updated!' : 'Item added!');
    navigate('/vendor/menu');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      alert('Item deleted!');
      navigate('/vendor/menu');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[480px] mx-auto">
        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-4 border-b border-gray-100">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} style={{ color: '#6366F1' }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: '#1F2937' }}>
            {isEditing ? 'Edit Item' : 'Add Item'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-6">
          {/* Photo Upload */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#1F2937' }}>
              Photo
            </label>
            <div
              className="w-full h-40 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer"
              style={{ borderColor: '#E0E0E0', backgroundColor: '#F8F9FA' }}
            >
              {item?.image ? (
                <div
                  className="w-full h-full rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              ) : (
                <div className="text-center">
                  <Upload size={32} style={{ color: '#6B7280', margin: '0 auto 8px' }} />
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    Tap to upload photo
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Item Name */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#1F2937' }}>
              Item Name
            </label>
            <input
              type="text"
              defaultValue={item?.name}
              placeholder="e.g. Jollof Rice with Chicken"
              className="w-full h-12 px-4 rounded-lg"
              style={{ backgroundColor: '#F8F9FA' }}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#1F2937' }}>
              Description (optional)
            </label>
            <textarea
              defaultValue={item?.description}
              placeholder="Short description"
              rows={2}
              className="w-full px-4 py-3 rounded-lg resize-none"
              style={{ backgroundColor: '#F8F9FA' }}
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#1F2937' }}>
              Category
            </label>
            <select
              defaultValue={item?.category}
              className="w-full h-12 px-4 rounded-lg"
              style={{ backgroundColor: '#F8F9FA' }}
              required
            >
              <option value="">Select category</option>
              <option value="Rice">Rice</option>
              <option value="Proteins">Proteins</option>
              <option value="Drinks">Drinks</option>
              <option value="Snacks">Snacks</option>
              <option value="Swallow">Swallow</option>
              <option value="Pastries">Pastries</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#1F2937' }}>
              Price (₦)
            </label>
            <input
              type="number"
              defaultValue={item?.price}
              placeholder="1200"
              className="w-full h-12 px-4 rounded-lg"
              style={{ backgroundColor: '#F8F9FA' }}
              required
            />
          </div>

          {/* Prep Time */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#1F2937' }}>
              Prep Time Estimate
            </label>
            <select
              defaultValue={item?.prepTime}
              className="w-full h-12 px-4 rounded-lg"
              style={{ backgroundColor: '#F8F9FA' }}
              required
            >
              <option value="5 mins">5 mins</option>
              <option value="10 mins">10 mins</option>
              <option value="15 mins">15 mins</option>
              <option value="20 mins">20 mins</option>
              <option value="25+ mins">25+ mins</option>
            </select>
          </div>

          {/* Availability */}
          <div className="mb-8">
            <label className="text-sm font-medium mb-2 block" style={{ color: '#1F2937' }}>
              Availability
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="w-12 h-6 rounded-full relative bg-[#10B981]"
              >
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
              </button>
              <span className="text-sm" style={{ color: '#6B7280' }}>
                Available
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full h-[52px] rounded-lg font-semibold mb-3"
            style={{ backgroundColor: '#6366F1', color: 'white' }}
          >
            Save Item
          </button>

          {/* Delete Button */}
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="w-full py-3 text-center font-medium"
              style={{ color: '#EF4444' }}
            >
              Delete Item
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
