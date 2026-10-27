import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Plus, 
  Minus, 
  Eye
} from 'lucide-react';

export default function ProductCard({ product, onSelectProduct }) {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const activeWeight = product.weightOptions?.[selectedWeightIndex] || {
    label: 'Standard',
    price: product.price,
    weight: 'Pack'
  };

  const cartId = `${product.id}-${activeWeight.label}`;
  const existingCartItem = cartItems.find((item) => item.cartId === cartId);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, activeWeight, 1);
  };

  return (
    <div
      onClick={() => onSelectProduct(product.id)}
      className="group bg-white rounded-3xl border border-stone-200/90 hover:border-orange-300/80 shadow-sm hover:shadow-xl hover:shadow-orange-950/5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${product.badgeColor || 'bg-stone-900 text-white'}`}>
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-orange-600 text-white shadow-sm">
              {product.discount}
            </span>
          )}
        </div>

        {/* Quick Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-md backdrop-blur-md transition-all ${
              wishlisted
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/90 text-stone-600 hover:text-rose-600 hover:bg-white border border-stone-200/60'
            }`}
            title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product.id);
            }}
            className="w-9 h-9 rounded-2xl bg-white/90 hover:bg-white text-stone-600 hover:text-orange-600 flex items-center justify-center shadow-md backdrop-blur-md border border-stone-200/60 transition-all opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Dietary Tag Pill in Corner */}
        {product.dietary?.[0] && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-800 shadow-sm border border-stone-200/60">
              🌱 {product.dietary[0]}
            </span>
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-orange-600 tracking-wide uppercase">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-stone-700 bg-stone-100/80 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Weight selector buttons */}
          {product.weightOptions && product.weightOptions.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mt-3" onClick={(e) => e.stopPropagation()}>
              {product.weightOptions.map((opt, idx) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedWeightIndex(idx)}
                  className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                    selectedWeightIndex === idx
                      ? 'bg-orange-50 border-orange-500 text-orange-700'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-stone-900">
                ₹{activeWeight.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400 font-medium block">
              Inclusive of all taxes
            </span>
          </div>

          {/* Add to Cart / Quantity Toggle */}
          <div onClick={(e) => e.stopPropagation()}>
            {existingCartItem ? (
              <div className="flex items-center bg-orange-600 text-white rounded-2xl p-1 shadow-md shadow-orange-600/20">
                <button
                  type="button"
                  onClick={() => updateQuantity(existingCartItem.cartId, existingCartItem.quantity - 1)}
                  className="w-7 h-7 rounded-xl hover:bg-orange-700 flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2.5 text-xs font-extrabold">
                  {existingCartItem.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(existingCartItem.cartId, existingCartItem.quantity + 1)}
                  className="w-7 h-7 rounded-xl hover:bg-orange-700 flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className="py-2 px-3 sm:px-3.5 rounded-2xl bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white border border-orange-200 hover:border-orange-600 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all duration-200 active:scale-95 group/btn"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-orange-600 group-hover/btn:text-white transition-colors" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
