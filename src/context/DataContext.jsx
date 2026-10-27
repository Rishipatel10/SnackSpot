import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { PRODUCTS as STATIC_PRODUCTS, CATEGORIES as STATIC_CATEGORIES } from '../data/products';

const DataContext = createContext(null);

/**
 * Normalises a Supabase product row to the shape the UI expects.
 * Any field the DB does not provide falls back to a sensible default
 * so the UI never crashes on missing keys.
 */
function normaliseProduct(row) {
  return {
    id: String(row.id),
    name: row.name ?? '',
    category: row.category_id ?? row.category ?? '',
    categoryName: row.category_name ?? row.categoryName ?? '',
    subtitle: row.subtitle ?? '',
    price: Number(row.price ?? 0),
    originalPrice: Number(row.original_price ?? row.originalPrice ?? row.price ?? 0),
    discount: row.discount ?? '',
    rating: Number(row.rating ?? 0),
    reviewsCount: Number(row.reviews_count ?? row.reviewsCount ?? 0),
    badge: row.badge ?? '',
    badgeColor: row.badge_color ?? row.badgeColor ?? 'bg-orange-500 text-white',
    weightOptions: Array.isArray(row.weight_options ?? row.weightOptions)
      ? (row.weight_options ?? row.weightOptions)
      : [{ label: 'Standard Pack', price: Number(row.price ?? 0), weight: 'Pack' }],
    dietary: Array.isArray(row.dietary) ? row.dietary : [],
    inStock: row.in_stock ?? row.inStock ?? true,
    image: row.image_url || row.image || '',
    gallery: Array.isArray(row.gallery) ? row.gallery : [row.image_url || row.image || ''],
    description: row.description ?? '',
    ingredients: row.ingredients ?? '',
    nutrition: row.nutrition ?? {
      energy: '', protein: '', carbs: '', fats: '', fiber: '', sodium: ''
    },
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
  };
}

/**
 * Normalises a Supabase category row to the shape the UI expects.
 */

function normaliseCategory(row) {
  return {
    id: String(row.id),
    name: row.name ?? '',
    tagline: row.tagline ?? '',
    count: Number(row.count ?? 0),
    icon: row.icon ?? 'Sparkles',
    image: row.image_url || row.image || '',
    color: row.color ?? 'from-amber-500/20 to-orange-500/10',
  };
}


export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('static'); // 'static' | 'supabase'

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const [productsRes, categoriesRes] = await Promise.all([
          supabase.from('products').select('*').order('id'),
          supabase.from('categories').select('*').order('id'),
        ]);

        if (cancelled) return;

        if (productsRes.error) throw productsRes.error;
        if (categoriesRes.error) throw categoriesRes.error;

        const dbProducts = productsRes.data ?? [];
        const dbCategories = categoriesRes.data ?? [];

        // If Supabase returned data, use it; otherwise keep the static fallback.
        // Always use Supabase data, even when a table is empty.
        setProducts(dbProducts.map(normaliseProduct));
        setCategories(dbCategories.map(normaliseCategory));
        setSource('supabase');

        console.log('[SnackSpot] Supabase products:', dbProducts);
        console.log('[SnackSpot] Supabase categories:', dbCategories);
      } catch (err) {
        if (cancelled) return;
        console.error('[SnackSpot] Supabase fetch error:', err.message);
        setError(err.message);
        // Keep static data as graceful fallback — app stays fully functional
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return (
    <DataContext.Provider value={{ products, categories, isLoading, error, source }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside <DataProvider>');
  return ctx;
}
