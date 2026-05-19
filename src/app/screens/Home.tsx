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
            <MapPin size={16} className="text-indigo-500" />
            <span className="text-sm font-semibold text-gray-800">
              Unilag, Yaba
            </span>
          </div>
          <Link to="/cart" className="relative">
            <ShoppingCart size={20} className="text-indigo-500" />
            {getItemCount() > 0 && (
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
            )}
          </Link>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-3 px-4 h-12 rounded-full bg-gray-50">
            <Search size={18} className="text-gray-500" />
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
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Banner */}
        <div className="px-5 mb-6">
          <div className="rounded-xl p-6 flex items-center justify-between bg-gradient-to-br from-amber-100 to-[#FDE68A]">
            <div>
              <p className="text-base font-semibold mb-1 text-gray-800">
                🔥 Delivered in 20 mins
              </p>
              <p className="text-xs text-gray-500">
                Hot & fresh to your hostel
              </p>
            </div>
          </div>
        </div>

        {/* Restaurants Section */}
        <div className="mb-6">
          <h2 className="px-5 text-base font-semibold mb-4 text-gray-800">
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
                <h3 className="font-semibold text-sm mb-1 text-gray-800">
                  {restaurant.name}
                </h3>
                <p className="text-xs text-gray-500">
                  ⭐ {restaurant.rating} · {restaurant.deliveryTime} · ₦{restaurant.deliveryFee}{' '}
                  delivery
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Right Now */}
        <div className="px-5">
          <h2 className="text-base font-semibold mb-4 text-gray-800">
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
                  <h3 className="font-semibold text-sm mb-0.5 text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {item.restaurant}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-sm text-amber-500">
                    ₦{item.price}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      addItem({ ...item, restaurant: item.restaurant });
                      toast.success(`${item.name} added to cart!`);
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-amber-500"
                    aria-label={`Add ${item.name} to cart`}
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
            <HomeIcon size={20} className="text-indigo-500" />
            <span className="text-xs font-medium text-indigo-500">
              Home
            </span>
          </Link>
          <button type="button" className="flex flex-col items-center gap-1" aria-label="Search">
            <SearchIcon size={20} className="text-gray-500" />
            <span className="text-xs text-gray-500">
              Search
            </span>
          </button>
          <Link to="/tracking/1042" className="flex flex-col items-center gap-1">
            <Package size={20} className="text-gray-500" />
            <span className="text-xs text-gray-500">
              Orders
            </span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1">
            <User size={20} className="text-gray-500" />
            <span className="text-xs text-gray-500">
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
