import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Share2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { restaurantService } from '../services/restaurants';
import type { RestaurantDetail, MenuItem } from '../services/restaurants';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '../components/ui/drawer';

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items: cartItems, setItemQuantity, getItemCount, getTotal } = useCart();
  const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pickerItem, setPickerItem] = useState<MenuItem | null>(null);
  const [portionCount, setPortionCount] = useState(1);

  useEffect(() => {
    if (!id) return;
    restaurantService.getById(id)
      .then((res) => setRestaurant(res))
      .catch(() => toast.error('Failed to load restaurant'))
      .finally(() => setLoading(false));
  }, [id]);

  const openPicker = (item: MenuItem) => {
    const inCart = cartItems.find((c) => c.id === item.id);
    setPickerItem(item);
    setPortionCount(inCart?.quantity ?? 1);
    setDrawerOpen(true);
  };

  const confirmPortions = () => {
    if (!pickerItem || !restaurant) return;
    setItemQuantity(
      {
        id: pickerItem.id,
        name: pickerItem.name,
        price: pickerItem.price,
        restaurant: restaurant.name,
        restaurantId: id!,
        image: pickerItem.image,
      },
      portionCount,
    );
    setDrawerOpen(false);
    if (portionCount > 0) {
      toast.success(`${portionCount} portion${portionCount > 1 ? 's' : ''} added`);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-[390px] mx-auto md:max-w-4xl">
        {/* Hero Image */}
        <div className="relative">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-[220px] object-cover"
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
            ⭐ {restaurant.rating} ({restaurant.reviewsCount} reviews) · Open now · {restaurant.deliveryTime} · ₦
            {restaurant.deliveryFee} delivery
          </p>
        </div>

        <div className="h-px mx-5 bg-gray-200" />

        {/* Menu */}
        <div className="px-5 py-4">
          {restaurant.menu.map((section) => (
            <div key={section.category} className="mb-6">
              <h2 className="text-xs font-semibold mb-4 text-gray-500">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => {
                  const inCart = cartItems.find((c) => c.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 cursor-pointer active:opacity-70 transition-opacity"
                      onClick={() => openPicker(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-[15px] font-semibold mb-1 text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-xs mb-2 text-gray-500">
                          {item.description}
                        </p>
                        <p className="text-sm font-semibold text-amber-500">
                          ₦{item.price} <span className="text-xs font-normal text-gray-400">per portion</span>
                        </p>
                      </div>
                      {inCart ? (
                        <span className="self-center w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {inCart.quantity}
                        </span>
                      ) : (
                        <div className="self-center w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                          <Plus size={14} color="white" />
                        </div>
                      )}
                    </div>
                  );
                })}
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

      {/* Portion Picker Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          {pickerItem && (
            <>
              <DrawerHeader className="flex gap-4 items-start text-left">
                <img
                  src={pickerItem.image}
                  alt={pickerItem.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <DrawerTitle>{pickerItem.name}</DrawerTitle>
                  <DrawerDescription className="mt-1">{pickerItem.description}</DrawerDescription>
                  <p className="text-sm font-semibold text-amber-500 mt-1">
                    ₦{pickerItem.price} per portion
                  </p>
                </div>
              </DrawerHeader>

              <div className="flex items-center justify-center gap-8 py-6">
                <button
                  type="button"
                  onClick={() => setPortionCount(Math.max(0, portionCount - 1))}
                  className="w-11 h-11 rounded-full border-2 border-gray-300 flex items-center justify-center"
                  aria-label="Decrease portions"
                >
                  <Minus size={18} className="text-gray-600" />
                </button>
                <span className="text-3xl font-bold w-10 text-center text-gray-800">
                  {portionCount}
                </span>
                <button
                  type="button"
                  onClick={() => setPortionCount(portionCount + 1)}
                  className="w-11 h-11 rounded-full bg-amber-500 flex items-center justify-center"
                  aria-label="Increase portions"
                >
                  <Plus size={18} color="white" />
                </button>
              </div>

              <DrawerFooter>
                <button
                  type="button"
                  onClick={confirmPortions}
                  className={`w-full h-12 rounded-lg font-semibold text-white transition-colors ${
                    portionCount === 0 ? 'bg-red-500' : 'bg-indigo-500'
                  }`}
                >
                  {portionCount === 0
                    ? 'Remove from cart'
                    : `Add ${portionCount} portion${portionCount > 1 ? 's' : ''} — ₦${pickerItem.price * portionCount}`}
                </button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
