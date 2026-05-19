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
        <UtensilsCrossed size={32} className="text-amber-500" />
      </div>

      <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
        Welcome back
      </h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-4 mb-2">
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

        <div className="text-right mb-6">
          <Link to="/login" className="text-sm text-gray-500">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full h-[52px] rounded-lg font-semibold mb-4 bg-indigo-500 text-white"
        >
          Log In
        </button>
      </form>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-500">
          or
        </span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <button
        type="button"
        className="w-full h-[52px] rounded-lg font-medium border border-gray-200 text-gray-800"
      >
        Continue with Google
      </button>
    </div>
  );
}
