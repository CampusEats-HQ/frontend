import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UtensilsCrossed } from 'lucide-react';
import { PasswordInput } from '../components/ui/PasswordInput';
import { toast } from 'sonner';
import { authService } from '../services/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    authService.loginCustomer({ email, password })
      .then(() => navigate('/home'))
      .catch((err: Error) => toast.error(err.message || 'Login failed'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Branded hero */}
      <div className="relative bg-indigo-600 flex flex-col items-center justify-center px-8 py-14 overflow-hidden
                      md:flex-1 md:min-h-screen">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white opacity-5" />
        <div className="absolute top-16 right-6 w-20 h-20 rounded-full bg-amber-400 opacity-20" />
        <div className="absolute -bottom-10 -left-8 w-40 h-40 rounded-full bg-indigo-500 opacity-50" />
        <div className="absolute top-10 left-8 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl">🍛</div>
        <div className="absolute top-24 right-8 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl">🌯</div>
        <div className="absolute bottom-20 right-6 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl">🍗</div>
        <div className="absolute bottom-32 left-6 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl">🥤</div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 flex items-center justify-center shadow-2xl mb-6">
            <UtensilsCrossed size={36} color="white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">CampusEats</h1>
          <p className="text-indigo-200 text-base leading-relaxed max-w-xs">
            Hot food, fast delivery. Wherever you are on campus.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="bg-white rounded-t-3xl md:rounded-none md:rounded-l-3xl
                      flex flex-col justify-center
                      px-6 py-10
                      md:w-[420px] md:px-12 md:min-h-screen md:shadow-2xl">
        <div className="md:max-w-xs md:mx-auto w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back 👋</h2>
          <p className="text-gray-500 text-sm mb-8">Log in to your account to continue.</p>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="space-y-4 mb-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[52px] px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Password</label>
                <PasswordInput
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[52px] px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="text-right mb-6">
              <Link to="/forgot-password" className="text-sm font-medium text-indigo-500">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] rounded-xl font-semibold mb-4 bg-indigo-600 text-white shadow-md shadow-indigo-200 disabled:opacity-60 transition-opacity"
            >
              {loading ? 'Logging in…' : 'Log In'}
            </button>
          </form>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button
            type="button"
            className="w-full h-[52px] rounded-xl font-medium border border-gray-200 text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-indigo-600">Sign up free</Link>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400 mb-3">Other portals</p>
            <div className="grid grid-cols-3 gap-2">
              <Link to="/vendor/login" className="text-center text-xs font-medium py-2 rounded-lg bg-gray-50 text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 transition-colors">
                Vendor
              </Link>
              <Link to="/rider/login" className="text-center text-xs font-medium py-2 rounded-lg bg-gray-50 text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 transition-colors">
                Rider
              </Link>
              <Link to="/admin/login" className="text-center text-xs font-medium py-2 rounded-lg bg-gray-50 text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
