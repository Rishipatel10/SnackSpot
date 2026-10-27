import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useData } from '../../context/DataContext';
import ProductCard from '../shop/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Plus, 
  Minus, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export default function ProductDetailsPage({ productId, onNavigateShop, onSelectProduct, onNavigateHome }) {
  const { products: PRODUCTS, isLoading } = useData();
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const { addToCart, setIsCartOpen } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const activeWeight = product.weightOptions?.[selectedWeightIndex] || {
    label: 'Standard Pack',
    price: product.price,
    weight: 'Pack'
  };

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, activeWeight, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, activeWeight, quantity);
    setIsCartOpen(true);
  };

  // Related products from the same category or bestsellers
  const relatedProducts = PRODUCTS
    .filter((p) => p.id !== product.id && (p.category === product.category || p.rating >= 4.8))
    .slice(0, 4);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs & Back */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium overflow-x-auto">
            <button type="button" onClick={onNavigateHome} className="hover:text-stone-900 transition-colors">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <button type="button" onClick={onNavigateShop} className="hover:text-stone-900 transition-colors">
              Shop
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-stone-600 truncate">{product.categoryName}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-orange-600 font-bold truncate max-w-[200px]">{product.name}</span>
          </nav>

          <button
            type="button"
            onClick={onNavigateShop}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-orange-600 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </button>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-md">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md ${product.badgeColor || 'bg-stone-900 text-white'}`}>
                    {product.badge}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-orange-600 text-white shadow-md">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-11 h-11 rounded-2xl flex items-center justify-center shadow-md backdrop-blur-md transition-all ${
                  wishlisted
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-white/90 text-stone-700 hover:text-rose-600 border border-stone-200/80'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      (selectedImage || product.image) === imgUrl
                        ? 'border-orange-600 ring-2 ring-orange-200'
                        : 'border-stone-200 hover:border-stone-400 opacity-80'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Dispatch Assurance Bar */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center">
                <Truck className="w-5 h-5 text-orange-600 mb-1" />
                <span className="text-[11px] font-bold text-stone-900">Same-Day Dispatch</span>
                <span className="text-[10px] text-stone-500">Orders before 4 PM</span>
              </div>
              <div className="flex flex-col items-center border-x border-stone-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-[11px] font-bold text-stone-900">100% Clean Label</span>
                <span className="text-[10px] text-stone-500">Zero artificial preservatives</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-5 h-5 text-amber-600 mb-1" />
                <span className="text-[11px] font-bold text-stone-900">Freshness Promise</span>
                <span className="text-[10px] text-stone-500">Airtight nitrogen pouch</span>
              </div>
            </div>

          </div>

          {/* Right Column: Purchasing & Specifications */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category Pill & Rating */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-100/90 text-orange-800 text-xs font-bold uppercase tracking-wider">
                {product.categoryName}
              </span>

              <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1 rounded-full text-xs font-bold text-stone-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-stone-400 font-normal">
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display leading-tight">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Price section */}
            <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200/80 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black text-stone-900">
                    ₹{activeWeight.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-semibold text-stone-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs font-extrabold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">
                      SAVE {product.discount}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Inclusive of all taxes • Free delivery on orders above ₹499
                </p>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock Fresh
                </span>
              </div>
            </div>

            {/* Weight / Pack Options */}
            {product.weightOptions && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Select Package Size: <strong className="text-stone-900">{activeWeight.label}</strong>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.weightOptions.map((opt, idx) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedWeightIndex(idx)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedWeightIndex === idx
                          ? 'border-orange-600 bg-orange-50 text-orange-950 ring-2 ring-orange-200'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <p className="text-xs font-bold">{opt.label}</p>
                      <p className="text-sm font-black text-orange-600 mt-0.5">₹{opt.price}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-200 rounded-2xl bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-700 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-extrabold text-sm text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-700 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-extrabold text-sm shadow-xl shadow-orange-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Box • ₹{activeWeight.price * quantity}</span>
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Buy Now with 1-Click</span>
              </button>
            </div>

            {/* Dietary Tags Pill Badges */}
            <div className="pt-2">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Dietary Highlights:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabbed Info (Description, Ingredients, Nutrition) */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex gap-4 border-b border-stone-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('description')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
                    activeTab === 'description'
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Description
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
                    activeTab === 'ingredients'
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Ingredients
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('nutrition')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
                    activeTab === 'nutrition'
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Nutritional Breakdown
                </button>
              </div>

              <div className="py-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                {activeTab === 'description' && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    {product.highlights && (
                      <ul className="list-disc pl-5 space-y-1 text-stone-600">
                        {product.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div>
                    <p className="font-medium text-stone-800 mb-2">Ingredients:</p>
                    <p className="text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200 font-mono text-xs">
                      {product.ingredients}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-2">
                      ⚠️ Allergen advice: Packed in a certified hygienic facility that also processes tree nuts and seeds.
                    </p>
                  </div>
                )}

                {activeTab === 'nutrition' && product.nutrition && (
                  <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
                    <div className="bg-stone-50 p-2.5 text-xs font-bold text-stone-900 border-b border-stone-200">
                      Approximate Values per 100g
                    </div>
                    <div className="divide-y divide-stone-100 text-xs">
                      <div className="flex justify-between p-2.5">
                        <span className="text-stone-500">Energy</span>
                        <span className="font-bold text-stone-900">{product.nutrition.energy}</span>
                      </div>
                      <div className="flex justify-between p-2.5">
                        <span className="text-stone-500">Protein</span>
                        <span className="font-bold text-stone-900">{product.nutrition.protein}</span>
                      </div>
                      <div className="flex justify-between p-2.5">
                        <span className="text-stone-500">Carbohydrates</span>
                        <span className="font-bold text-stone-900">{product.nutrition.carbs}</span>
                      </div>
                      <div className="flex justify-between p-2.5">
                        <span className="text-stone-500">Total Fats</span>
                        <span className="font-bold text-stone-900">{product.nutrition.fats}</span>
                      </div>
                      <div className="flex justify-between p-2.5">
                        <span className="text-stone-500">Dietary Fiber</span>
                        <span className="font-bold text-stone-900">{product.nutrition.fiber}</span>
                      </div>
                      <div className="flex justify-between p-2.5">
                        <span className="text-stone-500">Sodium</span>
                        <span className="font-bold text-stone-900">{product.nutrition.sodium}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* You May Also Crave Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                  Pairing Suggestions
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight font-display">
                  You May Also Crave
                </h3>
              </div>
              <button
                type="button"
                onClick={onNavigateShop}
                className="text-xs font-bold text-orange-600 hover:text-orange-700"
              >
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
