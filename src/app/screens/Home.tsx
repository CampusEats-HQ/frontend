import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router';
import { MapPin, Search, ShoppingCart, Home as HomeIcon, SearchIcon, Package, User, Plus } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { categories } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { restaurantService } from '../services/restaurants';
import type { Restaurant, PopularItem } from '../services/restaurants';
import { api } from '../lib/api';
import type { Promo } from '../services/admin';
import { profileService } from '../services/orders';

const FALLBACK_SLIDES: Promo[] = [
  { id: '1', bg: 'from-amber-100 to-[#FDE68A]', emoji: '🔥', title: 'Delivered in 20 mins', subtitle: 'Hot & fresh to your hostel', active: true },
  { id: '2', bg: 'from-indigo-100 to-[#C7D2FE]', emoji: '🍛', title: '20% off orders above ₦2,000', subtitle: 'Today only — select restaurants', active: true },
  { id: '3', bg: 'from-emerald-100 to-[#A7F3D0]', emoji: '🎁', title: 'Refer a friend', subtitle: 'You both get ₦200 off your next order', active: true },
];

function formatHour(t: string) {
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { getItemCount, addItem } = useCart();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);
  const [promoSlides, setPromoSlides] = useState<Promo[]>(FALLBACK_SLIDES);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [firstName, setFirstName] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    autoPlayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    api.get<{ promos: Promo[] }>('/restaurants/promos')
      .then((res) => {
        if (res.promos.length > 0) setPromoSlides(res.promos);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    profileService.get()
      .then((res) => setFirstName(res.firstName))
      .catch(() => {});
  }, []);

  useEffect(() => {
    Promise.all([
      restaurantService.getAll(),
      restaurantService.getPopularItems(),
    ])
      .then(([restaurantsRes, popularRes]) => {
        const sorted = [...restaurantsRes.restaurants].sort((a, b) =>
          a.sponsored === b.sponsored ? 0 : a.sponsored ? -1 : 1
        );
        setRestaurants(sorted);
        setPopularItems(popularRes.items);
      })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  const visibleRestaurants = restaurants.filter((r) => r.openingTime !== null || r.closingTime !== null);

  const filteredRestaurants = activeCategory === 'All'
    ? visibleRestaurants
    : visibleRestaurants.filter((r) => r.category?.toLowerCase().includes(activeCategory.toLowerCase()));

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto md:max-w-4xl pb-20">
        {/* Top Bar */}
        <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-indigo-500" />
            <span className="text-sm font-semibold text-gray-800">Unilag, Yaba</span>
          </div>
          <Link to="/cart" className="relative">
            <ShoppingCart size={20} className="text-indigo-500" />
            {getItemCount() > 0 && (
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
            )}
          </Link>
        </div>

        {/* Greeting */}
        <div className="px-5 pt-4 pb-1">
          <p className="text-xs text-gray-400 mb-0.5">{getGreeting()}</p>
          <h1 className="text-xl font-bold text-gray-900">{firstName ?? 'there'} 👋</h1>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-3 px-4 h-12 rounded-full bg-gray-50">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search jollof, shawarma..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-5 mb-6">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Promo Banner Carousel */}
        <div className="px-5 mb-6">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {promoSlides.map((slide, i) => (
                <div key={i} className="flex-[0_0_100%]">
                  <div className={`rounded-2xl px-5 py-5 bg-gradient-to-br ${slide.bg} flex items-center justify-between min-h-[110px]`}>
                    <div className="flex-1 pr-4">
                      <p className="text-base font-bold mb-1 text-gray-800">{slide.title}</p>
                      <p className="text-xs text-gray-500 mb-3">{slide.subtitle}</p>
                      <span className="inline-block bg-white/70 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                        Order now →
                      </span>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-white/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">{slide.emoji}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-2">
            {promoSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === i ? 'w-4 bg-indigo-500' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Restaurants Section */}
        <div className="mb-6">
          <div className="px-5 flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">Restaurants</h2>
            <Link to="/search" className="text-xs text-indigo-500 font-medium">See all →</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-5">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="flex-shrink-0 w-[200px] shadow-sm hover:shadow-md transition-shadow rounded-xl"
              >
                <div className="relative w-full h-[160px] rounded-xl mb-3 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  {restaurant.sponsored && (
                    <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Sponsored
                    </span>
                  )}
                  {!restaurant.isOpen && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-xl">
                      <span className="text-white text-xs font-semibold bg-black bg-opacity-50 px-2 py-1 rounded-full text-center">
                        {restaurant.openingTime ? `Closed · Opens ${formatHour(restaurant.openingTime)}` : 'Closed'}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-sm mb-1 text-gray-800 px-1">{restaurant.name}</h3>
                <p className="text-xs text-gray-500 px-1 pb-2">
                  ⭐ {restaurant.rating} · {restaurant.deliveryTime} · ₦{restaurant.deliveryFee} delivery
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Right Now */}
        <div className="px-5">
          <h2 className="text-base font-semibold mb-4 text-gray-800">Popular right now</h2>
          <div className="grid grid-cols-2 gap-3">
            {popularItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-2xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[110px] object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-0.5 text-gray-800 truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 truncate">{item.restaurant}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-amber-500">₦{item.price}</p>
                    <button
                      type="button"
                      onClick={() => {
                        addItem({ ...item, restaurant: item.restaurant });
                        toast.success(`${item.name} added to cart!`);
                      }}
                      className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center hover:opacity-80 transition-opacity"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <Plus size={14} color="white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-[390px] mx-auto md:max-w-4xl flex justify-around py-3">
          <Link to="/home" className="flex flex-col items-center gap-1">
            <HomeIcon size={20} className="text-indigo-500" />
            <span className="text-xs font-medium text-indigo-500">Home</span>
          </Link>
          <button type="button" className="flex flex-col items-center gap-1" aria-label="Search">
            <SearchIcon size={20} className="text-gray-500" />
            <span className="text-xs text-gray-500">Search</span>
          </button>
          <Link to="/orders" className="flex flex-col items-center gap-1">
            <Package size={20} className="text-gray-500" />
            <span className="text-xs text-gray-500">Orders</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1">
            <User size={20} className="text-gray-500" />
            <span className="text-xs text-gray-500">Profile</span>
          </Link>
        </div>
      </div>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
