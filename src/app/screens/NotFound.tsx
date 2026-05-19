import { Link, useLocation } from 'react-router'
import { UtensilsCrossed } from 'lucide-react'

export default function NotFound() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 max-w-[390px] mx-auto md:max-w-md">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-6">
          <UtensilsCrossed size={40} style={{ color: '#E5E7EB' }} />
        </div>
        <p className="text-6xl font-bold mb-4" style={{ color: '#6366F1' }}>404</p>
        <h1 className="text-xl font-semibold mb-2" style={{ color: '#111827' }}>
          Page not found
        </h1>
        <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
          The page{' '}
          <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">
            {location.pathname}
          </span>{' '}
          doesn't exist.
        </p>
      </div>

      <div className="w-full pb-8">
        <Link
          to="/"
          className="w-full h-[52px] rounded-lg flex items-center justify-center font-semibold"
          style={{ backgroundColor: '#6366F1', color: 'white' }}
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
