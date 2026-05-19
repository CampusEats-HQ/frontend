import { Link } from 'react-router';
import { User } from 'lucide-react';
import { useRider } from '../../context/RiderContext';
import { riderStats } from '../../data/riderMockData';

export default function RiderHome() {
  const { isOnline, toggleOnline, hasIncomingOrder, setHasIncomingOrder, activeDelivery } =
    useRider();

  // Simulate incoming order when online (for demo)
  const handleTestIncomingOrder = () => {
    if (isOnline) {
      setHasIncomingOrder(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto">
        {/* Top Bar */}
        <div className="px-5 py-6 flex items-center justify-between">
          <Link to="/rider/profile" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-500">
              <User size={24} color="white" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">
                Emeka Okafor
              </p>
              <p className="text-xs text-gray-500">
                ⭐ {riderStats.rating}
              </p>
            </div>
          </Link>

          {/* Online/Offline Toggle - MOST IMPORTANT */}
          <button
            type="button"
            onClick={toggleOnline}
            className={`px-6 py-3 rounded-full font-bold text-base text-white ${isOnline ? 'bg-emerald-500' : 'bg-gray-300'}`}
          >
            {isOnline ? 'Online' : 'Offline'}
          </button>
        </div>

        {/* Status Message */}
        <div className="px-5 mb-6">
          <p className="text-center text-sm text-gray-500">
            {isOnline
              ? "You're live — waiting for orders nearby"
              : "You're offline — go online to start earning"}
          </p>
        </div>

        {/* Stats Row */}
        <div className="px-5 mb-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <p className="text-2xl font-bold mb-1 text-gray-800">
                {riderStats.deliveriesToday}
              </p>
              <p className="text-xs text-gray-500">
                Today
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <p className="text-2xl font-bold mb-1 text-emerald-500">
                ₦{riderStats.earningsToday}
              </p>
              <p className="text-xs text-gray-500">
                Earned
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <p className="text-2xl font-bold mb-1 text-amber-500">
                {riderStats.rating}
              </p>
              <p className="text-xs text-gray-500">
                Rating
              </p>
            </div>
          </div>
        </div>

        {/* Recent Deliveries */}
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">
              Recent Deliveries
            </h2>
            {isOnline && !activeDelivery && (
              <button
                type="button"
                onClick={handleTestIncomingOrder}
                className="px-3 py-1 rounded-lg text-xs bg-indigo-500 text-white"
              >
                Test Order
              </button>
            )}
          </div>

          {isOnline ? (
            <div className="space-y-3">
              <div className="rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Mavise Grill → Fabian House
                  </p>
                  <p className="text-sm font-bold text-emerald-500">
                    ₦300
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  Completed 2h ago
                </p>
              </div>
              <div className="rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Jollof Palace → Jaja Hostel
                  </p>
                  <p className="text-sm font-bold text-emerald-500">
                    ₦300
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  Completed 3h ago
                </p>
              </div>
              <div className="rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Suya Kingdom → Engineering Faculty
                  </p>
                  <p className="text-sm font-bold text-emerald-500">
                    ₦300
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  Completed 4h ago
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Go online to start receiving orders</p>
            </div>
          )}
        </div>

        {/* Earnings Summary */}
        <div className="px-5">
          <div className="rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs mb-1 text-gray-500">
                  This week
                </p>
                <p className="text-xl font-bold text-gray-800">
                  ₦{riderStats.earningsThisWeek.toLocaleString()}
                </p>
              </div>
              <Link
                to="/rider/earnings"
                className="text-sm font-medium text-indigo-500"
              >
                View History
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Incoming Order Overlay */}
      {hasIncomingOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setHasIncomingOrder(false)}
        >
          <div
            className="max-w-[390px] w-full mx-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl p-6">
              <p className="text-center text-sm text-gray-500">
                Order alert would appear here
              </p>
              <Link
                to="/rider/order-alert"
                className="block w-full h-[52px] rounded-lg font-semibold flex items-center justify-center mt-4 bg-indigo-500 text-white"
                onClick={() => setHasIncomingOrder(false)}
              >
                View Order Alert
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
