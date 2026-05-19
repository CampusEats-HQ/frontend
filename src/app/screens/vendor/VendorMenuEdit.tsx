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
          <button type="button" aria-label="Go back" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} className="text-indigo-500" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            {isEditing ? 'Edit Item' : 'Add Item'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-6">
          {/* Photo Upload */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block text-gray-800">
              Photo
            </label>
            <div className="w-full h-40 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden">
              {item?.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <Upload size={32} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Tap to upload photo
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Item Name */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block text-gray-800">
              Item Name
            </label>
            <input
              type="text"
              defaultValue={item?.name}
              placeholder="e.g. Jollof Rice with Chicken"
              className="w-full h-12 px-4 rounded-lg bg-gray-50"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block text-gray-800">
              Description (optional)
            </label>
            <textarea
              defaultValue={item?.description}
              placeholder="Short description"
              rows={2}
              className="w-full px-4 py-3 rounded-lg resize-none bg-gray-50"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="item-category" className="text-sm font-medium mb-2 block text-gray-800">
              Category
            </label>
            <select
              id="item-category"
              defaultValue={item?.category}
              className="w-full h-12 px-4 rounded-lg bg-gray-50"
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
            <label className="text-sm font-medium mb-2 block text-gray-800">
              Price (₦)
            </label>
            <input
              type="number"
              defaultValue={item?.price}
              placeholder="1200"
              className="w-full h-12 px-4 rounded-lg bg-gray-50"
              required
            />
          </div>

          {/* Prep Time */}
          <div className="mb-4">
            <label htmlFor="item-prep-time" className="text-sm font-medium mb-2 block text-gray-800">
              Prep Time Estimate
            </label>
            <select
              id="item-prep-time"
              defaultValue={item?.prepTime}
              className="w-full h-12 px-4 rounded-lg bg-gray-50"
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
            <label className="text-sm font-medium mb-2 block text-gray-800">
              Availability
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Toggle availability"
                className="w-12 h-6 rounded-full relative bg-emerald-500"
              >
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
              </button>
              <span className="text-sm text-gray-500">
                Available
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full h-[52px] rounded-lg font-semibold mb-3 bg-indigo-500 text-white"
          >
            Save Item
          </button>

          {/* Delete Button */}
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="w-full py-3 text-center font-medium text-red-500"
            >
              Delete Item
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
