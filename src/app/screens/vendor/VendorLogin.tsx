import { useNavigate } from 'react-router';
import { Store } from 'lucide-react';

export default function VendorLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/vendor/dashboard');
  };

  return (
    <div className="min-h-screen bg-white px-5 py-12 max-w-[480px] mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Store size={24} className="text-indigo-500" />
        <h1 className="text-xl font-bold text-gray-800">
          CampusEats Vendor
        </h1>
      </div>
      <p className="text-sm mb-12 text-gray-500">
        Restaurant Owner Portal
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-8">
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
          Log In
        </button>

        <p className="text-center text-sm text-gray-500">
          Need help?{' '}
          <a href="#" className="font-medium text-indigo-500">
            Contact CampusEats support
          </a>
        </p>
      </form>
    </div>
  );
}
