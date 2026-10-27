import React, { useState } from 'react';
import { 
  Flame, 
  Mail, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  HeartHandshake
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onNavigate }) {
  const { categories: CATEGORIES } = useData();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Slow Roasted</h4>
              <p className="text-xs text-stone-400">Never deep-fried, zero palm oil</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Clean Label</h4>
              <p className="text-xs text-stone-400">Zero artificial preservatives</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Express Delivery</h4>
              <p className="text-xs text-stone-400">Free shipping on orders &gt; ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Artisan Direct</h4>
              <p className="text-xs text-stone-400">Empowering local farming groves</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-stone-800">
          
          {/* Brand Story Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <span className="text-2xl font-black text-white font-display">
                Snack<span className="text-orange-500">Spot</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              SnackSpot is India’s premium artisanal snacking destination. We slow-roast organic lotus seeds, kettle-cook rustic potatoes in small batches, and craft indulgent dark chocolate granola clusters with honest ingredients.
            </p>

            <div className="pt-2">
              <div className="flex items-center gap-3">
                <a href="#instagram" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-orange-600 hover:text-white text-stone-400 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#twitter" aria-label="X Twitter" className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-orange-600 hover:text-white text-stone-400 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#facebook" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-orange-600 hover:text-white text-stone-400 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="hover:text-orange-400 transition-colors"
                >
                  All Snacks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', { filter: 'bestseller' })}
                  className="hover:text-orange-400 transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', { dietary: 'Vegan' })}
                  className="hover:text-orange-400 transition-colors"
                >
                  Vegan Munchies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', { dietary: 'Gluten-Free' })}
                  className="hover:text-orange-400 transition-colors"
                >
                  Gluten-Free Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Snack Categories
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate('category', { categoryId: cat.id })}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay in the Crunch
            </h5>
            <p className="text-xs text-stone-400">
              Subscribe to get secret flavor drops, exclusive flash sales, and ₹100 off your first box!
            </p>

            {subscribed ? (
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>You're in! Welcome to the SnackSpot club.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="pt-2 text-[11px] text-stone-500">
              🔒 We never spam. Unsubscribe anytime.
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {CURRENT_YEAR} SnackSpot India Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="px-2 py-1 bg-stone-800 rounded font-mono text-stone-400">UPI</span>
            <span className="px-2 py-1 bg-stone-800 rounded font-mono text-stone-400">RuPay</span>
            <span className="px-2 py-1 bg-stone-800 rounded font-mono text-stone-400">Visa</span>
            <span className="px-2 py-1 bg-stone-800 rounded font-mono text-stone-400">Mastercard</span>
            <span className="px-2 py-1 bg-stone-800 rounded font-mono text-stone-400">NetBanking</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
