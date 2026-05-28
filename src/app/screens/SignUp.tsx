import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../services/auth';
import { PasswordInput } from '../components/ui/PasswordInput';

export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    authService.registerCustomer({ firstName, lastName, email, password })
      .then((res) => navigate('/verify-otp', { state: { email: res.email } }))
      .catch((err: any) => toast.error(err.message || 'Registration failed'))
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
            Food delivered wherever you are on campus.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="bg-white rounded-t-3xl md:rounded-none md:rounded-l-3xl
                      flex flex-col justify-center
                      px-6 py-10
                      md:w-[420px] md:px-12 md:min-h-screen md:shadow-2xl">
        <div className="md:max-w-xs md:mx-auto w-full">
          <button type="button" onClick={() => navigate(-1)} aria-label="Go back"
            className="mb-6 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ArrowLeft size={16} className="text-gray-600" />
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Create account 🎉</h2>
          <p className="text-gray-500 text-sm mb-8">Quick and easy, takes less than a minute.</p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">First name</label>
                  <input
                    type="text"
                    placeholder="Ada"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-[52px] px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 transition-colors"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Last name</label>
                  <input
                    type="text"
                    placeholder="Obi"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-[52px] px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 transition-colors"
                    required
                  />
                </div>
              </div>

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
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[52px] px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-indigo-400 transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] rounded-xl font-semibold mb-4 bg-indigo-600 text-white shadow-md shadow-indigo-200 disabled:opacity-60 transition-opacity"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-600">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
