import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { vendorService, VendorMenuItem } from '../../services/vendor';

export default function VendorMenuEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== 'add';

  const [item, setItem] = useState<VendorMenuItem | null>(null);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [prepTime, setPrepTime] = useState('15 mins');
  const [available, setAvailable] = useState(true);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) return;
    vendorService.getMenu()
      .then((res) => {
        const found = res.items.find((i) => i.id === id);
        if (found) {
          setItem(found);
          setName(found.name);
          setDescription(found.description ?? '');
          setCategory(found.category);
          setPrice(String(found.price));
          setPrepTime(found.prepTime);
          setAvailable(found.available);
          setPreviewUrl(found.image);
        } else {
          toast.error('Menu item not found');
          navigate('/vendor/menu');
        }
      })
      .catch(() => {
        toast.error('Failed to load item');
        navigate('/vendor/menu');
      })
      .finally(() => setLoading(false));
  }, [id, isEditing, navigate]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const buildFormData = (): FormData => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('prepTime', prepTime);
    formData.append('available', String(available));
    if (photoFile) {
      formData.append('photo', photoFile);
    }
    return formData;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = buildFormData();
    const request = isEditing && item
      ? vendorService.updateMenuItem(item.id, formData)
      : vendorService.addMenuItem(formData);

    request
      .then(() => {
        toast.success(isEditing ? 'Item updated!' : 'Item added!');
        navigate('/vendor/menu');
      })
      .catch(() => toast.error(isEditing ? 'Failed to update item' : 'Failed to add item'))
      .finally(() => setSubmitting(false));
  };

  const handleDelete = () => {
    if (!item) return;
    if (!confirm('Are you sure you want to delete this item?')) return;
    vendorService.deleteMenuItem(item.id)
      .then(() => {
        toast.success('Item deleted');
        navigate('/vendor/menu');
      })
      .catch(() => toast.error('Failed to delete item'));
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
            <div
              className="w-full h-40 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              aria-label="Upload menu item photo"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* Item Name */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block text-gray-800">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-gray-50"
              required
            >
              <option value="">Select category</option>
              <option value="Rice">Rice</option>
              <option value="Swallow">Swallow</option>
              <option value="Soup">Soup</option>
              <option value="Proteins">Proteins (Meat / Fish / Chicken / Egg)</option>
              <option value="Sides">Sides (Plantain / Coleslaw / Salad)</option>
              <option value="Beans">Beans</option>
              <option value="Yam & Plantain">Yam & Plantain</option>
              <option value="Shawarma">Shawarma</option>
              <option value="Burger">Burger</option>
              <option value="Snacks">Snacks</option>
              <option value="Pastries">Pastries</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block text-gray-800">
              Price (₦)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
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
                onClick={() => setAvailable((prev) => !prev)}
                className={`w-12 h-6 rounded-full relative transition-colors ${available ? 'bg-emerald-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${available ? 'right-0.5' : 'left-0.5'}`} />
              </button>
              <span className="text-sm text-gray-500">
                {available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-[52px] rounded-lg font-semibold mb-3 bg-indigo-500 text-white disabled:opacity-60"
          >
            {submitting ? 'Saving...' : 'Save Item'}
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
