import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import { useData } from '../../context/DataContext';
import { useWishlist } from '../../context/WishlistContext';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ShopPage({
  initialCategory = 'all',
  initialWishlistOnly = false,
  initialFilter = null,
  onSelectProduct,
  onNavigateHome
}) {
  const { wishlist } = useWishlist();
  const { products: PRODUCTS, categories: CATEGORIES, isLoading, error } = useData();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(initialWishlistOnly);

  const toggleDietary = (diet) => {
    setSelectedDietary((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedDietary([]);
    setPriceRange('all');
    setSearchQuery('');
    setShowWishlistOnly(false);
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (showWishlistOnly) {
      list = list.filter((p) => wishlist.includes(p.id));
    }

    if (initialFilter === 'bestseller') {
      list = list.filter((p) => p.badge === 'Bestseller' || p.rating >= 4.8);
    }

    if (selectedCategory !== 'all') {
  list = list.filter(
    (p) => String(p.category) === String(selectedCategory)
  );
}

    if (selectedDietary.length > 0) {
      list = list.filter((p) =>
        selectedDietary.every((d) => p.dietary?.includes(d))
      );
    }

    if (priceRange === 'under-200') {
      list = list.filter((p) => p.price < 200);
    } else if (priceRange === '200-350') {
      list = list.filter((p) => p.price >= 200 && p.price <= 350);
    } else if (priceRange === 'above-350') {
      list = list.filter((p) => p.price > 350);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.dietary.some((d) => d.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [
    selectedCategory,
    selectedDietary,
    priceRange,
    searchQuery,
    sortBy,
    showWishlistOnly,
    wishlist,
    initialFilter
  ]);

  const categoryName = useMemo(() => {
    if (selectedCategory === 'all') return 'All Artisanal Snacks';
    const found = CATEGORIES.find((c) => c.id === selectedCategory);
    return found ? found.name : 'All Snacks';
  }, [selectedCategory]);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 text-sm text-amber-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Using demo data — could not reach the store database. ({error})</span>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="flex items-center justify-center py-32 gap-3 text-stone-400">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            <span className="text-sm font-medium">Loading snacks…</span>
          </div>
        ) : (
          <>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6 font-medium">
          <button type="button" onClick={onNavigateHome} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-stone-900 font-semibold">{showWishlistOnly ? 'My Wishlist' : 'Shop'}</span>
          {selectedCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-orange-600 font-bold">{categoryName}</span>
            </>
          )}
        </nav>

        {/* Page Title & Search bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-stone-200">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight font-display">
              {showWishlistOnly ? 'My Favorite Snacks' : categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {showWishlistOnly
                ? `You have saved ${wishlist.length} artisanal snacks to your wishlist.`
                : '100% slow-roasted and handcrafted snacks packed fresh in small batches.'}
            </p>
          </div>

          {/* In-page search bar */}
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavors, tags..."
                className="w-full bg-white border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-orange-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-orange-600" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Control Bar: Active filters & Sorting */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3">
          
          {/* Active Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">
              Showing <strong>{filteredProducts.length}</strong> snacks
            </span>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
                Category: {categoryName}
                <button type="button" onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedDietary.map((diet) => (
              <span
                key={diet}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold"
              >
                {diet}
                <button type="button" onClick={() => toggleDietary(diet)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {priceRange !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-semibold">
                Price: {priceRange}
                <button type="button" onClick={() => setPriceRange('all')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {showWishlistOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
                Wishlist Only
                <button type="button" onClick={() => setShowWishlistOnly(false)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-800 focus:outline-none focus:border-orange-500 shadow-sm cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated ★</option>
            </select>
          </div>
        </div>

        {/* Main Grid with Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-4">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm sticky top-24">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedDietary={selectedDietary}
                onToggleDietary={toggleDietary}
                priceRange={priceRange}
                onSelectPriceRange={setPriceRange}
                onResetFilters={resetFilters}
                totalResults={PRODUCTS.length}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">
                  No snacks match your filters
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
                  Try clearing some filter options or searching for roasted makhana, potato chips, or dark chocolate trail mixes.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Mobile Filter Slide-Over Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col z-10 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <span className="font-bold text-stone-900">Filter Snacks</span>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-stone-500 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setIsMobileFilterOpen(false);
                }}
                selectedDietary={selectedDietary}
                onToggleDietary={toggleDietary}
                priceRange={priceRange}
                onSelectPriceRange={(pr) => {
                  setPriceRange(pr);
                  setIsMobileFilterOpen(false);
                }}
                onResetFilters={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                totalResults={filteredProducts.length}
              />

              <div className="mt-8 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-orange-600 text-white rounded-xl text-xs font-bold"
                >
                  View {filteredProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        )}
          </>
        )}

      </div>
    </div>
  );
}
