import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '../services/auth';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email ?? '';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email not found. Please sign up again.');
      navigate('/signup');
      return;
    }
    setLoading(true);
    authService.verifyOtp({ email, otp })
      .then(() => navigate('/home'))
      .catch((err: any) => toast.error(err.message || 'Invalid or expired OTP'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-white px-5 py-6 max-w-[390px] mx-auto md:max-w-md">
      <button type="button" onClick={() => navigate('/signup')} className="mb-8" aria-label="Go back">
        <ArrowLeft size={24} className="text-indigo-500" />
      </button>

      <h1 className="text-2xl font-bold mb-1 text-gray-800">Verify your email</h1>
      <p className="text-sm mb-2 text-gray-500">
        We sent a 6-digit code to
      </p>
      <p className="text-sm font-semibold mb-8 text-gray-800">{email}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="w-full h-[52px] px-4 rounded-lg bg-gray-50 text-center text-2xl font-bold tracking-widest mb-8"
          maxLength={6}
          required
        />

        <button
          type="submit"
          disabled={loading || otp.length < 6}
          className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white disabled:opacity-60"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
}
