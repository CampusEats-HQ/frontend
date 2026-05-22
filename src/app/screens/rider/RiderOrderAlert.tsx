import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Clock } from 'lucide-react';
import { useRider } from '../../context/RiderContext';
import { riderService } from '../../services/rider';
import { toast } from 'sonner';

export default function RiderOrderAlert() {
  const navigate = useNavigate();
  const { activeDelivery, setActiveDelivery, setHasIncomingOrder } = useRider();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [orderTakenByOther, setOrderTakenByOther] = useState(false);

  // Timer counts UP (shows how long order has been waiting)
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Show alert at 45 seconds (admin notification threshold)
  useEffect(() => {
    if (elapsedTime === 45) {
      toast.warning('Order waiting 45s - Admin notified');
    }
  }, [elapsedTime]);

  const order = activeDelivery;

  const handleAccept = async () => {
    if (!order?.id) return;
    try {
      const res = await riderService.acceptOrder(order.id);
      setActiveDelivery(res.delivery);
      setHasIncomingOrder(false);
      toast.success('Order accepted!');
      navigate('/rider/delivery');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to accept order');
    }
  };

  const handleReject = async () => {
    if (!order?.id) return;
    try {
      await riderService.rejectOrder(order.id);
      setHasIncomingOrder(false);
      navigate('/rider/home');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to reject order');
      setHasIncomingOrder(false);
      navigate('/rider/home');
    }
  };

  const handleGoBack = () => {
    // Alert stays visible until accepted or admin assigns
    // This just returns rider to home but alert persists
    setHasIncomingOrder(false);
    navigate('/rider/home');
  };

  if (orderTakenByOther) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="max-w-[390px] w-full text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gray-50">
            <span className="text-2xl">✓</span>
          </div>
          <p className="text-lg font-semibold text-gray-500">
            Order taken by another rider
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-5">
      <div className="max-w-[390px] w-full">
        {/* Title with Alert Badge */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-2 bg-amber-100">
            <div className="w-2 h-2 rounded-full animate-pulse bg-amber-500" />
            <span className="text-xs font-semibold text-amber-800">
              LIVE ORDER
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            New Delivery Request
          </h1>
        </div>

        {/* Elapsed Time (counts UP, not down) */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50">
            <Clock size={16} className="text-gray-500" />
            <span className="text-sm text-gray-500">
              Waiting {elapsedTime}s
            </span>
            {elapsedTime >= 45 && (
              <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Admin notified
              </span>
            )}
          </div>
        </div>

        {/* Order Details Card */}
        <div className="rounded-xl p-5 mb-6 bg-gray-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <p className="font-bold mb-1 text-gray-800">
                {order?.restaurant?.name ?? '—'}
              </p>
              <p className="text-xs text-gray-500">
                {order?.restaurant?.location ?? '—'}
              </p>
            </div>
            <ArrowRight size={24} className="text-gray-500" />
            <div className="flex-1">
              <p className="font-bold mb-1 text-gray-800">
                {order?.customer?.location ?? '—'}
              </p>
            </div>
          </div>

          <div className="h-px mb-4 bg-gray-300" />

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Distance
            </p>
            <p className="font-semibold text-sm text-gray-800">
              {order?.distance ?? '—'}
            </p>
          </div>

          {/* Payout - Most Important */}
          <div className="text-center py-4 rounded-lg bg-blue-100">
            <p className="text-sm mb-1 text-gray-500">
              You'll earn
            </p>
            <p className="text-3xl font-bold text-indigo-500">
              ₦{order?.payout ?? '—'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <button
          type="button"
          onClick={handleAccept}
          className="w-full h-[56px] rounded-lg font-bold text-lg mb-3 bg-emerald-500 text-white"
        >
          Accept Order
        </button>
        <button
          type="button"
          onClick={handleReject}
          className="w-full text-center py-3 font-medium mb-2 text-red-500"
        >
          Reject Order
        </button>
        <button
          type="button"
          onClick={handleGoBack}
          className="w-full text-center py-3 font-medium mb-2 text-gray-500"
        >
          Go Back (Alert stays active)
        </button>
      </div>
    </div>
  );
}
