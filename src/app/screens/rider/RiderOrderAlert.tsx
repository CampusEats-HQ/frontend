import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Clock } from 'lucide-react';
import { useRider } from '../../context/RiderContext';
import { incomingOrder, activeDelivery } from '../../data/riderMockData';
import { toast } from 'sonner';

export default function RiderOrderAlert() {
  const navigate = useNavigate();
  const { setActiveDelivery, setHasIncomingOrder } = useRider();
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

  const handleAccept = () => {
    setActiveDelivery(activeDelivery);
    setHasIncomingOrder(false);
    toast.success('Order accepted!');
    navigate('/rider/delivery');
  };

  const handleGoBack = () => {
    // Alert stays visible until accepted or admin assigns
    // This just returns rider to home but alert persists
    setHasIncomingOrder(false);
    navigate('/rider/home');
  };

  // Simulate another rider accepting (for demo)
  const simulateOtherRiderAccepted = () => {
    setOrderTakenByOther(true);
    toast.info('Another rider accepted this order');
    setTimeout(() => {
      setHasIncomingOrder(false);
      navigate('/rider/home');
    }, 2000);
  };

  if (orderTakenByOther) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="max-w-[390px] w-full text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
            <span className="text-2xl">✓</span>
          </div>
          <p className="text-lg font-semibold" style={{ color: '#6B7280' }}>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-2" style={{ backgroundColor: '#FEF3C7' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#F59E0B' }} />
            <span className="text-xs font-semibold" style={{ color: '#92400E' }}>
              LIVE ORDER
            </span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: '#1F2937' }}>
            New Delivery Request
          </h1>
        </div>

        {/* Elapsed Time (counts UP, not down) */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
            <Clock size={16} style={{ color: '#6B7280' }} />
            <span className="text-sm" style={{ color: '#6B7280' }}>
              Waiting {elapsedTime}s
            </span>
            {elapsedTime >= 45 && (
              <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                Admin notified
              </span>
            )}
          </div>
        </div>

        {/* Order Details Card */}
        <div className="rounded-xl p-5 mb-6" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <p className="font-bold mb-1" style={{ color: '#1F2937' }}>
                {incomingOrder.restaurant.name}
              </p>
              <p className="text-xs" style={{ color: '#6B7280' }}>
                {incomingOrder.restaurant.location}
              </p>
            </div>
            <ArrowRight size={24} style={{ color: '#6B7280' }} />
            <div className="flex-1">
              <p className="font-bold mb-1" style={{ color: '#1F2937' }}>
                {incomingOrder.customer.location}
              </p>
            </div>
          </div>

          <div className="h-px mb-4" style={{ backgroundColor: '#E0E0E0' }} />

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Distance
            </p>
            <p className="font-semibold text-sm" style={{ color: '#1F2937' }}>
              {incomingOrder.distance}
            </p>
          </div>

          {/* Payout - Most Important */}
          <div className="text-center py-4 rounded-lg" style={{ backgroundColor: '#DBEAFE' }}>
            <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
              You'll earn
            </p>
            <p className="text-3xl font-bold" style={{ color: '#6366F1' }}>
              ₦{incomingOrder.payout}
            </p>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={handleAccept}
          className="w-full h-[56px] rounded-lg font-bold text-lg mb-3"
          style={{ backgroundColor: '#10B981', color: 'white' }}
        >
          Accept Order
        </button>
        <button
          onClick={handleGoBack}
          className="w-full text-center py-3 font-medium mb-2"
          style={{ color: '#6B7280' }}
        >
          Go Back (Alert stays active)
        </button>

        {/* Demo Button */}
        <button
          onClick={simulateOtherRiderAccepted}
          className="w-full text-center py-2 text-xs"
          style={{ color: '#6B7280' }}
        >
          [Demo: Simulate another rider accepting]
        </button>
      </div>
    </div>
  );
}
