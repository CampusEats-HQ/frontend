import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Phone, CheckCircle } from 'lucide-react';
import { useRider } from '../../context/RiderContext';
import { toast } from 'sonner';

export default function RiderActiveDelivery() {
  const navigate = useNavigate();
  const { activeDelivery, setActiveDelivery } = useRider();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!activeDelivery) {
      navigate('/rider/home');
    }
  }, [activeDelivery, navigate]);

  if (!activeDelivery) {
    return null;
  }

  const handleConfirmPickup = () => {
    setCurrentStep(2);
    toast.success('Pickup confirmed! Now delivering to customer.');
  };

  const handleConfirmDelivery = () => {
    toast.success('Delivery complete! ₦300 earned.');
    setActiveDelivery(null);
    navigate('/rider/home');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto">
        {/* Top Bar */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
          <p className="font-semibold" style={{ color: '#1F2937' }}>
            {activeDelivery.id}
          </p>
          <a href="#" className="text-sm font-medium" style={{ color: '#6366F1' }}>
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
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: currentStep >= 1 ? '#10B981' : '#F8F9FA',
                  }}
                >
                  {currentStep > 1 ? (
                    <CheckCircle size={16} color="white" />
                  ) : (
                    <span className="text-sm font-bold" style={{ color: currentStep === 1 ? 'white' : '#6B7280' }}>
                      1
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium" style={{ color: currentStep === 1 ? '#1F2937' : '#6B7280' }}>
                  Pick up from restaurant
                </p>
              </div>
            </div>

            {/* Connector Line */}
            <div className="w-12 h-0.5" style={{ backgroundColor: currentStep >= 2 ? '#10B981' : '#E0E0E0' }} />

            {/* Step 2 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: currentStep >= 2 ? '#6366F1' : '#F8F9FA',
                  }}
                >
                  <span className="text-sm font-bold" style={{ color: currentStep >= 2 ? 'white' : '#6B7280' }}>
                    2
                  </span>
                </div>
                <p className="text-xs font-medium" style={{ color: currentStep === 2 ? '#1F2937' : '#6B7280' }}>
                  Deliver to customer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Directions - Bold Text */}
        <div className="px-5 mb-6">
          {currentStep === 1 ? (
            <div className="rounded-xl p-5" style={{ backgroundColor: '#FEF3C7' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#92400E' }}>
                PICK UP FROM
              </p>
              <p className="text-xl font-bold" style={{ color: '#1F2937' }}>
                {activeDelivery.restaurant.name}
              </p>
              <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                {activeDelivery.restaurant.location}
              </p>
            </div>
          ) : (
            <div className="rounded-xl p-5" style={{ backgroundColor: '#DBEAFE' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#1E3A8A' }}>
                DELIVER TO
              </p>
              <p className="text-xl font-bold" style={{ color: '#1F2937' }}>
                {activeDelivery.customer.location}
              </p>
              <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                Customer: {activeDelivery.customer.name}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Card - Changes Based on Step */}
        <div className="px-5">
          {currentStep === 1 ? (
            // Going to Restaurant
            <div className="rounded-xl p-5" style={{ backgroundColor: '#F8F9FA' }}>
              <p className="text-lg font-bold mb-3" style={{ color: '#1F2937' }}>
                {activeDelivery.restaurant.name}
              </p>
              <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
                {activeDelivery.restaurant.location}
              </p>

              <div className="mb-6">
                <p className="text-xs font-semibold mb-2" style={{ color: '#6B7280' }}>
                  Items to collect:
                </p>
                {activeDelivery.items.map((item: string, idx: number) => (
                  <p key={idx} className="text-sm mb-1" style={{ color: '#1F2937' }}>
                    • {item}
                  </p>
                ))}
              </div>

              <button
                onClick={handleConfirmPickup}
                className="w-full h-[52px] rounded-lg font-semibold"
                style={{ backgroundColor: '#10B981', color: 'white' }}
              >
                Confirm Pickup
              </button>
            </div>
          ) : (
            // Going to Customer
            <div className="rounded-xl p-5" style={{ backgroundColor: '#F8F9FA' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>
                Delivering to
              </p>
              <p className="text-lg font-bold mb-4" style={{ color: '#1F2937' }}>
                {activeDelivery.customer.name}
              </p>

              <div className="mb-4">
                <p className="font-semibold text-sm mb-1" style={{ color: '#1F2937' }}>
                  {activeDelivery.customer.location}
                </p>
              </div>

              <a
                href={`tel:${activeDelivery.customer.phone}`}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-lg mb-4 border"
                style={{ borderColor: '#E0E0E0' }}
              >
                <Phone size={18} style={{ color: '#6366F1' }} />
                <span className="font-medium" style={{ color: '#6366F1' }}>
                  Call {activeDelivery.customer.name}
                </span>
              </a>

              <button
                onClick={handleConfirmDelivery}
                className="w-full h-[52px] rounded-lg font-semibold"
                style={{ backgroundColor: '#6366F1', color: 'white' }}
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
