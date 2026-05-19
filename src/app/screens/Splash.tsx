import { Link } from 'react-router';
import { UtensilsCrossed } from 'lucide-react';

export default function Splash() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 max-w-[390px] mx-auto md:max-w-md">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <UtensilsCrossed size={32} style={{ color: '#F59E0B' }} />
        </div>
        <h1 className="text-[28px] font-bold mb-2" style={{ color: '#6366F1' }}>
          CampusEats
        </h1>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Unilag's fastest food delivery
        </p>
      </div>

      <div className="w-full pb-8">
        <Link
          to="/home"
          className="w-full h-[52px] rounded-lg flex items-center justify-center font-semibold mb-4"
          style={{ backgroundColor: '#6366F1', color: 'white' }}
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="block text-center font-medium mb-4"
          style={{ color: '#6366F1' }}
        >
          Log in
        </Link>
        <div className="h-px mb-4" style={{ backgroundColor: '#E0E0E0' }} />
        <div className="grid grid-cols-3 gap-2">
          <Link
            to="/vendor/login"
            className="text-center text-xs font-medium py-2"
            style={{ color: '#6B7280' }}
          >
            Vendor
          </Link>
          <Link
            to="/rider/signup"
            className="text-center text-xs font-medium py-2"
            style={{ color: '#6B7280' }}
          >
            Rider
          </Link>
          <Link
            to="/admin/login"
            className="text-center text-xs font-medium py-2"
            style={{ color: '#6B7280' }}
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
