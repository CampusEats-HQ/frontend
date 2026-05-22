import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { vendorService, VendorOrder } from '../../services/vendor';

export default function VendorOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<VendorOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorService.getOrders()
      .then((res) => {
        const found = res.orders.find((o) => o.id === id);
        if (found) {
          setOrder(found);
        } else {
          toast.error('Order not found');
        }
      })
      .catch(() => toast.error('Failed to load order'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdateStatus = (newStatus: VendorOrder['status']) => {
    if (!order) return;
    vendorService.updateOrderStatus(order.id, newStatus)
      .then(() => {
        setOrder((prev) => prev ? { ...prev, status: newStatus } : prev);
        toast.success(`Order marked as ${newStatus}`);
      })
      .catch(() => toast.error('Failed to update order status'));
  };

  const getActionButton = () => {
    if (!order) return null;
    if (order.status === 'pending') {
      return (
        <button
          type="button"
          onClick={() => handleUpdateStatus('preparing')}
          className="w-full h-[52px] rounded-lg font-semibold bg-emerald-500 text-white"
        >
          Accept Order
        </button>
      );
    }
    if (order.status === 'preparing') {
      return (
        <button
          type="button"
          onClick={() => handleUpdateStatus('ready')}
          className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white"
        >
          Mark as Ready for Pickup
        </button>
      );
    }
    if (order.status === 'ready') {
      return (
        <div className="text-center py-4">
          <p className="text-sm mb-1 text-gray-500">
            Rider picking up
          </p>
          <p className="font-semibold text-gray-800">
            {order.riderName}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[480px] mx-auto">
        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-4 border-b border-gray-100">
          <button type="button" aria-label="Go back" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} className="text-indigo-500" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            Order Details
          </h1>
        </div>

        <div className="px-5 py-6">
          {/* Order Info */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-bold mb-1 text-gray-800">
                  {order.id}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.timestamp).toLocaleString()}
                </p>
              </div>
              <span className="px-3 py-1 rounded text-sm font-medium bg-blue-100 text-indigo-500">
                {order.status}
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-3 text-gray-800">
              Items Ordered
            </h2>
            <div className="rounded-lg p-4 space-y-3 bg-gray-50">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {item.quantity}x {item.name}
                    </p>
                    {order.specialInstructions && idx === 0 && (
                      <p className="text-xs mt-1 text-amber-500">
                        Note: {order.specialInstructions}
                      </p>
                    )}
                  </div>
                  <p className="font-medium text-sm text-gray-800">
                    ₦{item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="h-px bg-gray-300" />
              <div className="flex justify-between">
                <p className="font-semibold text-gray-800">
                  Total
                </p>
                <p className="font-bold text-indigo-500">
                  ₦{order.total}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold mb-2 text-gray-800">
              Delivery Location
            </h2>
            <p className="text-sm text-gray-500">
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
