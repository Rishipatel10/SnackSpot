import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  User, 
  Menu, 
  ChevronDown, 
  Sparkles, 
  Flame, 
  Check, 
  LogOut,
  ArrowRight
} from 'lucide-react';

export default function Navbar({ 
  currentPage, 
  onNavigate, 
  onOpenSearch, 
  onOpenMobileMenu 
}) {
  const { totalCount, setIsCartOpen, subtotal, showToast } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, openAuth, logout } = useAuth();
  const { categories: CATEGORIES } = useData();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const displayName =
  user?.user_metadata?.full_name ||
  user?.email?.split('@')[0] ||
  'Snack Explorer';

const avatarUrl =
  user?.user_metadata?.avatar_url ||
  `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
    user?.email || 'snackspot'
  )}`;

  const categoriesRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setIsCategoriesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyPromoCode = () => {
    navigator.clipboard?.writeText('SNACKFIRST');
    setCopiedCode(true);
    showToast('Promo code SNACKFIRST copied! 15% off applied at checkout.', 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-stone-900 via-orange-950 to-stone-900 text-amber-100 text-xs py-2 px-4 border-b border-orange-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-center mx-auto sm:mx-0">
            <span className="flex items-center gap-1 font-semibold text-orange-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FRESH HARVEST:</span>
            </span>
            <span className="truncate">
              Free Express Delivery above ₹499 &amp; 100% Roasted Goodness!
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={copyPromoCode}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/40 text-[11px] font-mono text-orange-300 transition-colors"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">COPIED!</span>
                </>
              ) : (
                <>
                  <span>USE CODE:</span>
                  <strong className="text-white">SNACKFIRST</strong>
                  <span className="text-orange-400 text-[10px]">(15% OFF)</span>
                </>
              )}
            </button>
            <span className="text-stone-500">•</span>
            <span className="text-[11px] text-stone-300">Pan-India Dispatch in 24h</span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-stone-200/80 py-3'
            : 'bg-[#FAF7F2] border-b border-stone-200/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-600/20 group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 font-display">
                    Snack<span className="text-orange-600">Spot</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                    Artisanal
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 font-medium tracking-wide -mt-1 hidden sm:block">
                  Pure Craft • Guilt Free
                </span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                currentPage === 'home'
                  ? 'bg-orange-100/70 text-orange-700 font-bold'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-stone-100/70'
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                currentPage === 'shop'
                  ? 'bg-orange-100/70 text-orange-700 font-bold'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-stone-100/70'
              }`}
            >
              Shop All
            </button>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                type="button"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className={`px-3.5 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-colors ${
                  isCategoriesOpen || currentPage === 'category'
                    ? 'bg-orange-100/70 text-orange-700'
                    : 'text-stone-700 hover:text-orange-600 hover:bg-stone-100/70'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180 text-orange-600' : ''}`} />
              </button>

              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-stone-200 p-3 z-50 animate-fade-in">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
                    Handcrafted Snack Ranges
                  </div>
                  <div className="grid grid-cols-1 gap-1 mt-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          onNavigate('category', { categoryId: cat.id });
                          setIsCategoriesOpen(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-2xl hover:bg-orange-50/70 transition-colors text-left group"
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-11 h-11 rounded-xl object-cover shrink-0 border border-stone-200 group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-stone-800 group-hover:text-orange-600">
                            {cat.name}
                          </p>
                          <p className="text-[11px] text-stone-500 line-clamp-1">
                            {cat.tagline}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold text-stone-400 group-hover:text-orange-600 px-2 py-0.5 rounded-full bg-stone-100 group-hover:bg-orange-100">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-stone-100 mt-2 pt-2 px-2">
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('shop');
                        setIsCategoriesOpen(false);
                      }}
                      className="w-full py-2 text-center text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center justify-center gap-1 group"
                    >
                      <span>Explore Complete Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('shop', { filter: 'bestseller' })}
              className="px-3.5 py-2 rounded-full text-sm font-semibold text-stone-700 hover:text-orange-600 hover:bg-stone-100/70 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Best Sellers</span>
            </button>
          </div>

          {/* Right: Search, Wishlist, Cart & Login */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-stone-200/90 hover:border-orange-300 text-stone-500 hover:text-stone-800 shadow-sm transition-all group"
              title="Search Snacks (⌘K)"
            >
              <Search className="w-4 h-4 text-stone-400 group-hover:text-orange-600 transition-colors" />
              <span className="text-xs hidden md:inline text-stone-400 group-hover:text-stone-600 font-medium">
                Search snacks...
              </span>
              <kbd className="hidden md:inline-flex items-center text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-stone-100 text-stone-500 rounded border border-stone-200">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => onNavigate('shop', { wishlistOnly: true })}
              className="relative p-2.5 rounded-2xl bg-white border border-stone-200/90 hover:border-orange-300 text-stone-700 hover:text-orange-600 shadow-sm transition-all"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-md shadow-orange-600/25 transition-all group"
              title="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">
                {totalCount > 0 ? `₹${subtotal}` : 'Cart'}
              </span>
              <span className="w-5 h-5 rounded-full bg-white text-orange-700 text-[11px] font-extrabold flex items-center justify-center group-hover:scale-110 transition-transform">
                {totalCount}
              </span>
            </button>

            {/* User Profile / Login */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-2xl border border-stone-200 hover:border-orange-300 transition-colors"
                >
                  <img
                    src={avatarUrl} 
                    alt={displayName}
                    className="w-8 h-8 rounded-xl object-cover bg-orange-100"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500 hidden sm:block mr-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-stone-200/90 hover:border-orange-300 bg-white text-xs font-bold text-stone-800 hover:text-orange-600 shadow-sm transition-all"
                >
                  <User className="w-4 h-4 text-orange-600" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* User dropdown */}
              {isUserMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-xl border border-stone-200 p-2 z-50 animate-fade-in">
                  <div className="p-3 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900">{displayName}</p>
                    <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Crunch Club Member</span>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('shop', { wishlistOnly: true });
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 rounded-xl"
                    >
                      My Favorites ({wishlistCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCartOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 rounded-xl"
                    >
                      Active Cart ({totalCount})
                    </button>
                  </div>
                  <div className="border-t border-stone-100 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                        showToast('Logged out successfully', 'info');
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}
