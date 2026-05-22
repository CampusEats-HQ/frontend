import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { orderService } from '../services/orders';
import type { OrderTracking } from '../services/orders';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderTracking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    orderService.getById(orderId)
      .then((res) => setOrder(res))
      .catch(() => toast.error('Failed to load order details'))
      .finally(() => setLoading(false));
  }, [orderId]);

  const restaurantName = order?.restaurant ?? 'Your Restaurant';
  const total = order?.total ?? 0;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-5">
      <div className="max-w-[390px] w-full md:max-w-md text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-emerald-500" />
        </div>

        {/* Title */}
        <h1 className="text-[22px] font-bold mb-2 text-gray-800">
          Order placed! 🎉
        </h1>
        <p className="text-sm mb-8 text-gray-500">
          Your rider will pick up your food shortly
        </p>

        {/* Order Summary */}
        <div className="rounded-lg p-4 mb-8 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <p className="font-semibold text-sm mb-1 text-gray-800">
                Order #{orderId}
              </p>
              <p className="text-xs text-gray-500">
                {restaurantName}
              </p>
            </div>
            <p className="font-bold text-indigo-500">
              ₦{total}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              navigate(`/tracking/${orderId}`);
            }}
            className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white"
          >
            Track my order
          </button>
          <button
            type="button"
            onClick={() => {
              clearCart();
              navigate('/home');
            }}
            className="w-full h-[52px] rounded-lg font-medium border border-gray-200 text-gray-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
