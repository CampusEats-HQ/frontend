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
          <input
            type="text"
            placeholder="Full name"
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[52px] px-4 rounded-lg bg-gray-50"
          />
        </div>

        <button
          type="submit"
          className="w-full h-[52px] rounded-lg font-semibold mb-4 bg-indigo-500 text-white"
        >
          Create Account
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
