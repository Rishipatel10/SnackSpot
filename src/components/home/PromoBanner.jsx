import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Sparkles, Copy, Check, Timer, ArrowRight, Tag } from 'lucide-react';

export default function PromoBanner({ onNavigateToShop }) {
  const { showToast } = useCart();
  const [copied, setCopied] = useState(false);
  
  // Simulated countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('CRUNCH20');
    setCopied(true);
    showToast('Promo code CRUNCH20 copied! Use at checkout for 20% OFF.', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-orange-950 to-stone-900 p-8 sm:p-12 text-white shadow-2xl border border-orange-900/40">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>WEEKEND CRUNCH FESTIVAL</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight font-display">
                Get <span className="text-amber-400">Flat 20% OFF</span> on Orders Above ₹799
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                Stock your snack shelves with slow-roasted Himalayan makhana, rich Belgian dark chocolate clusters, and authentic Kerala banana crisps.
              </p>

              {/* Coupon Copy Pill & Countdown */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                
                {/* Coupon Code Pill */}
                <div className="flex items-center bg-stone-800/90 border border-orange-500/30 rounded-2xl p-1.5 pl-3">
                  <Tag className="w-4 h-4 text-orange-400 mr-2" />
                  <span className="text-xs font-mono font-bold tracking-wider text-amber-200 mr-3">
                    CRUNCH20
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-1.5 bg-black/40 border border-stone-800 rounded-2xl px-3.5 py-2 text-xs font-medium text-stone-300">
                  <Timer className="w-4 h-4 text-orange-400" />
                  <span>Ends in:</span>
                  <span className="font-mono font-bold text-amber-400">
                    {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
                  </span>
                </div>

              </div>
            </div>

            {/* Right Action Button */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <button
                type="button"
                onClick={onNavigateToShop}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-sm shadow-xl shadow-orange-900/30 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Shop With Discount</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-stone-400 mt-2 text-center lg:text-right">
                Free Delivery automatically applied above ₹499
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
