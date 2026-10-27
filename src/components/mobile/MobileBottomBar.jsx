import React from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Home, ShoppingBag, Search, Heart, Compass } from 'lucide-react';

export default function MobileBottomBar({
  currentPage,
  onNavigate,
  onOpenSearch
}) {
  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentPage === 'home' ? 'text-orange-600' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Shop */}
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentPage === 'shop' ? 'text-orange-600' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-bold">Shop</span>
        </button>

        {/* Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-1 text-stone-500 hover:text-stone-800 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold">Search</span>
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => onNavigate('shop', { wishlistOnly: true })}
          className="flex flex-col items-center gap-1 text-stone-500 hover:text-stone-800 relative transition-colors"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-stone-500 hover:text-orange-600 relative transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-orange-600 text-white text-[9px] font-extrabold flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-orange-600">Cart</span>
        </button>

      </div>
    </div>
  );
}
