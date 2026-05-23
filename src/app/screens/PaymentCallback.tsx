import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { CheckCircle, XCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { paymentService } from '../services/orders';

type State = 'verifying' | 'success' | 'failed';

export default function PaymentCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [state, setState] = useState<State>('verifying');
  const [orderId, setOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const reference = searchParams.get('reference');
    if (!reference) {
      setState('failed');
      setErrorMsg('No payment reference found.');
      return;
    }

    paymentService.verify(reference)
      .then((res) => {
        if (res.paymentStatus === 'success' || res.paymentStatus === 'paid') {
          clearCart();
          setOrderId(res.orderId);
          setState('success');
        } else {
          setErrorMsg(`Payment status: ${res.paymentStatus}`);
          setState('failed');
        }
      })
      .catch((err: Error) => {
        setErrorMsg(err.message || 'Payment verification failed.');
        setState('failed');
      });
  }, [searchParams, clearCart]);

  if (state === 'verifying') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 text-sm">Verifying your payment…</p>
      </div>
    );
  }

  if (state === 'failed') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 max-w-[390px] mx-auto">
        <XCircle size={64} className="text-red-400 mb-4" />
        <h1 className="text-xl font-bold mb-2 text-gray-800">Payment failed</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">{errorMsg || 'Something went wrong. Please contact support.'}</p>
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
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Order confirmed!</h1>
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
