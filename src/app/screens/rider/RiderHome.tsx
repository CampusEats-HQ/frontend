import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { User } from 'lucide-react';
import { useRider } from '../../context/RiderContext';
import { riderService } from '../../services/rider';
import { getToken, WS_URL } from '../../lib/api';
import { toast } from 'sonner';

export default function RiderHome() {
  const { rider, isOnline, toggleOnline, hasIncomingOrder, setHasIncomingOrder, activeDelivery, setActiveDelivery } =
    useRider();

  const [stats, setStats] = useState({
    deliveriesToday: 0,
    earningsToday: 0,
    rating: 0,
    earningsThisWeek: 0,
  });
  const [loading, setLoading] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    riderService
      .getStats()
      .then((res) => setStats(res))
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  const openWebSocket = () => {
    const token = getToken();
    if (!token) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'auth', token }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'order.assigned') {
          setActiveDelivery(data.order ?? null);
          setHasIncomingOrder(true);
        } else if (data.type === 'order.taken') {
          setHasIncomingOrder(false);
        }
      } catch {
        // ignore parse errors
      }
    };

    ws.onerror = () => {
      toast.error('Connection error');
    };

    ws.onclose = () => {
      wsRef.current = null;
    };
  };

  const closeWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const handleToggleOnline = async () => {
    try {
      await riderService.setOnlineStatus(!isOnline);
      toggleOnline();
      if (!isOnline) {
        openWebSocket();
      } else {
        closeWebSocket();
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to update status');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      closeWebSocket();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
                {rider?.name ?? 'Rider'}
              </p>
              <p className="text-xs text-gray-500">
                ⭐ {stats.rating}
              </p>
            </div>
          </Link>

          {/* Online/Offline Toggle - MOST IMPORTANT */}
          <button
            type="button"
            onClick={handleToggleOnline}
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
                {stats.deliveriesToday}
              </p>
              <p className="text-xs text-gray-500">
                Today
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <p className="text-2xl font-bold mb-1 text-emerald-500">
                ₦{stats.earningsToday}
              </p>
              <p className="text-xs text-gray-500">
                Earned
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <p className="text-2xl font-bold mb-1 text-amber-500">
                {stats.rating}
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
          </div>

          {isOnline ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Waiting for new orders...</p>
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
                  ₦{stats.earningsThisWeek.toLocaleString()}
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
                New order incoming!
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
