import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function SearchModal({ isOpen, onClose, onSelectProduct, onSelectCategory }) {
  const { products: PRODUCTS, categories: CATEGORIES } = useData();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.dietary.some((d) => d.toLowerCase().includes(q))
        );
      })
    : [];

  const popularSearches = [
    'Roasted Makhana',
    'Truffle Chips',
    'High Protein',
    'Gluten-Free',
    'Dark Chocolate',
    'Andhra Peanuts'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-orange-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search snacks, flavors (e.g. peri peri, truffle, makhana)..."
            className="w-full bg-transparent border-none text-stone-900 placeholder:text-stone-400 focus:outline-none text-base sm:text-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 rounded-lg hover:bg-stone-200"
          >
            ESC
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {query.trim() === '' ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors border border-stone-200/60"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                <Tag className="w-3.5 h-3.5 text-orange-500" />
                Browse Categories
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.id);
                      handleClose();
                    }}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl border border-stone-200 hover:border-orange-300 hover:bg-orange-50/50 text-left transition-colors group"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-800 group-hover:text-orange-600">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-stone-500">{cat.count} items</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                Products Found ({filteredProducts.length})
              </p>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-stone-800">No snacks found for "{query}"</h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    Try searching for roasted makhana, potato chips, dark chocolate, or healthy trail mixes.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product.id);
                        handleClose();
                      }}
                      className="flex items-center justify-between p-3 rounded-2xl border border-stone-200/80 hover:border-orange-300 hover:bg-orange-50/40 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-xl object-cover border border-stone-200 group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                            {product.categoryName}
                          </span>
                          <h4 className="text-sm font-bold text-stone-900 group-hover:text-orange-600 mt-1">
                            {product.name}
                          </h4>
                          <p className="text-xs text-stone-500 line-clamp-1">
                            {product.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 pl-3">
                        <span className="text-sm font-extrabold text-stone-900">
                          ₹{product.price}
                        </span>
                        <div className="flex items-center justify-end text-orange-600 text-xs font-medium mt-1 group-hover:translate-x-1 transition-transform">
                          <span>View</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
