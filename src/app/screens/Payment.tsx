import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Building2, Wallet, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Payment() {
  const navigate = useNavigate();
  const { getTotal, items } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const deliveryFee = 400;
  const total = getTotal() + deliveryFee;

  const handlePayment = () => {
    navigate('/success/1042');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto md:max-w-4xl px-5 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button type="button" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={24} className="text-indigo-500" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Checkout
          </h1>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => setSelectedMethod('card')}
            className={`w-full p-4 rounded-lg border flex items-center gap-3 transition-all ${
              selectedMethod === 'card' ? 'border-2 border-indigo-500' : 'border-gray-200'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedMethod === 'card' ? 'border-indigo-500' : 'border-gray-200'
              }`}
            >
              {selectedMethod === 'card' && (
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              )}
            </div>
            <CreditCard size={20} className="text-gray-500" />
            <span className="font-medium text-gray-800">
              Pay with Card
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('bank')}
            className={`w-full p-4 rounded-lg border flex items-center gap-3 transition-all ${
              selectedMethod === 'bank' ? 'border-2 border-indigo-500' : 'border-gray-200'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedMethod === 'bank' ? 'border-indigo-500' : 'border-gray-200'
              }`}
            >
              {selectedMethod === 'bank' && (
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              )}
            </div>
            <Building2 size={20} className="text-gray-500" />
            <span className="font-medium text-gray-800">
              Bank Transfer
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('wallet')}
            className={`w-full p-4 rounded-lg border flex items-center gap-3 transition-all ${
              selectedMethod === 'wallet' ? 'border-2 border-indigo-500' : 'border-gray-200'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedMethod === 'wallet' ? 'border-indigo-500' : 'border-gray-200'
              }`}
            >
              {selectedMethod === 'wallet' && (
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              )}
            </div>
            <Wallet size={20} className="text-gray-500" />
            <span className="font-medium text-gray-800">
              Wallet
            </span>
          </button>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3 text-gray-800">
            Order Summary
          </h2>
          <div className="rounded-lg p-4 space-y-3 bg-gray-50">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item.quantity}x {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.restaurant}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  ₦{item.price * item.quantity}
                </p>
              </div>
            ))}
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-800">₦{getTotal()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery fee</span>
              <span className="text-gray-800">₦{deliveryFee}</span>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Promo code"
            className="flex-1 h-12 px-4 rounded-lg bg-gray-50"
          />
          <button type="button" className="px-6 font-semibold text-amber-500">
            Apply
          </button>
        </div>

        {/* Total Card */}
        <div className="rounded-lg p-4 mb-6 bg-gray-50">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-800">
              Total
            </span>
            <span className="text-base font-bold text-indigo-500">
              ₦{total}
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          type="button"
          onClick={handlePayment}
          className="w-full h-[52px] rounded-lg font-semibold mb-3 bg-indigo-500 text-white"
        >
          Pay ₦{total}
        </button>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2">
          <Lock size={14} className="text-gray-500" />
          <span className="text-xs text-gray-500">
            Secured by Paystack
          </span>
        </div>
      </div>
    </div>
  );
}
