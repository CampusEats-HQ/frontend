import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { riderService, EarningsHistoryEntry } from '../../services/rider';
import { toast } from 'sonner';

export default function RiderEarnings() {
  const navigate = useNavigate();
  const [earningsThisWeek, setEarningsThisWeek] = useState(0);
  const [history, setHistory] = useState<EarningsHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    riderService
      .getEarnings()
      .then((res) => {
        setEarningsThisWeek(res.earningsThisWeek);
        setHistory(res.history);
      })
      .catch(() => toast.error('Failed to load earnings'))
      .finally(() => setLoading(false));
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
        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-4 border-b border-gray-100">
          <button type="button" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={24} className="text-indigo-500" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            Earnings
          </h1>
        </div>

        <div className="px-5 py-6">
          {/* This Week Summary */}
          <div className="rounded-xl p-6 mb-6 bg-indigo-500">
            <p className="text-sm mb-2 text-white/80">
              This Week
            </p>
            <p className="text-3xl font-bold text-white mb-1">
              ₦{earningsThisWeek.toLocaleString()}
            </p>
            <p className="text-sm text-white/80">
              From {history.reduce((sum, e) => sum + e.deliveries, 0)} deliveries
            </p>
          </div>

          {/* History */}
          <h2 className="text-sm font-semibold mb-4 text-gray-800">
            Recent Earnings
          </h2>

          {history.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-8">No earnings history yet</p>
          ) : (
            <div className="space-y-3">
              {history.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-sm mb-1 text-gray-800">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {entry.deliveries} deliveries
                    </p>
                  </div>
                  <p className="font-bold text-emerald-500">
                    ₦{entry.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Payout Info */}
          <div className="mt-8 p-4 rounded-lg bg-amber-100">
            <p className="text-xs text-amber-800">
              💰 Earnings are paid out every Friday to your registered bank account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
