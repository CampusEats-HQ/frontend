import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Trash2, Minus, Plus, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { restaurantService } from '../services/restaurants';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCart();
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedHostel, setSelectedHostel] = useState('');
  const [packagingFee, setPackagingFee] = useState(0);
  const deliveryFee = 400;

  useEffect(() => {
    restaurantService.getDeliveryLocations()
      .then((res) => {
        setLocations(res.locations);
        if (res.locations.length > 0) setSelectedHostel(res.locations[0]);
      })
      .catch(() => toast.error('Failed to load delivery locations'));
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[390px] mx-auto md:max-w-4xl px-5 py-6">
          <h1 className="text-2xl font-bold mb-8 text-gray-800">
            My Order
          </h1>
          <div className="text-center py-12">
            <p className="text-gray-500">Your cart is empty</p>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="mt-4 px-6 py-3 rounded-lg font-semibold bg-indigo-500 text-white"
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="max-w-[390px] mx-auto md:max-w-4xl px-5 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            My Order
          </h1>
          <button type="button" onClick={clearCart} className="text-sm text-gray-500">
            Clear all
          </button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id}>
              <div className="flex gap-3">
                <div
                  className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1 text-gray-800">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus size={14} className="text-gray-500" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus size={14} className="text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="font-semibold text-sm text-gray-800">
                    ₦{item.price * item.quantity}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="h-px mt-4 bg-gray-50" />
            </div>
          ))}
        </div>

        {/* Delivery Location */}
        <div className="rounded-lg p-4 mb-6 bg-gray-50">
          <label htmlFor="hostel-select" className="text-xs mb-2 block font-medium text-gray-500">
            Deliver to
          </label>
          <div className="relative">
            <select
              id="hostel-select"
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
              className="w-full h-12 px-3 rounded-lg appearance-none pr-10 bg-white text-gray-800"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
              size={18}
            />
          </div>
        </div>

        {/* Packaging */}
        <div className="rounded-lg p-4 mb-6 bg-gray-50">
          <p className="text-xs font-medium mb-3 text-gray-500">Takeaway packaging</p>
          <div className="flex gap-2">
            {[
              { label: 'No pack', value: 0 },
              { label: 'Small pack', value: 200 },
              { label: 'Large pack', value: 300 },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPackagingFee(opt.value)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                  packagingFee === opt.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                {opt.label}
                {opt.value > 0 && <span className="block text-xs font-normal">₦{opt.value}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg p-4 mb-6 bg-gray-50">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-sm font-medium text-gray-800">₦{getTotal()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Delivery fee</span>
            <span className="text-sm font-medium text-gray-800">₦{deliveryFee}</span>
          </div>
          {packagingFee > 0 && (
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Packaging</span>
              <span className="text-sm font-medium text-gray-800">₦{packagingFee}</span>
            </div>
          )}
          <div className="h-px mb-3 bg-gray-200" />
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-800">Total</span>
            <span className="text-base font-bold text-indigo-500">₦{getTotal() + deliveryFee + packagingFee}</span>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          type="button"
          onClick={() => navigate('/payment', { state: { deliveryLocation: selectedHostel, packagingFee } })}
          className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white"
        >
          Proceed to Pay — ₦{getTotal() + deliveryFee + packagingFee}
        </button>
      </div>
    </div>
  );
}
