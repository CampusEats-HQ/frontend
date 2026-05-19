import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';

export default function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const steps = [
    { label: 'Order Confirmed', completed: true },
    { label: 'Being Prepared', completed: true },
    { label: 'Rider on the way', completed: false, active: true },
    { label: 'Delivered', completed: false },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto md:max-w-4xl">
        {/* Top Bar */}
        <div className="px-5 py-4 flex items-center gap-4" style={{ backgroundColor: '#6366F1' }}>
          <button onClick={() => navigate('/home')}>
            <ArrowLeft size={24} color="white" />
          </button>
          <h1 className="text-base font-semibold text-white">Order #{orderId}</h1>
        </div>

        {/* Progress Bar */}
        <div className="px-5 py-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="flex items-center w-full">
                  {index > 0 && (
                    <div
                      className="flex-1 h-0.5"
                      style={{ backgroundColor: step.completed ? '#10B981' : '#E0E0E0' }}
                    />
                  )}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      step.active ? 'animate-pulse' : ''
                    }`}
                    style={{
                      backgroundColor: step.completed
                        ? '#10B981'
                        : step.active
                        ? '#F59E0B'
                        : '#E0E0E0',
                    }}
                  >
                    {step.completed && <span className="text-white text-xs">✓</span>}
                    {step.active && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="flex-1 h-0.5"
                      style={{ backgroundColor: step.completed ? '#10B981' : '#E0E0E0' }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 text-center">
                <p
                  className="text-[10px] px-1"
                  style={{ color: step.completed || step.active ? '#1F2937' : '#6B7280' }}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mx-5 mb-6">
          <div
            className="w-full h-[200px] rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#F8F9FA' }}
          >
            <span className="text-sm" style={{ color: '#6B7280' }}>
              Map View
            </span>
          </div>
        </div>

        {/* Delivery Info Card */}
        <div className="mx-5 bg-white rounded-xl shadow-lg p-5 border border-gray-100">
          <p className="text-xl font-bold text-center mb-6" style={{ color: '#1F2937' }}>
            Arriving in ~8 mins
          </p>

          <div className="h-px mb-4" style={{ backgroundColor: '#E0E0E0' }} />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                style={{ backgroundColor: '#F59E0B', color: 'white' }}
              >
                E
              </div>
              <div>
                <p className="font-semibold" style={{ color: '#1F2937' }}>
                  Emeka
                </p>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  ⭐ 4.9
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="w-10 h-10 rounded-full border flex items-center justify-center"
                style={{ borderColor: '#E0E0E0' }}
              >
                <Phone size={18} style={{ color: '#6B7280' }} />
              </button>
              <button
                className="w-10 h-10 rounded-full border flex items-center justify-center"
                style={{ borderColor: '#E0E0E0' }}
              >
                <MessageCircle size={18} style={{ color: '#6B7280' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
