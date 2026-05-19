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
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} style={{ color: '#6366F1' }} />
          </button>
          <h1 className="text-2xl font-bold" style={{ color: '#1F2937' }}>
            Checkout
          </h1>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => setSelectedMethod('card')}
            className="w-full p-4 rounded-lg border flex items-center gap-3 transition-all"
            style={
              selectedMethod === 'card'
                ? { borderColor: '#6366F1', borderWidth: '2px' }
                : { borderColor: '#E0E0E0' }
            }
          >
            <div
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              style={{ borderColor: selectedMethod === 'card' ? '#6366F1' : '#E0E0E0' }}
            >
              {selectedMethod === 'card' && (
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#6366F1' }} />
              )}
            </div>
            <CreditCard size={20} style={{ color: '#6B7280' }} />
            <span className="font-medium" style={{ color: '#1F2937' }}>
              Pay with Card
            </span>
          </button>

          <button
            onClick={() => setSelectedMethod('bank')}
            className="w-full p-4 rounded-lg border flex items-center gap-3 transition-all"
            style={
              selectedMethod === 'bank'
                ? { borderColor: '#6366F1', borderWidth: '2px' }
                : { borderColor: '#E0E0E0' }
            }
          >
            <div
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              style={{ borderColor: selectedMethod === 'bank' ? '#6366F1' : '#E0E0E0' }}
            >
              {selectedMethod === 'bank' && (
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#6366F1' }} />
              )}
            </div>
            <Building2 size={20} style={{ color: '#6B7280' }} />
            <span className="font-medium" style={{ color: '#1F2937' }}>
              Bank Transfer
            </span>
          </button>

          <button
            onClick={() => setSelectedMethod('wallet')}
            className="w-full p-4 rounded-lg border flex items-center gap-3 transition-all"
            style={
              selectedMethod === 'wallet'
                ? { borderColor: '#6366F1', borderWidth: '2px' }
                : { borderColor: '#E0E0E0' }
            }
          >
            <div
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              style={{ borderColor: selectedMethod === 'wallet' ? '#6366F1' : '#E0E0E0' }}
            >
              {selectedMethod === 'wallet' && (
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#6366F1' }} />
              )}
            </div>
            <Wallet size={20} style={{ color: '#6B7280' }} />
            <span className="font-medium" style={{ color: '#1F2937' }}>
              Wallet
            </span>
          </button>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>
            Order Summary
          </h2>
          <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: '#F8F9FA' }}>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#1F2937' }}>
                    {item.quantity}x {item.name}
                  </p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    {item.restaurant}
                  </p>
                </div>
                <p className="text-sm font-medium" style={{ color: '#1F2937' }}>
                  ₦{item.price * item.quantity}
                </p>
              </div>
            ))}
            <div className="h-px" style={{ backgroundColor: '#E0E0E0' }} />
            <div className="flex justify-between text-sm">
              <span style={{ color: '#6B7280' }}>Subtotal</span>
              <span style={{ color: '#1F2937' }}>₦{getTotal()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#6B7280' }}>Delivery fee</span>
              <span style={{ color: '#1F2937' }}>₦{deliveryFee}</span>
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
            className="flex-1 h-12 px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
          />
          <button className="px-6 font-semibold" style={{ color: '#F59E0B' }}>
            Apply
          </button>
        </div>

        {/* Total Card */}
        <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="flex justify-between">
            <span className="text-base font-semibold" style={{ color: '#1F2937' }}>
              Total
            </span>
            <span className="text-base font-bold" style={{ color: '#6366F1' }}>
              ₦{total}
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full h-[52px] rounded-lg font-semibold mb-3"
          style={{ backgroundColor: '#6366F1', color: 'white' }}
        >
          Pay ₦{total}
        </button>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2">
          <Lock size={14} style={{ color: '#6B7280' }} />
          <span className="text-xs" style={{ color: '#6B7280' }}>
            Secured by Paystack
          </span>
        </div>
      </div>
    </div>
  );
}
