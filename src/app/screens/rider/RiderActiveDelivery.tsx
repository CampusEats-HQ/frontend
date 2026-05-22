import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Phone, CheckCircle } from 'lucide-react';
import { useRider } from '../../context/RiderContext';
import { riderService } from '../../services/rider';
import { toast } from 'sonner';

export default function RiderActiveDelivery() {
  const navigate = useNavigate();
  const { activeDelivery, setActiveDelivery } = useRider();
  const [currentStep, setCurrentStep] = useState(activeDelivery?.currentStep ?? 1);

  useEffect(() => {
    if (!activeDelivery) {
      navigate('/rider/home');
    }
  }, [activeDelivery, navigate]);

  if (!activeDelivery) {
    return null;
  }

  const handleConfirmPickup = async () => {
    try {
      await riderService.updateDeliveryStep(2);
      setCurrentStep(2);
      toast.success('Pickup confirmed! Now delivering to customer.');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to update step');
    }
  };

  const handleConfirmDelivery = async () => {
    try {
      const res = await riderService.completeDelivery();
      toast.success(`Delivery complete! ₦${res.earnings} earned.`);
      setActiveDelivery(null);
      navigate('/rider/home');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to complete delivery');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto">
        {/* Top Bar */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
          <p className="font-semibold text-gray-800">
            {activeDelivery.id}
          </p>
          <a href="#" className="text-sm font-medium text-indigo-500">
            Need Help?
          </a>
        </div>

        {/* Progress Steps */}
        <div className="px-5 py-6">
          <div className="flex items-center gap-4 mb-6">
            {/* Step 1 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-emerald-500' : 'bg-gray-50'}`}
                >
                  {currentStep > 1 ? (
                    <CheckCircle size={16} color="white" />
                  ) : (
                    <span className={`text-sm font-bold ${currentStep === 1 ? 'text-white' : 'text-gray-500'}`}>
                      1
                    </span>
                  )}
                </div>
                <p className={`text-xs font-medium ${currentStep === 1 ? 'text-gray-800' : 'text-gray-500'}`}>
                  Pick up from restaurant
                </p>
              </div>
            </div>

            {/* Connector Line */}
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-emerald-500' : 'bg-gray-300'}`} />

            {/* Step 2 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-indigo-500' : 'bg-gray-50'}`}
                >
                  <span className={`text-sm font-bold ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}>
                    2
                  </span>
                </div>
                <p className={`text-xs font-medium ${currentStep === 2 ? 'text-gray-800' : 'text-gray-500'}`}>
                  Deliver to customer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Directions - Bold Text */}
        <div className="px-5 mb-6">
          {currentStep === 1 ? (
            <div className="rounded-xl p-5 bg-amber-100">
              <p className="text-xs font-semibold mb-2 text-amber-800">
                PICK UP FROM
              </p>
              <p className="text-xl font-bold text-gray-800">
                {activeDelivery.restaurant.name}
              </p>
              <p className="text-sm mt-1 text-gray-500">
                {activeDelivery.restaurant.location}
              </p>
            </div>
          ) : (
            <div className="rounded-xl p-5 bg-blue-100">
              <p className="text-xs font-semibold mb-2 text-blue-900">
                DELIVER TO
              </p>
              <p className="text-xl font-bold text-gray-800">
                {activeDelivery.customer.location}
              </p>
              <p className="text-sm mt-1 text-gray-500">
                Customer: {activeDelivery.customer.name}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Card - Changes Based on Step */}
        <div className="px-5">
          {currentStep === 1 ? (
            // Going to Restaurant
            <div className="rounded-xl p-5 bg-gray-50">
              <p className="text-lg font-bold mb-3 text-gray-800">
                {activeDelivery.restaurant.name}
              </p>
              <p className="text-sm mb-4 text-gray-500">
                {activeDelivery.restaurant.location}
              </p>

              <div className="mb-6">
                <p className="text-xs font-semibold mb-2 text-gray-500">
                  Items to collect:
                </p>
                {activeDelivery.items.map((item: string, idx: number) => (
                  <p key={idx} className="text-sm mb-1 text-gray-800">
                    • {item}
                  </p>
                ))}
              </div>

              <button
                type="button"
                onClick={handleConfirmPickup}
                className="w-full h-[52px] rounded-lg font-semibold bg-emerald-500 text-white"
              >
                Confirm Pickup
              </button>
            </div>
          ) : (
            // Going to Customer
            <div className="rounded-xl p-5 bg-gray-50">
              <p className="text-sm mb-2 text-gray-500">
                Delivering to
              </p>
              <p className="text-lg font-bold mb-4 text-gray-800">
                {activeDelivery.customer.name}
              </p>

              <div className="mb-4">
                <p className="font-semibold text-sm mb-1 text-gray-800">
                  {activeDelivery.customer.location}
                </p>
              </div>

              <a
                href={`tel:${activeDelivery.customer.phone}`}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-lg mb-4 border border-gray-300"
              >
                <Phone size={18} className="text-indigo-500" />
                <span className="font-medium text-indigo-500">
                  Call {activeDelivery.customer.name}
                </span>
              </a>

              <button
                type="button"
                onClick={handleConfirmDelivery}
                className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white"
              >
                Confirm Delivery
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
