import { useNavigate } from 'react-router';
import { Shield } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-5">
      <div className="max-w-[400px] w-full">
        <div className="text-center mb-8">
          <Shield size={48} className="text-indigo-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            CampusEats Admin
          </h1>
          <p className="text-sm text-gray-500">
            Internal Portal
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[52px] px-4 rounded-lg border border-gray-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-[52px] px-4 rounded-lg border border-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-[52px] rounded-lg font-semibold mb-6 bg-indigo-500 text-white"
          >
            Log In
          </button>
        </form>

        <p className="text-xs text-center text-gray-500">
          CampusEats Internal — Unauthorized access is prohibited
        </p>
      </div>
    </div>
  );
}
