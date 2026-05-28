import { Link } from 'react-router';
import { UtensilsCrossed } from 'lucide-react';

export default function Splash() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Hero — full screen on mobile, left panel on desktop */}
      <div className="relative bg-indigo-600 flex flex-col items-center justify-center px-8 py-16 overflow-hidden
                      flex-1 md:flex-1 md:min-h-screen">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white opacity-5" />
        <div className="absolute top-16 right-6 w-20 h-20 rounded-full bg-amber-400 opacity-20" />
        <div className="absolute -bottom-10 -left-8 w-40 h-40 rounded-full bg-indigo-500 opacity-50" />
        <div className="absolute bottom-10 right-12 w-14 h-14 rounded-full bg-white opacity-10" />

        {/* Floating food bubbles */}
        <div className="absolute top-10 left-8 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl shadow-lg">🍛</div>
        <div className="absolute top-24 right-8 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl shadow-lg">🌯</div>
        <div className="absolute bottom-32 right-6 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl shadow-lg">🍗</div>
        <div className="absolute bottom-48 left-6 w-12 h-12 rounded-2xl bg-white bg-opacity-15 flex items-center justify-center text-xl shadow-lg">🥤</div>

        {/* Logo + tagline */}
        <div className="relative z-10 flex flex-col items-center text-center mb-12 md:mb-0">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 flex items-center justify-center shadow-2xl mb-6">
            <UtensilsCrossed size={36} color="white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">CampusEats</h1>
          <p className="text-indigo-200 text-base md:text-lg text-center leading-relaxed max-w-xs">
            Hot food, fast delivery. Wherever you are on campus.
          </p>
        </div>

        {/* CTA buttons — visible only on mobile, inside the blue section */}
        <div className="relative z-10 w-full max-w-xs md:hidden">
          <Link
            to="/signup"
            className="w-full h-[52px] rounded-xl flex items-center justify-center font-semibold mb-3 bg-white text-indigo-600"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="w-full h-[52px] rounded-xl flex items-center justify-center font-semibold border-2 border-white border-opacity-50 text-white mb-6"
          >
            Log in
          </Link>

          <div className="h-px bg-white opacity-20 mb-3" />

          <div className="grid grid-cols-3">
            <Link to="/vendor/login" className="text-center text-xs font-medium py-2 text-white opacity-60 hover:opacity-100 transition-opacity">Vendor</Link>
            <Link to="/rider/signup" className="text-center text-xs font-medium py-2 text-white opacity-60 hover:opacity-100 transition-opacity">Rider</Link>
            <Link to="/admin/login" className="text-center text-xs font-medium py-2 text-white opacity-60 hover:opacity-100 transition-opacity">Admin</Link>
          </div>
        </div>
      </div>

      {/* CTA panel — desktop only (right side) */}
      <div className="hidden md:flex flex-col justify-center
                      bg-white rounded-l-3xl
                      w-[420px] px-12 py-16 min-h-screen shadow-2xl">
        <div className="max-w-xs mx-auto w-full">
          <div className="mb-8">
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
            <Link to="/vendor/login" className="text-center text-xs font-medium py-2 text-gray-400 hover:text-indigo-500 transition-colors">Vendor</Link>
            <Link to="/rider/signup" className="text-center text-xs font-medium py-2 text-gray-400 hover:text-indigo-500 transition-colors">Rider</Link>
            <Link to="/admin/login" className="text-center text-xs font-medium py-2 text-gray-400 hover:text-indigo-500 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
