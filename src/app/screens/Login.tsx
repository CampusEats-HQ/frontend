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

      {/* Blue section — full screen on mobile, left panel on desktop */}
      <div className="relative bg-indigo-600 flex flex-col px-8 py-14 overflow-hidden
                      flex-1 md:flex-1 md:min-h-screen md:items-center md:justify-center">
        {/* Decorative blobs only */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white opacity-5" />
        <div className="absolute top-16 right-6 w-20 h-20 rounded-full bg-amber-400 opacity-20" />
        <div className="absolute -bottom-10 -left-8 w-40 h-40 rounded-full bg-indigo-500 opacity-50" />

        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-0">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 flex items-center justify-center shadow-2xl mb-6">
            <UtensilsCrossed size={36} color="white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">CampusEats</h1>
          <p className="text-indigo-200 text-base leading-relaxed max-w-xs">
            Hot food, fast delivery. Wherever you are on campus.
          </p>
        </div>

        {/* Form — mobile only, inside blue section */}
        <div className="md:hidden w-full max-w-sm mx-auto">
          <form onSubmit={handleSubmit} className="mb-5">
            <div className="space-y-3 mb-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[52px] px-4 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                required
              />
              <PasswordInput
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[52px] px-4 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none transition-all"
                required
              />
            </div>
            <div className="text-right mb-5">
              <Link to="/forgot-password" className="text-sm text-indigo-200 hover:text-white">Forgot password?</Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] rounded-xl font-semibold bg-white text-indigo-600 disabled:opacity-60"
            >
              {loading ? 'Logging in…' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-sm text-indigo-200">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-white underline">Sign up free</Link>
          </p>

          <div className="mt-6 pt-4 border-t border-white border-opacity-20 text-center">
            <Link to="/rider/login" className="text-xs text-indigo-300 hover:text-white transition-colors">
              Are you a rider? <span className="underline">Log in here</span>
            </Link>
          </div>
        </div>
      </div>

      {/* White form panel — desktop only */}
      <div className="hidden md:flex flex-col justify-center bg-white rounded-l-3xl
                      w-[420px] px-12 py-16 min-h-screen shadow-2xl">
        <div className="max-w-xs mx-auto w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h2>
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
              className="w-full h-[52px] rounded-xl font-semibold bg-indigo-600 text-white shadow-md shadow-indigo-200 disabled:opacity-60"
            >
              {loading ? 'Logging in…' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mb-8">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-indigo-600">Sign up free</Link>
          </p>

          <div className="pt-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-2">
              <Link to="/vendor/login" className="text-center text-xs font-medium py-2 rounded-lg bg-gray-50 text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 transition-colors">Vendor</Link>
              <Link to="/rider/login" className="text-center text-xs font-medium py-2 rounded-lg bg-gray-50 text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 transition-colors">Rider</Link>
              <Link to="/admin/login" className="text-center text-xs font-medium py-2 rounded-lg bg-gray-50 text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
