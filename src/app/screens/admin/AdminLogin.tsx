import { useNavigate } from 'react-router';
import { Shield } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-5">
      <div className="max-w-[400px] w-full">
        <div className="text-center mb-8">
          <Shield size={48} style={{ color: '#6366F1', margin: '0 auto 16px' }} />
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#1F2937' }}>
            CampusEats Admin
          </h1>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Internal Portal
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[52px] px-4 rounded-lg border"
              style={{ borderColor: '#E0E0E0' }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-[52px] px-4 rounded-lg border"
              style={{ borderColor: '#E0E0E0' }}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-[52px] rounded-lg font-semibold mb-6"
            style={{ backgroundColor: '#6366F1', color: 'white' }}
          >
            Log In
          </button>
        </form>

        <p className="text-xs text-center" style={{ color: '#6B7280' }}>
          CampusEats Internal — Unauthorized access is prohibited
        </p>
      </div>
    </div>
  );
}
