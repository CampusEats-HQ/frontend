import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { orderService } from '../services/orders';
import type { Order } from '../services/orders';

export default function OrderHistory() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    orderService.getHistory()
      .then((res) => setOrders(res.orders))
      .catch(() => toast.error('Failed to load order history'))
      .finally(() => setLoading(false));
  }, []);

  const handleReorder = (order: Order) => {
    orderService.reorder(order.id)
      .then((res) => {
        res.items.forEach((item) => {
          for (let i = 0; i < item.quantity; i++) {
            addItem({
              id: item.itemId,
              name: item.name,
              price: item.price,
              restaurant: res.restaurant,
              image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=200&h=200&fit=crop',
            });
          }
        });
        toast.success(`${res.items.length} items added to cart!`);
        navigate('/cart');
      })
      .catch(() => toast.error('Failed to reorder'));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center border-b border-gray-200">
        <button type="button" onClick={() => navigate('/home')} className="mr-4" aria-label="Go to home">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Order History
        </h1>
      </div>

      {/* Orders List */}
      <div className="px-6 py-6 space-y-4 max-w-4xl mx-auto">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base mb-1 text-gray-800">
                  {order.restaurant}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(order.date)} at {order.time} • {order.id}
                </p>
              </div>
              <span className="px-3 py-1 rounded text-xs font-medium whitespace-nowrap bg-emerald-100 text-emerald-500">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            {/* Items */}
            <div className="mb-3 p-3 rounded-lg bg-gray-50">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start mb-1 last:mb-0">
                  <p className="text-sm flex-1 min-w-0 break-words text-gray-800">
                    {item.quantity}x {item.name}
                  </p>
                  <p className="text-sm font-medium ml-2 text-gray-800">
                    ₦{item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 border-gray-200">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-800">₦{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="text-gray-800">₦{order.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-800">Total</span>
                  <span className="text-gray-800">₦{order.total}</span>
                </div>
              </div>
            </div>

            {order.rider && (
              <p className="text-xs mb-3 text-gray-500">
                Delivered by {order.rider}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleReorder(order)}
                className="flex-1 h-10 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-indigo-500 text-white"
              >
                <RotateCcw size={16} />
                Reorder
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrder(order)}
                className="h-10 px-4 rounded-lg text-sm border border-gray-200 flex items-center gap-1 text-gray-500"
              >
                Details
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-semibold mb-2 text-gray-800">
              No orders yet
            </p>
            <p className="text-sm mb-6 text-gray-500">
              Your order history will appear here
            </p>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="px-6 h-12 rounded-lg font-semibold bg-indigo-500 text-white"
            >
              Browse Restaurants
            </button>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Order Details
              </h2>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
              >
                <span className="text-2xl text-gray-500">×</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs mb-1 text-gray-500">Order ID</p>
                <p className="text-sm font-semibold text-gray-800">{selectedOrder.id}</p>
              </div>

              <div>
                <p className="text-xs mb-1 text-gray-500">Restaurant</p>
                <p className="text-sm font-semibold text-gray-800">{selectedOrder.restaurant}</p>
              </div>

              <div>
                <p className="text-xs mb-1 text-gray-500">Order Date & Time</p>
                <p className="text-sm font-semibold text-gray-800">
                  {formatDate(selectedOrder.date)} at {selectedOrder.time}
                </p>
              </div>

              <div>
                <p className="text-xs mb-2 text-gray-500">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-800">{item.quantity}x {item.name}</span>
                      <span className="text-gray-800">₦{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.rider && (
                <div>
                  <p className="text-xs mb-1 text-gray-500">Rider</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedOrder.rider}</p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-800">₦{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="text-gray-800">₦{selectedOrder.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-base font-bold">
                  <span className="text-gray-800">Total Paid</span>
                  <span className="text-gray-800">₦{selectedOrder.total}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="w-full h-12 rounded-lg font-semibold mt-6 bg-gray-50 text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
