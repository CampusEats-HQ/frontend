import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, CreditCard, Building2, Wallet, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { orderService, paymentService } from '../services/orders';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotal, items, clearCart } = useCart(); // clearCart called on payment callback
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'transfer' | 'wallet'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [applyingPromo, setApplyingPromo] = useState(false);
  const deliveryFee = 400;
  const subtotal = getTotal();
  const packagingFee: number = (location.state as any)?.packagingFee ?? 0;
  const total = subtotal + deliveryFee + packagingFee - discount;

  const deliveryLocation = (location.state as any)?.deliveryLocation || '';

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    setApplyingPromo(true);
    orderService.applyPromo({ code: promoCode, subtotal })
      .then((res) => {
        if (res.valid && res.discountAmount != null) {
          setDiscount(res.discountAmount);
          toast.success(res.message || 'Promo applied!');
        } else {
          toast.error(res.message || 'Invalid promo code');
        }
      })
      .catch(() => toast.error('Failed to apply promo code'))
      .finally(() => setApplyingPromo(false));
  };

  const handlePayment = async () => {
    setPlacing(true);
    try {
      const order = await orderService.place({
        items: items.map((item) => ({
          itemId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          restaurantId: item.restaurantId,
        })),
        deliveryLocation,
        paymentMethod: selectedMethod,
        packagingFee: packagingFee || undefined,
        promoCode: promoCode || undefined,
      });

      const payment = await paymentService.initialize(order.orderId);
      window.location.href = payment.authorizationUrl;
    } catch (err: any) {
      toast.error(err.message || 'Payment failed');
      setPlacing(false);
    }
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
            onClick={() => setSelectedMethod('transfer')}
            className={`w-full p-4 rounded-lg border flex items-center gap-3 transition-all ${
              selectedMethod === 'transfer' ? 'border-2 border-indigo-500' : 'border-gray-200'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedMethod === 'transfer' ? 'border-indigo-500' : 'border-gray-200'
              }`}
            >
              {selectedMethod === 'transfer' && (
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
              <span className="text-gray-800">₦{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery fee</span>
              <span className="text-gray-800">₦{deliveryFee}</span>
            </div>
            {packagingFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Packaging</span>
                <span className="text-gray-800">₦{packagingFee}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="text-emerald-500">-₦{discount}</span>
              </div>
            )}
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
          <button
            type="button"
            onClick={handleApplyPromo}
            disabled={applyingPromo}
            className="px-6 font-semibold text-amber-500 disabled:opacity-60"
          >
            {applyingPromo ? '...' : 'Apply'}
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
          disabled={placing}
          className="w-full h-[52px] rounded-lg font-semibold mb-3 bg-indigo-500 text-white disabled:opacity-60"
        >
          {placing ? 'Processing...' : `Pay ₦${total}`}
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
