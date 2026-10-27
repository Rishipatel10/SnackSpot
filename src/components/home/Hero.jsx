import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  Flame, 
  CheckCircle2 
} from 'lucide-react';

export default function Hero({ onNavigate, onSelectProduct }) {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24">
      {/* Background ambient warmth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/40 via-orange-200/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -top-12 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/90 border border-orange-200 text-orange-800 text-xs font-bold shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>100% Slow-Roasted • Zero Palm Oil • No Artificial Flavors</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.08] font-display">
              Crunch Into <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
                Pure Craft Goodness.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Meet India's freshest artisanal snacks. We slow-roast organic lotus seeds in cold-pressed oils, hand-cook kettle crisps in small batches, and blend superfood trail mixes that fuel your day without the guilt.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-extrabold text-sm shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore All Snacks</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop', { filter: 'bestseller' })}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-orange-50/80 active:scale-95 text-stone-800 hover:text-orange-700 font-bold text-sm border border-stone-300/80 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-orange-600" />
                <span>View Best Sellers</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                  50K+
                </p>
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                  Happy Munchers
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                    4.9
                  </span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                  Verified Reviews
                </p>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                  100%
                </p>
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                  Clean Ingredients
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=900&auto=format&fit=crop"
                  alt="Artisanal Roasted Makhana"
                  className="w-full h-[420px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />

                {/* Bottom text inside frame */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="px-3 py-1 rounded-full bg-orange-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                    Featured Batch
                  </span>
                  <h3 className="text-xl font-bold mt-2 font-display">
                    Smoky Peri-Peri Roasted Makhana
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-1 mt-0.5">
                    Infused with African bird's eye chili &amp; Himalayan pink salt
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-black text-amber-300">₹199 only</span>
                    <button
                      type="button"
                      onClick={() => onSelectProduct('snack-01')}
                      className="px-3.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-stone-900 text-xs font-bold transition-colors"
                    >
                      Quick Taste →
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Badge Top-Right */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-stone-200/80 flex items-center gap-3 animate-bounce-in">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Slow-Roasted</p>
                  <p className="text-[10px] text-stone-500 font-medium">Never Deep Fried</p>
                </div>
              </div>

              {/* Floating Badge Bottom-Left */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-stone-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-stone-900">No Preservatives</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[10px] text-stone-500 font-medium">100% Honest Ingredients</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
