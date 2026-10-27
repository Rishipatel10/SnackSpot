import React from 'react';
import { useData } from '../../context/DataContext';
import { Filter, RotateCcw, Check } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedDietary,
  onToggleDietary,
  priceRange,
  onSelectPriceRange,
  onResetFilters,
  totalResults
}) {
  const { categories: CATEGORIES, products: PRODUCTS } = useData();
  const dietaryOptions = [
    'Gluten-Free',
    'Vegan',
    'Roasted Not Fried',
    'High Protein',
    'Zero Palm Oil'
  ];

  const priceOptions = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-200', label: 'Under ₹200' },
    { id: '200-350', label: '₹200 - ₹350' },
    { id: 'above-350', label: 'Above ₹350' }
  ];

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedDietary.length > 0 || 
    priceRange !== 'all';

  return (
    <aside className="w-full space-y-6">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
          <Filter className="w-4 h-4 text-orange-600" />
          <span>Filters</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
            {totalResults}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
          Categories
        </h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-orange-600 text-white shadow-sm font-bold'
                : 'text-stone-700 hover:bg-orange-50/60'
            }`}
          >
            <span>All Snacks</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === 'all' ? 'bg-orange-700 text-white' : 'bg-stone-100 text-stone-500'}`}>
              {totalResults}
            </span>
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-sm font-bold'
                  : 'text-stone-700 hover:bg-orange-50/60'
              }`}
            >
              <span className="truncate pr-2">{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-orange-700 text-white' : 'bg-stone-100 text-stone-500'}`}>
                {PRODUCTS.filter(
                 (p) => String(p.category) === String(cat.id)
                ).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-stone-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
          Price Range
        </h4>
        <div className="space-y-1.5">
          {priceOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer hover:text-stone-900"
            >
              <input
                type="radio"
                name="priceFilter"
                checked={priceRange === opt.id}
                onChange={() => onSelectPriceRange(opt.id)}
                className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-stone-300"
              />
              <span className={priceRange === opt.id ? 'font-bold text-orange-600' : ''}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary Tags Filter */}
      <div className="pt-4 border-t border-stone-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
          Dietary Preferences
        </h4>
        <div className="space-y-2">
          {dietaryOptions.map((diet) => {
            const isChecked = selectedDietary.includes(diet);
            return (
              <label
                key={diet}
                className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer hover:text-stone-900 select-none"
              >
                <div
                  onClick={() => onToggleDietary(diet)}
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-orange-600 border-orange-600 text-white'
                      : 'border-stone-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span
                  onClick={() => onToggleDietary(diet)}
                  className={isChecked ? 'font-bold text-stone-900' : ''}
                >
                  {diet}
                </span>
              </label>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
