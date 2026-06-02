import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { toast } from 'sonner';
import { authService } from '../../services/auth';

export default function RiderResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email ?? '';

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Session expired. Please start again.');
      navigate('/rider/forgot-password');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    authService.resetPasswordRider({ email, otp, newPassword })
      .then(() => {
        toast.success('Password reset successfully');
        navigate('/rider/login');
      })
      .catch((err: any) => toast.error(err.message || 'Invalid or expired code'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-white px-5 py-6 max-w-[390px] mx-auto md:max-w-md">
      <button type="button" onClick={() => navigate('/rider/forgot-password')} className="mb-8" aria-label="Go back">
        <ArrowLeft size={24} className="text-indigo-500" />
      </button>

      <h1 className="text-2xl font-bold mb-1 text-gray-800">Reset password</h1>
      <p className="text-sm mb-2 text-gray-500">Enter the code sent to</p>
      <p className="text-sm font-semibold mb-8 text-gray-800">{email}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="w-full h-[52px] px-4 rounded-lg bg-gray-50 text-center text-2xl font-bold tracking-widest"
          maxLength={6}
          required
        />
        <PasswordInput
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
          required
        />
        <PasswordInput
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
          required
        />
        <button
          type="submit"
          disabled={loading || otp.length < 6}
          className="w-full h-[52px] rounded-lg font-semibold bg-indigo-500 text-white disabled:opacity-60"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}
