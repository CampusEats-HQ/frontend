import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../../services/auth';

export default function RiderForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    authService.forgotPasswordRider({ email })
      .then(() => navigate('/rider/reset-password', { state: { email } }))
      .catch((err: any) => toast.error(err.message || 'Failed to send reset code'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-white px-5 py-6 max-w-[390px] mx-auto md:max-w-md">
      <button type="button" onClick={() => navigate('/rider/login')} className="mb-8" aria-label="Go back">
        <ArrowLeft size={24} className="text-indigo-500" />
      </button>

      <h1 className="text-2xl font-bold mb-1 text-gray-800">Forgot password?</h1>
      <p className="text-sm mb-8 text-gray-500">
        Enter your email and we'll send you a reset code.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[52px] px-4 rounded-lg bg-gray-50 mb-8"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Send Reset Code'}
        </button>
      </form>
    </div>
  );
}
