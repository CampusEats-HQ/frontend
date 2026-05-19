import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Trash2, Minus, Plus, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { hostels } from '../data/mockData';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCart();
  const [selectedHostel, setSelectedHostel] = useState('Eni-Jokun Hostel');
  const deliveryFee = 400;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[390px] mx-auto md:max-w-4xl px-5 py-6">
          <h1 className="text-2xl font-bold mb-8" style={{ color: '#1F2937' }}>
            My Order
          </h1>
          <div className="text-center py-12">
            <p style={{ color: '#6B7280' }}>Your cart is empty</p>
            <button
              onClick={() => navigate('/home')}
              className="mt-4 px-6 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: '#6366F1', color: 'white' }}
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
          <h1 className="text-2xl font-bold" style={{ color: '#1F2937' }}>
            My Order
          </h1>
          <button onClick={clearCart} className="text-sm" style={{ color: '#6B7280' }}>
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
                  <h3 className="font-semibold text-sm mb-1" style={{ color: '#1F2937' }}>
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border flex items-center justify-center"
                      style={{ borderColor: '#E0E0E0' }}
                    >
                      <Minus size={14} style={{ color: '#6B7280' }} />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border flex items-center justify-center"
                      style={{ borderColor: '#E0E0E0' }}
                    >
                      <Plus size={14} style={{ color: '#6B7280' }} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="font-semibold text-sm" style={{ color: '#1F2937' }}>
                    ₦{item.price * item.quantity}
                  </p>
                  <button onClick={() => removeItem(item.id)}>
                    <Trash2 size={16} style={{ color: '#6B7280' }} />
                  </button>
                </div>
              </div>
              <div className="h-px mt-4" style={{ backgroundColor: '#F8F9FA' }} />
            </div>
          ))}
        </div>

        {/* Delivery Location */}
        <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#F8F9FA' }}>
          <label className="text-xs mb-2 block font-medium" style={{ color: '#6B7280' }}>
            Deliver to
          </label>
          <div className="relative">
            <select
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
              className="w-full h-12 px-3 rounded-lg appearance-none pr-10"
              style={{ backgroundColor: 'white', color: '#1F2937' }}
            >
              {hostels.map((hostel) => (
                <option key={hostel} value={hostel}>
                  {hostel}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              size={18}
              style={{ color: '#6B7280' }}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="flex justify-between mb-2">
            <span className="text-sm" style={{ color: '#6B7280' }}>
              Subtotal
            </span>
            <span className="text-sm font-medium" style={{ color: '#1F2937' }}>
              ₦{getTotal()}
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-sm" style={{ color: '#6B7280' }}>
              Delivery fee
            </span>
            <span className="text-sm font-medium" style={{ color: '#1F2937' }}>
              ₦{deliveryFee}
            </span>
          </div>
          <div className="h-px mb-3" style={{ backgroundColor: '#E0E0E0' }} />
          <div className="flex justify-between">
            <span className="text-base font-semibold" style={{ color: '#1F2937' }}>
              Total
            </span>
            <span className="text-base font-bold" style={{ color: '#6366F1' }}>
              ₦{getTotal() + deliveryFee}
            </span>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={() => navigate('/payment')}
          className="w-full h-[52px] rounded-lg font-semibold"
          style={{ backgroundColor: '#6366F1', color: 'white' }}
        >
          Proceed to Pay — ₦{getTotal() + deliveryFee}
        </button>
      </div>
    </div>
  );
}
