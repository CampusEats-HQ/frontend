import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { CheckCircle, XCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function PaymentCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const reference = searchParams.get('reference');
    if (reference) {
      // Extract orderId — reference format is "ORD-4521-1234567890"
      const extracted = reference.replace(/-\d+$/, '');
      setOrderId(extracted);
      clearCart();
    }
  }, [searchParams, clearCart]);

  if (!searchParams.get('reference')) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 max-w-[390px] mx-auto">
        <XCircle size={64} className="text-red-400 mb-4" />
        <h1 className="text-xl font-bold mb-2 text-gray-800">Something went wrong</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">No payment reference found. Please contact support.</p>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 max-w-[390px] mx-auto">
      <CheckCircle size={64} className="text-emerald-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Order confirmed! 🎉</h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        We're preparing your food. Your rider will be assigned shortly.
      </p>

      <div className="w-full space-y-3">
        <button
          type="button"
          onClick={() => navigate(`/tracking/${orderId}`)}
          className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white"
        >
          Track my order
        </button>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="w-full h-[52px] rounded-lg font-semibold border border-gray-200 text-gray-800"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
