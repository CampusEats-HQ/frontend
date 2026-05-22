import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign, Plus, Edit, Search } from 'lucide-react';
import { toast } from 'sonner';
import { vendorService, VendorMenuItem } from '../../services/vendor';

export default function VendorMenu() {
  const [menuItems, setMenuItems] = useState<VendorMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Rice', 'Proteins', 'Drinks', 'Snacks', 'Swallow', 'Pastries'];

  useEffect(() => {
    vendorService.getMenu()
      .then((res) => setMenuItems(res.items))
      .catch(() => toast.error('Failed to load menu'))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleAvailability = (item: VendorMenuItem) => {
    const newAvailable = !item.available;
    vendorService.toggleAvailability(item.id, newAvailable)
      .then((res) => {
        setMenuItems((prev) =>
          prev.map((m) => (m.id === res.id ? { ...m, available: res.available } : m))
        );
      })
      .catch(() => toast.error('Failed to update availability'));
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-[1024px] mx-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800">
            Menu Management
          </h1>
        </div>

        {/* Search */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-3 px-4 h-12 rounded-lg bg-gray-50">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-5 mb-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-5 pb-6">
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-0.5 text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm font-semibold mb-1 text-amber-500">
                    ₦{item.price}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.prepTime} prep time
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Toggle availability for ${item.name}`}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      item.available ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                    onClick={() => handleToggleAvailability(item)}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                        item.available ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                  <Link to={`/vendor/menu/${item.id}`} aria-label={`Edit ${item.name}`}>
                    <Edit size={18} className="text-gray-500" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Add Button */}
        <Link
          to="/vendor/menu/add"
          aria-label="Add new menu item"
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-indigo-500"
        >
          <Plus size={24} color="white" />
        </Link>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
          <div className="max-w-[1024px] mx-auto flex justify-around py-3">
            <Link to="/vendor/dashboard" className="flex flex-col items-center gap-1">
              <LayoutDashboard size={20} className="text-gray-500" />
              <span className="text-xs text-gray-500">
                Dashboard
              </span>
            </Link>
            <Link to="/vendor/orders" className="flex flex-col items-center gap-1">
              <ClipboardList size={20} className="text-gray-500" />
              <span className="text-xs text-gray-500">
                Orders
              </span>
            </Link>
            <Link to="/vendor/menu" className="flex flex-col items-center gap-1">
              <UtensilsCrossed size={20} className="text-indigo-500" />
              <span className="text-xs font-medium text-indigo-500">
                Menu
              </span>
            </Link>
            <Link to="/vendor/earnings" className="flex flex-col items-center gap-1">
              <DollarSign size={20} className="text-gray-500" />
              <span className="text-xs text-gray-500">
                Earnings
              </span>
            </Link>
          </div>
        </div>

        <style>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
}
