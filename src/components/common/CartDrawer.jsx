import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Truck, 
  ShieldCheck, 
  Tag 
} from 'lucide-react';

export default function CartDrawer({ onNavigateToShop }) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    deliveryFee,
    isFreeDelivery,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isCartOpen) return null;

  const handleApply = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon);
    if (ok) setInputCoupon('');
  };

  const handleDemoCheckout = () => {
    const newOrderId = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(newOrderId);
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
      setCheckoutComplete(false);
      setIsCartOpen(false);
      setConfirmedOrderId('');
    }, 2800);
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">Your Snack Box</h3>
                <p className="text-xs text-stone-500">
                  {cartItems.length} {cartItems.length === 1 ? 'snack item' : 'snack items'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-orange-50/80 border-b border-orange-100/80 px-5 py-3">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-stone-700">
              <span className="flex items-center gap-1.5 text-stone-900 font-semibold">
                <Truck className="w-4 h-4 text-orange-600" />
                {isFreeDelivery ? (
                  <span className="text-emerald-700 font-bold">🎉 You've unlocked FREE Delivery!</span>
                ) : (
                  <span>Add <strong className="text-orange-700 font-bold">₹{amountNeededForFreeDelivery}</strong> more for FREE shipping</span>
                )}
              </span>
              <span className="text-[11px] font-bold text-orange-700">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-orange-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Checkout Success Screen */}
          {checkoutComplete ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-stone-900 mb-2">Order Confirmed!</h3>
              <p className="text-sm text-stone-600 mb-4">
                Thank you for snacking with SnackSpot! Your freshly packed artisanal box is being prepared for dispatch.
              </p>
              <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-500 font-mono">
                Order ID: #{confirmedOrderId || 'SS-104829'}
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4 text-orange-400">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-1">Your snack box is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Satisfy your cravings with slow-roasted makhana, artisanal kettle crisps, or dark chocolate trail mixes.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  if (onNavigateToShop) onNavigateToShop();
                }}
                className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md hover:shadow-orange-500/25 transition-all flex items-center gap-2"
              >
                <span>Browse Snacks</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Items List */
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-3.5 bg-white rounded-2xl border border-stone-200/90 shadow-sm flex items-center gap-3.5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5 font-medium">
                        {item.weight}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="text-sm font-extrabold text-stone-900">
                          ₹{item.price * item.quantity}
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-stone-400 font-normal ml-1">
                              (₹{item.price} each)
                            </span>
                          )}
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartId)}
                      className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Coupon Code Section */}
                <div className="pt-2">
                  <div className="bg-stone-100/70 p-3 rounded-2xl border border-stone-200/70">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-2">
                      <Tag className="w-3.5 h-3.5 text-orange-600" />
                      Apply Promo Code
                    </div>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                            ✓
                          </div>
                          <div>
                            <span className="text-xs font-bold text-emerald-800 font-mono">
                              {appliedCoupon.code}
                            </span>
                            <p className="text-[10px] text-emerald-600">
                              {appliedCoupon.description}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeCoupon}
                          className="text-xs font-bold text-stone-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApply} className="flex gap-2">
                        <input
                          type="text"
                          value={inputCoupon}
                          onChange={(e) => setInputCoupon(e.target.value)}
                          placeholder="e.g. SNACKFIRST or CRUNCH20"
                          className="flex-1 uppercase bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-mono tracking-wider focus:outline-none focus:border-orange-500"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {couponError && (
                      <p className="text-[11px] text-red-600 mt-1.5 font-medium">
                        {couponError}
                      </p>
                    )}

                    {!appliedCoupon && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <button
                          type="button"
                          onClick={() => applyCoupon('SNACKFIRST')}
                          className="text-[10px] bg-white border border-stone-200 px-2 py-0.5 rounded-md text-stone-600 hover:border-orange-400 font-mono"
                        >
                          🏷️ SNACKFIRST (15% OFF)
                        </button>
                        <button
                          type="button"
                          onClick={() => applyCoupon('CRUNCH20')}
                          className="text-[10px] bg-white border border-stone-200 px-2 py-0.5 rounded-md text-stone-600 hover:border-orange-400 font-mono"
                        >
                          🏷️ CRUNCH20 (20% OFF)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Summary & Checkout */}
              <div className="p-5 border-t border-stone-200 bg-white space-y-3">
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Delivery</span>
                    <span className="font-semibold text-stone-900">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-stone-100 pt-2 flex justify-between text-sm sm:text-base font-extrabold text-stone-900">
                    <span>Total Amount</span>
                    <span className="text-orange-600">₹{total}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDemoCheckout}
                  className="w-full py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-orange-600/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Checkout Now</span>
                  <span className="text-orange-200 font-normal">| ₹{total}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Secure Checkout & Freshness Guaranteed</span>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
