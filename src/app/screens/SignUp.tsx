import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white px-5 py-6 max-w-[390px] mx-auto md:max-w-md">
      <button onClick={() => navigate(-1)} className="mb-8">
        <ArrowLeft size={24} style={{ color: '#6366F1' }} />
      </button>

      <h1 className="text-2xl font-bold mb-1" style={{ color: '#1F2937' }}>
        Create account
      </h1>
      <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
        Quick and easy
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Full name"
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
          />
          <input
            type="email"
            placeholder="Unilag email"
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[52px] px-4 rounded-lg"
            style={{ backgroundColor: '#F8F9FA' }}
          />
          <div>
            <label className="text-xs mb-1 block" style={{ color: '#6B7280' }}>
              Optional
            </label>
            <input
              type="text"
              placeholder="Matric number"
              className="w-full h-[52px] px-4 rounded-lg"
              style={{ backgroundColor: '#F8F9FA' }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-[52px] rounded-lg font-semibold mb-4"
          style={{ backgroundColor: '#6366F1', color: 'white' }}
        >
          Create Account
        </button>

        <p className="text-center text-sm" style={{ color: '#6B7280' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-medium" style={{ color: '#6366F1' }}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
