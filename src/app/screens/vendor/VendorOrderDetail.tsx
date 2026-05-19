import { useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { vendorOrders } from '../../data/vendorMockData';

export default function VendorOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = vendorOrders.find((o) => o.id === id);

  if (!order) {
    return <div>Order not found</div>;
  }

  const getActionButton = () => {
    if (order.status === 'pending') {
      return (
        <button
          onClick={() => alert('Order accepted!')}
          className="w-full h-[52px] rounded-lg font-semibold"
          style={{ backgroundColor: '#10B981', color: 'white' }}
        >
          Accept Order
        </button>
      );
    }
    if (order.status === 'preparing') {
      return (
        <button
          onClick={() => alert('Marked as ready!')}
          className="w-full h-[52px] rounded-lg font-semibold"
          style={{ backgroundColor: '#6366F1', color: 'white' }}
        >
          Mark as Ready for Pickup
        </button>
      );
    }
    if (order.status === 'ready') {
      return (
        <div className="text-center py-4">
          <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
            Rider picking up
          </p>
          <p className="font-semibold" style={{ color: '#1F2937' }}>
            {order.riderName}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[480px] mx-auto">
        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-4 border-b border-gray-100">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} style={{ color: '#6366F1' }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: '#1F2937' }}>
            Order Details
          </h1>
        </div>

        <div className="px-5 py-6">
          {/* Order Info */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-bold mb-1" style={{ color: '#1F2937' }}>
                  {order.id}
                </p>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  {order.timestamp.toLocaleString()}
                </p>
              </div>
              <span
                className="px-3 py-1 rounded text-sm font-medium"
                style={{ backgroundColor: '#DBEAFE', color: '#6366F1' }}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>
              Items Ordered
            </h2>
            <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: '#F8F9FA' }}>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#1F2937' }}>
                      {item.quantity}x {item.name}
                    </p>
                    {order.specialInstructions && idx === 0 && (
                      <p className="text-xs mt-1" style={{ color: '#F59E0B' }}>
                        Note: {order.specialInstructions}
                      </p>
                    )}
                  </div>
                  <p className="font-medium text-sm" style={{ color: '#1F2937' }}>
                    ₦{item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="h-px" style={{ backgroundColor: '#E0E0E0' }} />
              <div className="flex justify-between">
                <p className="font-semibold" style={{ color: '#1F2937' }}>
                  Total
                </p>
                <p className="font-bold" style={{ color: '#6366F1' }}>
                  ₦{order.total}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold mb-2" style={{ color: '#1F2937' }}>
              Delivery Location
            </h2>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              {order.location}
            </p>
          </div>

          {/* Action Button */}
          {getActionButton()}
        </div>
      </div>
    </div>
  );
}
