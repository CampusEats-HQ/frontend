import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../services/auth';

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
    <div className="min-h-screen bg-white px-5 py-6 max-w-[390px] mx-auto md:max-w-md">
      <button type="button" onClick={() => navigate(-1)} className="mb-8" aria-label="Go back">
        <ArrowLeft size={24} className="text-indigo-500" />
      </button>

      <h1 className="text-2xl font-bold mb-1 text-gray-800">
        Create account
      </h1>
      <p className="text-sm mb-8 text-gray-500">
        Quick and easy
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
              required
            />
          </div>
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
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-500">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
