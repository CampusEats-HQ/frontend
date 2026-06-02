import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { useRider } from '../../context/RiderContext';
import { toast } from 'sonner';
import { authService } from '../../services/auth';

export default function RiderLogin() {
  const navigate = useNavigate();
  const { login } = useRider();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.loginRider({ email, password });
      login(res.rider);
      toast.success(`Welcome back, ${res.rider.name}!`);
      navigate('/rider/home');
    } catch (err: any) {
      toast.error(err?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 flex items-center border-b border-gray-200">
        <button type="button" onClick={() => navigate('/')} className="mr-4" aria-label="Go back">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Rider Login
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-indigo-500">
              <span className="text-4xl">🏍️</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Welcome Back, Rider!
            </h2>
            <p className="text-sm text-gray-500">
              Login to start accepting deliveries
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 px-4 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-800">
                Password
              </label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div className="text-right">
              <Link to="/rider/forgot-password" className="text-sm text-indigo-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg font-semibold bg-indigo-500 text-white disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/rider/signup')}
                className="font-semibold text-indigo-500"
              >
                Sign up as a rider
              </button>
            </p>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-gray-50">
            <p className="text-xs text-center text-gray-500">
              Only approved riders can login. Check your email for approval status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
