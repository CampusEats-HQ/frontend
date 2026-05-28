import { Link } from 'react-router';
import { UtensilsCrossed } from 'lucide-react';

export default function Splash() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── Left / Top — branded hero ── */}
      <div className="relative bg-indigo-600 flex flex-col items-center justify-center px-8 py-16 overflow-hidden
                      md:flex-1 md:min-h-screen">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white opacity-5" />
        <div className="absolute top-16 right-6 w-20 h-20 rounded-full bg-amber-400 opacity-20" />
        <div className="absolute -bottom-10 -left-8 w-40 h-40 rounded-full bg-indigo-500 opacity-50" />
        <div className="absolute bottom-10 right-12 w-14 h-14 rounded-full bg-white opacity-10" />

        {/* Floating food bubbles */}
        <div className="absolute top-10 left-8 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl shadow-lg">
          🍛
        </div>
        <div className="absolute top-24 right-8 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl shadow-lg">
          🌯
        </div>
        <div className="absolute bottom-20 right-6 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl shadow-lg md:right-12">
          🍗
        </div>
        <div className="absolute bottom-32 left-6 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl shadow-lg">
          🥤
        </div>

        {/* Logo + copy */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 flex items-center justify-center shadow-2xl mb-6">
            <UtensilsCrossed size={36} color="white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">CampusEats</h1>
          <p className="text-indigo-200 text-base md:text-lg text-center leading-relaxed max-w-xs">
            Hot food, fast delivery. Wherever you are on campus.
          </p>
        </div>
      </div>

      {/* ── Right / Bottom — CTA panel ── */}
      <div className="bg-white rounded-t-3xl md:rounded-none md:rounded-l-3xl
                      flex flex-col justify-center
                      px-6 py-10
                      md:w-[420px] md:px-12 md:py-16 md:min-h-screen md:shadow-2xl">

        <div className="md:max-w-xs md:mx-auto w-full">
          {/* Desktop-only heading */}
          <div className="hidden md:block mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome to CampusEats</h2>
            <p className="text-gray-500 text-sm">Order food from your favourite campus vendors.</p>
          </div>

          <Link
            to="/signup"
            className="w-full h-[52px] rounded-xl flex items-center justify-center font-semibold mb-3 bg-indigo-600 text-white shadow-md shadow-indigo-200"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="w-full h-[52px] rounded-xl flex items-center justify-center font-semibold border border-gray-200 text-gray-700 mb-8 hover:bg-gray-50 transition-colors"
          >
            Log in
          </Link>

          <div className="h-px mb-4 bg-gray-100" />

          <div className="grid grid-cols-3 gap-2">
            <Link to="/vendor/login" className="text-center text-xs font-medium py-2 text-gray-400 hover:text-indigo-500 transition-colors">
              Vendor
            </Link>
            <Link to="/rider/signup" className="text-center text-xs font-medium py-2 text-gray-400 hover:text-indigo-500 transition-colors">
              Rider
            </Link>
            <Link to="/admin/login" className="text-center text-xs font-medium py-2 text-gray-400 hover:text-indigo-500 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
