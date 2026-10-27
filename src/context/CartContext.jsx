import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMO_CODES } from '../data/products';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabaseClient';

const CartContext = createContext();



export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('snackspot_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartLoaded, setCartLoaded] = useState(false);


  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [toast, setToast] = useState(null);

  
  useEffect(() => {
    let cancelled = false;

    const loadCart = async () => {
      if (authLoading) {
      setCartLoaded(false);
      return;
      }

      if (!user) {
      setCartItems([]);
      setCartLoaded(true);
      return;
      }

      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (cancelled) return;

      if (error) {
        console.error('Could not load cart from Supabase:', error.message);
        setCartLoaded(true);
        return;
      }

      const items = (data || []).map((item) => ({
        cartId: item.cart_id,
        id: item.product_id,
        name: item.name,
        price: Number(item.price),
        originalPrice: item.original_price == null
          ? undefined
          : Number(item.original_price),
        weight: item.weight,
        image: item.image,
        quantity: item.quantity
      }));

      setCartItems(items);
      setCartLoaded(true);
    };

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);


  
useEffect(() => {
  if (authLoading || !cartLoaded) return;

  try {
    localStorage.setItem('snackspot_cart', JSON.stringify(cartItems));
  } catch (e) {
    console.warn('Could not save cart', e);
  }
}, [cartItems, authLoading, cartLoaded]);


useEffect(() => {
  if (authLoading || !cartLoaded || !user) return;

  const saveCart = async () => {
      console.log("Saving cart to Supabase:", cartItems);

    const rows = cartItems.map((item) => ({
      user_id: user.id,
      cart_id: item.cartId,
      product_id: item.id,
      name: item.name,
      price: item.price,
      original_price: item.originalPrice ?? null,
      weight: item.weight ?? null,
      image: item.image ?? null,
      quantity: item.quantity
    }));

    if (rows.length > 0) {
  const { error: saveError } = await supabase
    .from('cart_items')
    .upsert(rows, {
      onConflict: 'user_id,cart_id'
    });

  if (saveError) {
    console.error('Could not save cart:', saveError.message);
  }
} else {
  const { error: deleteError } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id);

  if (deleteError) {
    console.error('Could not clear saved cart:', deleteError.message);
  }
}
  };

  saveCart();
}, [cartItems, authLoading, cartLoaded, user]);




  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3200);
  };

  const addToCart = (product, weightOption = null, qty = 1) => {
    const selectedOption = weightOption || product.weightOptions?.[0] || { label: 'Standard Pack', price: product.price };
    const cartId = `${product.id}-${selectedOption.label}`;

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.cartId === cartId);
      if (existing) {
        return prevItems.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prevItems,
        {
          cartId,
          id: product.id,
          name: product.name,
          price: selectedOption.price || product.price,
          originalPrice: product.originalPrice,
          weight: selectedOption.label,
          image: product.image,
          quantity: qty
        }
      ];
    });

    showToast(`Added "${product.name}" to cart!`, 'cart');
  };

  const updateQuantity = (cartId, qty) => {
    if (qty <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (codeStr) => {
    const code = codeStr.trim().toUpperCase();
    setCouponError('');
    const coupon = PROMO_CODES[code];
    if (!coupon) {
      setCouponError('Invalid coupon code. Try SNACKFIRST or CRUNCH20');
      return false;
    }
    if (subtotal < (coupon.minOrder || 0)) {
      setCouponError(`Min order of ₹${coupon.minOrder} required for ${code}`);
      return false;
    }
    setAppliedCoupon({ code, ...coupon });
    showToast(`Coupon "${code}" applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
    showToast('Coupon removed', 'info');
  };

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon?.discountPercent) {
    if (subtotal >= (appliedCoupon.minOrder || 0)) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    }
  }

  const freeDeliveryThreshold = 499;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold || appliedCoupon?.freeDelivery;
  const deliveryFee = cartItems.length === 0 ? 0 : isFreeDelivery ? 0 : 49;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
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
        couponError,
        toast,
        showToast,
        setToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
