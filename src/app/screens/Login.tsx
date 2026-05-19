import { Link, useNavigate } from 'react-router';
import { UtensilsCrossed } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white px-5 py-12 max-w-[390px] mx-auto md:max-w-md">
      <div className="flex justify-center mb-8">
        <UtensilsCrossed size={32} style={{ color: '#F59E0B' }} />
      </div>

      <h1 className="text-2xl font-bold mb-8 text-center" style={{ color: '#1F2937' }}>
        Welcome back
      </h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-4 mb-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
          />
        </div>

        <div className="text-right mb-6">
          <Link to="/login" className="text-sm" style={{ color: '#6B7280' }}>
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full h-[52px] rounded-lg font-semibold mb-4"
          style={{ backgroundColor: '#6366F1', color: 'white' }}
        >
          Log In
        </button>
      </form>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px" style={{ backgroundColor: '#E0E0E0' }}></div>
        <span className="text-sm" style={{ color: '#6B7280' }}>
          or
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: '#E0E0E0' }}></div>
      </div>

      <button
        className="w-full h-[52px] rounded-lg font-medium border"
        style={{ borderColor: '#E0E0E0', color: '#1F2937' }}
      >
        Continue with Google
      </button>
    </div>
  );
}
