import React, { useState } from 'react';
import ProductCard from '../shop/ProductCard';
import { useData } from '../../context/DataContext';
import { Flame, ArrowRight } from 'lucide-react';

export default function FeaturedSnacks({ onSelectProduct, onNavigateToShop }) {
  const { products: PRODUCTS } = useData();
  const [activeTab, setActiveTab] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Best Sellers' },
    { id: 'roasted-makhana', label: 'Roasted Makhana' },
    { id: 'kettle-chips', label: 'Artisanal Chips' },
    { id: 'roasted-nuts', label: 'Nuts & Seeds' },
    { id: 'trail-mixes', label: 'Trail Mixes' }
  ];

  const displayedProducts = activeTab === 'all'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-widest mb-1.5">
              <Flame className="w-4 h-4 fill-orange-600 text-orange-600" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
              Best-Selling Artisanal Snacks
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Hand-picked by our master roasters, crafted fresh in small batches every week.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToShop}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 group transition-colors"
          >
            <span>View Full Shop Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white shadow-stone-900/10'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-orange-300 hover:bg-orange-50/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onNavigateToShop}
            className="px-8 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-stone-900/10 transition-all inline-flex items-center gap-2 group"
          >
            <span>Explore All {PRODUCTS.length} Flavors &amp; Snacks</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
