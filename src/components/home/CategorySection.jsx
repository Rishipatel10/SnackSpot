import React from 'react';
import { useData } from '../../context/DataContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategorySection({ onSelectCategory }) {
  const { categories: CATEGORIES } = useData();
  return (
    <section className="py-12 sm:py-16 bg-[#F5EFE6]/60 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisanal Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
              Explore by Snack Craving
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm">
            From crunch-loaded fox nuts to fragrant Kashmiri saffron cookies, discover pure gourmet delight.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-white rounded-3xl p-3 sm:p-4 border border-stone-200/90 hover:border-orange-400 shadow-sm hover:shadow-xl hover:shadow-orange-950/5 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Category Image */}
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 mb-3 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-stone-800 shadow-sm">
                  {cat.count} Items
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                  {cat.tagline}
                </p>
              </div>

              {/* Arrow Indicator */}
              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform">
                <span>Shop now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
