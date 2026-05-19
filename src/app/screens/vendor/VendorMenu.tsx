import { useState } from 'react';
import { Link } from 'react-router';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, DollarSign, Plus, Edit, Search } from 'lucide-react';
import { vendorMenuItems } from '../../data/vendorMockData';

export default function VendorMenu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Rice', 'Proteins', 'Drinks', 'Snacks', 'Swallow', 'Pastries'];

  const filteredItems = vendorMenuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-[1024px] mx-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-lg font-bold" style={{ color: '#1F2937' }}>
            Menu Management
          </h1>
        </div>

        {/* Search */}
        <div className="px-5 py-4">
          <div
            className="flex items-center gap-3 px-4 h-12 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
          >
            <Search size={18} style={{ color: '#6B7280' }} />
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
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                style={
                  activeCategory === cat
                    ? { backgroundColor: '#6366F1', color: 'white' }
                    : {
                        backgroundColor: 'white',
                        border: '1px solid #E0E0E0',
                        color: '#1F2937',
                      }
                }
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
                <div
                  className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-0.5" style={{ color: '#1F2937' }}>
                    {item.name}
                  </h3>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#F59E0B' }}>
                    ₦{item.price}
                  </p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    {item.prepTime} prep time
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      item.available ? 'bg-[#10B981]' : 'bg-[#D1D5DB]'
                    }`}
                    onClick={() => alert(`Toggle availability for ${item.name}`)}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                        item.available ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                  <Link to={`/vendor/menu/${item.id}`}>
                    <Edit size={18} style={{ color: '#6B7280' }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Add Button */}
        <Link
          to="/vendor/menu/add"
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: '#6366F1' }}
        >
          <Plus size={24} color="white" />
        </Link>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
          <div className="max-w-[1024px] mx-auto flex justify-around py-3">
            <Link to="/vendor/dashboard" className="flex flex-col items-center gap-1">
              <LayoutDashboard size={20} style={{ color: '#6B7280' }} />
              <span className="text-xs" style={{ color: '#6B7280' }}>
                Dashboard
              </span>
            </Link>
            <Link to="/vendor/orders" className="flex flex-col items-center gap-1">
              <ClipboardList size={20} style={{ color: '#6B7280' }} />
              <span className="text-xs" style={{ color: '#6B7280' }}>
                Orders
              </span>
            </Link>
            <Link to="/vendor/menu" className="flex flex-col items-center gap-1">
              <UtensilsCrossed size={20} style={{ color: '#6366F1' }} />
              <span className="text-xs font-medium" style={{ color: '#6366F1' }}>
                Menu
              </span>
            </Link>
            <Link to="/vendor/earnings" className="flex flex-col items-center gap-1">
              <DollarSign size={20} style={{ color: '#6B7280' }} />
              <span className="text-xs" style={{ color: '#6B7280' }}>
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
