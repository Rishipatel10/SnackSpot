import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, ShoppingBag, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast, setToast } = useCart();

  if (!toast) return null;

  const icons = {
    cart: <ShoppingBag className="w-5 h-5 text-orange-600 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-600 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm w-full mx-4 sm:mx-0">
      <div className="bg-white border border-orange-200/80 rounded-2xl shadow-xl shadow-orange-950/10 p-4 flex items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
            {icons[toast.type] || icons.success}
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900 leading-tight">
              {toast.message}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">SnackSpot Notification</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setToast(null)}
          className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
