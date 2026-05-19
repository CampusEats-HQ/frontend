import { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Search, ShoppingCart, Home as HomeIcon, SearchIcon, Package, User, Plus } from 'lucide-react';
import { restaurants, popularItems, categories } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { getItemCount, addItem } = useCart();

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Container */}
      <div className="max-w-[390px] mx-auto md:max-w-4xl pb-20">
        {/* Top Bar */}
        <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MapPin size={16} style={{ color: '#6366F1' }} />
            <span className="text-sm font-semibold" style={{ color: '#1F2937' }}>
              Unilag, Yaba
            </span>
          </div>
          <Link to="/cart" className="relative">
            <ShoppingCart size={20} style={{ color: '#6366F1' }} />
            {getItemCount() > 0 && (
              <div
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: '#EF4444' }}
              />
            )}
          </Link>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-4">
          <div
            className="flex items-center gap-3 px-4 h-12 rounded-full"
            style={{ backgroundColor: '#F8F9FA' }}
          >
            <Search size={18} style={{ color: '#6B7280' }} />
            <input
              type="text"
              placeholder="Search jollof, shawarma..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-5 mb-6">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                style={
                  activeCategory === cat
                    ? { backgroundColor: '#F59E0B', color: 'white' }
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

        {/* Hero Banner */}
        <div className="px-5 mb-6">
          <div
            className="rounded-xl p-6 flex items-center justify-between"
            style={{
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            }}
          >
            <div>
              <p className="text-base font-semibold mb-1" style={{ color: '#1F2937' }}>
                🔥 Delivered in 20 mins
              </p>
              <p className="text-xs" style={{ color: '#6B7280' }}>
                Hot & fresh to your hostel
              </p>
            </div>
          </div>
        </div>

        {/* Restaurants Section */}
        <div className="mb-6">
          <h2 className="px-5 text-base font-semibold mb-4" style={{ color: '#1F2937' }}>
            Restaurants
          </h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-5">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="flex-shrink-0 w-[200px]"
              >
                <div
                  className="w-full h-[140px] rounded-xl mb-3 bg-cover bg-center"
                  style={{ backgroundImage: `url(${restaurant.image})` }}
                />
                <h3 className="font-semibold text-sm mb-1" style={{ color: '#1F2937' }}>
                  {restaurant.name}
                </h3>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  ⭐ {restaurant.rating} · {restaurant.deliveryTime} · ₦{restaurant.deliveryFee}{' '}
                  delivery
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Right Now */}
        <div className="px-5">
          <h2 className="text-base font-semibold mb-4" style={{ color: '#1F2937' }}>
            Popular right now
          </h2>
          <div className="space-y-3">
            {popularItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-0.5" style={{ color: '#1F2937' }}>
                    {item.name}
                  </h3>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    {item.restaurant}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-sm" style={{ color: '#F59E0B' }}>
                    ₦{item.price}
                  </p>
                  <button
                    onClick={() => {
                      addItem({ ...item, restaurant: item.restaurant });
                      toast.success(`${item.name} added to cart!`);
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: '#F59E0B' }}
                  >
                    <Plus size={16} color="white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-[390px] mx-auto md:max-w-4xl flex justify-around py-3">
          <Link to="/home" className="flex flex-col items-center gap-1">
            <HomeIcon size={20} style={{ color: '#6366F1' }} />
            <span className="text-xs font-medium" style={{ color: '#6366F1' }}>
              Home
            </span>
          </Link>
          <button className="flex flex-col items-center gap-1">
            <SearchIcon size={20} style={{ color: '#6B7280' }} />
            <span className="text-xs" style={{ color: '#6B7280' }}>
              Search
            </span>
          </button>
          <Link to="/tracking/1042" className="flex flex-col items-center gap-1">
            <Package size={20} style={{ color: '#6B7280' }} />
            <span className="text-xs" style={{ color: '#6B7280' }}>
              Orders
            </span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1">
            <User size={20} style={{ color: '#6B7280' }} />
            <span className="text-xs" style={{ color: '#6B7280' }}>
              Profile
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
  );
}
