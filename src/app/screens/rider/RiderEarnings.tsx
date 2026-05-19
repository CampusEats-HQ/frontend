import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { riderStats, earningsHistory } from '../../data/riderMockData';

export default function RiderEarnings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto">
        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-4 border-b border-gray-100">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} style={{ color: '#6366F1' }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: '#1F2937' }}>
            Earnings
          </h1>
        </div>

        <div className="px-5 py-6">
          {/* This Week Summary */}
          <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: '#6366F1' }}>
            <p className="text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              This Week
            </p>
            <p className="text-3xl font-bold text-white mb-1">
              ₦{riderStats.earningsThisWeek.toLocaleString()}
            </p>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              From {riderStats.deliveriesToday} deliveries
            </p>
          </div>

          {/* History */}
          <h2 className="text-sm font-semibold mb-4" style={{ color: '#1F2937' }}>
            Recent Earnings
          </h2>

          <div className="space-y-3">
            {earningsHistory.map((entry, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: '#F8F9FA' }}
              >
                <div>
                  <p className="font-medium text-sm mb-1" style={{ color: '#1F2937' }}>
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    {entry.deliveries} deliveries
                  </p>
                </div>
                <p className="font-bold" style={{ color: '#10B981' }}>
                  ₦{entry.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Payout Info */}
          <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
            <p className="text-xs" style={{ color: '#92400E' }}>
              💰 Earnings are paid out every Friday to your registered bank account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
