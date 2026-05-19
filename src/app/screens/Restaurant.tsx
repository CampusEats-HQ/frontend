import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Share2, Plus } from 'lucide-react';
import { restaurants, menuItems } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, getItemCount, getTotal } = useCart();

  const restaurant = restaurants.find((r) => r.id === id);
  const menu = menuItems[id as keyof typeof menuItems] || [];

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-[390px] mx-auto md:max-w-4xl">
        {/* Hero Image */}
        <div className="relative">
          <div
            className="w-full h-[220px] bg-cover bg-center"
            style={{ backgroundImage: `url(${restaurant.image})` }}
          />
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-indigo-500" />
          </button>
          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg"
            aria-label="Share restaurant"
          >
            <Share2 size={18} className="text-indigo-500" />
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="px-5 py-6 bg-white">
          <h1 className="text-[22px] font-bold mb-2 text-gray-800">
            {restaurant.name}
          </h1>
          <p className="text-[13px] text-gray-500">
            ⭐ {restaurant.rating} (12 reviews) · Open now · {restaurant.deliveryTime} · ₦
            {restaurant.deliveryFee} delivery
          </p>
        </div>

        <div className="h-px mx-5 bg-gray-200" />

        {/* Menu */}
        <div className="px-5 py-4">
          {menu.map((section) => (
            <div key={section.category} className="mb-6">
              <h2 className="text-xs font-semibold mb-4 text-gray-500">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div
                      className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex-1">
                      <h3 className="text-[15px] font-semibold mb-1 text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-xs mb-2 text-gray-500">
                        {item.description}
                      </p>
                      <p className="text-sm font-semibold text-amber-500">
                        ₦{item.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          restaurant: restaurant.name,
                          image: item.image,
                        });
                        toast.success(`${item.name} added to cart!`);
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center self-center hover:opacity-80 transition-opacity bg-amber-500"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <Plus size={16} color="white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Cart Button */}
      {getItemCount() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100">
          <div className="max-w-[390px] mx-auto md:max-w-4xl">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="w-full h-[52px] rounded-lg font-semibold flex items-center justify-center bg-indigo-500 text-white"
            >
              View Cart ({getItemCount()} items) — ₦{getTotal()}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
