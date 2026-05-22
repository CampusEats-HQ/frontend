import { Link } from 'react-router';
import { UtensilsCrossed } from 'lucide-react';

export default function Splash() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 max-w-[390px] mx-auto md:max-w-md">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <UtensilsCrossed size={32} className="text-amber-500" />
        </div>
        <h1 className="text-[28px] font-bold mb-2 text-indigo-500">
          CampusEats
        </h1>
        <p className="text-sm text-gray-500">
          Unilag's fastest food delivery
        </p>
      </div>

      <div className="w-full pb-8">
        <Link
          to="/signup"
          className="w-full h-[52px] rounded-lg flex items-center justify-center font-semibold mb-4 bg-indigo-500 text-white"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="block text-center font-medium mb-4 text-indigo-500"
        >
          Log in
        </Link>
        <div className="h-px mb-4 bg-gray-200" />
        <div className="grid grid-cols-3 gap-2">
          <Link
            to="/vendor/login"
            className="text-center text-xs font-medium py-2 text-gray-500"
          >
            Vendor
          </Link>
          <Link
            to="/rider/signup"
            className="text-center text-xs font-medium py-2 text-gray-500"
          >
            Rider
          </Link>
          <Link
            to="/admin/login"
            className="text-center text-xs font-medium py-2 text-gray-500"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
