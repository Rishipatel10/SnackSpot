import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useData } from '../../context/DataContext';
import { 
  X, 
  Flame, 
  ChevronDown, 
  Home, 
  ShoppingBag, 
  Search,
  Heart, 
  Sparkles, 
  User, 
  LogOut,
  Tag
} from 'lucide-react';

export default function MobileNav({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onOpenSearch
}) {
  const { user, openAuth, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const { categories: CATEGORIES } = useData();
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-[#FFFDF9] h-full shadow-2xl flex flex-col z-10 border-r border-stone-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center">
              <Flame className="w-4 h-4 fill-white" />
            </div>
            <span className="text-lg font-black text-stone-900 font-display">
              Snack<span className="text-orange-600">Spot</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          
          <button
            type="button"
            onClick={() => {
              onNavigate('home');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-colors ${
              currentPage === 'home'
                ? 'bg-orange-100 text-orange-700'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Home className="w-4 h-4 text-orange-600" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigate('shop');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-colors ${
              currentPage === 'shop'
                ? 'bg-orange-100 text-orange-700'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-orange-600" />
            <span>Shop All Snacks</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <Search className="w-4 h-4 text-orange-600" />
            <span>Search Snacks...</span>
          </button>

          {/* Categories Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Categories</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-stone-400 transition-transform ${
                  categoriesOpen ? 'rotate-180 text-orange-600' : ''
                }`}
              />
            </button>

            {categoriesOpen && (
              <div className="pl-6 pr-2 py-1 space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onNavigate('category', { categoryId: cat.id });
                      onClose();
                    }}
                    className="w-full flex items-center justify-between py-2 px-3 text-xs text-stone-600 hover:text-orange-600 rounded-xl hover:bg-orange-50/50"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-stone-400 font-semibold">{cat.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              onNavigate('shop', { filter: 'bestseller' });
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Best Sellers</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigate('shop', { wishlistOnly: true });
              onClose();
            }}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>My Wishlist</span>
            </div>
            {wishlistCount > 0 && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Promo code mini banner */}
          <div className="pt-4">
            <div className="bg-orange-100/70 border border-orange-200/80 rounded-2xl p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-900 mb-1">
                <Tag className="w-3.5 h-3.5 text-orange-600" />
                <span>Special Promo Offer</span>
              </div>
              <p className="text-[11px] text-orange-800">
                Use code <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-orange-200">SNACKFIRST</strong> for 15% off your box!
              </p>
            </div>
          </div>
        </div>

        {/* Footer User Section */}
        <div className="p-4 border-t border-stone-200 bg-white">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-xl object-cover bg-orange-100"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-stone-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-stone-500 truncate">{user.email}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                openAuth('login');
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-stone-900 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-orange-400" />
              <span>Sign In / Create Account</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
