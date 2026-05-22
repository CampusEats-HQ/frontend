import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Store } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../../services/auth';

export default function VendorLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    authService.loginVendor({ email, password })
      .then(() => navigate('/vendor/dashboard'))
      .catch((err: Error) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-white px-5 py-12 max-w-[480px] mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Store size={24} className="text-indigo-500" />
        <h1 className="text-xl font-bold text-gray-800">
          CampusEats Vendor
        </h1>
      </div>
      <p className="text-sm mb-12 text-gray-500">
        Restaurant Owner Portal
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-8">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[52px] rounded-lg font-semibold mb-4 bg-indigo-500 text-white disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <p className="text-center text-sm text-gray-500">
          Need help?{' '}
          <a href="#" className="font-medium text-indigo-500">
            Contact CampusEats support
          </a>
        </p>
      </form>
    </div>
  );
}
