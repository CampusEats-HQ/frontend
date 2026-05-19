import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const orderHistory = [
  {
    id: 'ORD-1045',
    date: '2026-05-18',
    time: '14:30',
    restaurant: 'Mavise Grill',
    restaurantId: 'r1',
    items: [
      { name: 'Jollof Rice with Chicken', quantity: 2, price: 1200 },
      { name: 'Zobo', quantity: 1, price: 300 },
    ],
    total: 2700,
    deliveryFee: 300,
    status: 'delivered',
    rider: 'Emeka Okafor',
  },
  {
    id: 'ORD-1038',
    date: '2026-05-17',
    time: '19:15',
    restaurant: 'Jollof Palace',
    restaurantId: 'r2',
    items: [
      { name: 'Fried Rice Special', quantity: 1, price: 1500 },
      { name: 'Chicken Wings (6pcs)', quantity: 1, price: 800 },
    ],
    total: 2300,
    deliveryFee: 300,
    status: 'delivered',
    rider: 'Ngozi Adeyemi',
  },
  {
    id: 'ORD-1029',
    date: '2026-05-16',
    time: '13:45',
    restaurant: 'Suya Kingdom',
    restaurantId: 'r3',
    items: [
      { name: 'Beef Suya (Medium)', quantity: 1, price: 1800 },
      { name: 'Chapman', quantity: 1, price: 400 },
    ],
    total: 2200,
    deliveryFee: 300,
    status: 'delivered',
    rider: 'Ibrahim Sule',
  },
  {
    id: 'ORD-1018',
    date: '2026-05-15',
    time: '20:00',
    restaurant: 'Mavise Grill',
    restaurantId: 'r1',
    items: [
      { name: 'Jollof Rice with Chicken', quantity: 1, price: 1200 },
      { name: 'Moi Moi', quantity: 1, price: 200 },
    ],
    total: 1400,
    deliveryFee: 300,
    status: 'delivered',
    rider: 'Funke Daniels',
  },
  {
    id: 'ORD-1005',
    date: '2026-05-14',
    time: '12:30',
    restaurant: 'Eba & Egusi Spot',
    restaurantId: 'r4',
    items: [
      { name: 'Eba & Egusi Soup with Assorted', quantity: 1, price: 1000 },
    ],
    total: 1000,
    deliveryFee: 300,
    status: 'delivered',
    rider: 'Emeka Okafor',
  },
];

export default function OrderHistory() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      for (let i = 0; i < item.quantity; i++) {
        addItem({
          id: `${order.restaurantId}-${item.name}`,
          name: item.name,
          price: item.price,
          quantity: 1,
          restaurant: order.restaurant,
          image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=200&h=200&fit=crop',
        });
      }
    });
    toast.success(`${order.items.length} items added to cart!`);
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center border-b border-gray-200">
        <button onClick={() => navigate('/home')} className="mr-4">
          <ArrowLeft size={24} style={{ color: '#1F2937' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: '#1F2937' }}>
          Order History
        </h1>
      </div>

      {/* Orders List */}
      <div className="px-6 py-6 space-y-4 max-w-4xl mx-auto">
        {orderHistory.map((order) => (
          <div
            key={order.id}
            className="rounded-lg p-4 border"
            style={{ borderColor: '#E0E0E0' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base mb-1" style={{ color: '#1F2937' }}>
                  {order.restaurant}
                </p>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  {formatDate(order.date)} at {order.time} • {order.id}
                </p>
              </div>
              <span
                className="px-3 py-1 rounded text-xs font-medium whitespace-nowrap"
                style={{ backgroundColor: '#D1FAE5', color: '#10B981' }}
              >
                Delivered
              </span>
            </div>

            {/* Items */}
            <div className="mb-3 p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start mb-1 last:mb-0">
                  <p className="text-sm flex-1 min-w-0 break-words" style={{ color: '#1F2937' }}>
                    {item.quantity}x {item.name}
                  </p>
                  <p className="text-sm font-medium ml-2" style={{ color: '#1F2937' }}>
                    ₦{item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="border-t mt-2 pt-2" style={{ borderColor: '#E0E0E0' }}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: '#6B7280' }}>Subtotal</span>
                  <span style={{ color: '#1F2937' }}>₦{order.total}</span>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: '#6B7280' }}>Delivery Fee</span>
                  <span style={{ color: '#1F2937' }}>₦{order.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span style={{ color: '#1F2937' }}>Total</span>
                  <span style={{ color: '#1F2937' }}>₦{order.total + order.deliveryFee}</span>
                </div>
              </div>
            </div>

            <p className="text-xs mb-3" style={{ color: '#6B7280' }}>
              Delivered by {order.rider}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleReorder(order)}
                className="flex-1 h-10 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
                style={{ backgroundColor: '#6366F1', color: 'white' }}
              >
                <RotateCcw size={16} />
                Reorder
              </button>
              <button
                onClick={() => setSelectedOrder(order)}
                className="h-10 px-4 rounded-lg text-sm border flex items-center gap-1"
                style={{ borderColor: '#E0E0E0', color: '#6B7280' }}
              >
                Details
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}

        {orderHistory.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-semibold mb-2" style={{ color: '#1F2937' }}>
              No orders yet
            </p>
            <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
              Your order history will appear here
            </p>
            <button
              onClick={() => navigate('/home')}
              className="px-6 h-12 rounded-lg font-semibold"
              style={{ backgroundColor: '#6366F1', color: 'white' }}
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
              <h2 className="text-lg font-bold" style={{ color: '#1F2937' }}>
                Order Details
              </h2>
              <button onClick={() => setSelectedOrder(null)}>
                <span className="text-2xl" style={{ color: '#6B7280' }}>×</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Order ID</p>
                <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{selectedOrder.id}</p>
              </div>

              <div>
                <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Restaurant</p>
                <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{selectedOrder.restaurant}</p>
              </div>

              <div>
                <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Order Date & Time</p>
                <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
                  {formatDate(selectedOrder.date)} at {selectedOrder.time}
                </p>
              </div>

              <div>
                <p className="text-xs mb-2" style={{ color: '#6B7280' }}>Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span style={{ color: '#1F2937' }}>{item.quantity}x {item.name}</span>
                      <span style={{ color: '#1F2937' }}>₦{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Rider</p>
                <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{selectedOrder.rider}</p>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: '#E0E0E0' }}>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: '#6B7280' }}>Subtotal</span>
                  <span style={{ color: '#1F2937' }}>₦{selectedOrder.total}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: '#6B7280' }}>Delivery Fee</span>
                  <span style={{ color: '#1F2937' }}>₦{selectedOrder.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-base font-bold">
                  <span style={{ color: '#1F2937' }}>Total Paid</span>
                  <span style={{ color: '#1F2937' }}>₦{selectedOrder.total + selectedOrder.deliveryFee}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full h-12 rounded-lg font-semibold mt-6"
              style={{ backgroundColor: '#F8F9FA', color: '#1F2937' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
