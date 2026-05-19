import { useNavigate, useParams } from 'react-router';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getTotal, clearCart } = useCart();
  const total = getTotal() + 400;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-5">
      <div className="max-w-[390px] w-full md:max-w-md text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} style={{ color: '#10B981' }} />
        </div>

        {/* Title */}
        <h1 className="text-[22px] font-bold mb-2" style={{ color: '#1F2937' }}>
          Order placed! 🎉
        </h1>
        <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
          Emeka will pick up your food in ~5 mins
        </p>

        {/* Order Summary */}
        <div className="rounded-lg p-4 mb-8" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="flex justify-between items-center">
            <div className="text-left">
              <p className="font-semibold text-sm mb-1" style={{ color: '#1F2937' }}>
                Order #{orderId}
              </p>
              <p className="text-xs" style={{ color: '#6B7280' }}>
                Mavise Grill
              </p>
            </div>
            <p className="font-bold" style={{ color: '#6366F1' }}>
              ₦{total}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              navigate(`/tracking/${orderId}`);
            }}
            className="w-full h-[52px] rounded-lg font-semibold"
            style={{ backgroundColor: '#6366F1', color: 'white' }}
          >
            Track my order
          </button>
          <button
            onClick={() => {
              clearCart();
              navigate('/home');
            }}
            className="w-full h-[52px] rounded-lg font-medium border"
            style={{ borderColor: '#E0E0E0', color: '#1F2937' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
