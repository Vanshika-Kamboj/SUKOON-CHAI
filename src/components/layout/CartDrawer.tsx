import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    discount,
    shipping,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    closeCartDrawer();
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-[#3E2A20]/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col justify-between border-l border-[#E7D5BA]">
          {/* Header */}
          <div className="p-6 border-b border-[#E7D5BA]/60 flex items-center justify-between bg-[#FFF9F0]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B96F4A]" />
              <h3 className="font-serif text-xl font-bold text-[#3E2A20]">
                Your Sukoon Bag
              </h3>
              <span className="text-xs text-[#3E2A20]/60 font-mono tabular-nums">
                ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-1.5 rounded-full text-[#3E2A20]/60 hover:text-[#3E2A20] hover:bg-[#E7D5BA]/40 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#F3E8D5]/60 border-b border-[#E7D5BA]/50 text-xs">
            {amountNeeded > 0 ? (
              <p className="text-[#3E2A20] font-medium mb-1.5">
                Add <span className="text-[#B96F4A] font-bold font-mono">₹{amountNeeded}</span> more for <strong className="text-[#3E2A20]">Free Express Delivery</strong>
              </p>
            ) : (
              <p className="text-[#667052] font-semibold mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> You have unlocked Free Express Shipping!
              </p>
            )}
            <div className="w-full bg-[#E7D5BA] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#B96F4A] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F3E8D5] flex items-center justify-center text-[#B96F4A] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#3E2A20] mb-2">
                  Your Sukoon cup is waiting.
                </h4>
                <p className="text-xs text-[#3E2A20]/70 max-w-xs mb-6 leading-relaxed">
                  Your bag is currently empty. Explore our small-batch Indian tea blends and find your everyday calm.
                </p>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigateTo('shop');
                  }}
                  className="px-6 py-3 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Explore Chai
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedWeight}`}
                  className="flex gap-4 p-3.5 bg-[#FFF9F0] border border-[#E7D5BA]/70 rounded-xl relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 object-cover rounded-lg bg-[#F3E8D5] shrink-0"
                    loading="lazy"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            closeCartDrawer();
                            navigateTo('product-details', item.product.id);
                          }}
                          className="font-serif text-sm font-bold text-[#3E2A20] hover:text-[#B96F4A] cursor-pointer line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                          className="text-[#3E2A20]/40 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#3E2A20]/60">
                        Weight: {item.selectedWeight}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#E7D5BA] rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)
                          }
                          className="p-1 hover:bg-[#F3E8D5] text-[#3E2A20] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)
                          }
                          className="p-1 hover:bg-[#F3E8D5] text-[#3E2A20] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="font-serif font-bold text-sm text-[#3E2A20] font-mono tabular-nums">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E7D5BA] bg-[#FFF9F0] space-y-4">
              {/* Promo code box */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#7B8665]/15 border border-[#7B8665]/40 rounded-xl text-xs text-[#3E2A20]">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-[#7B8665]" />
                      <span>Code <strong>{appliedCoupon}</strong> active</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code (Try SUKOON10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-[#E7D5BA] rounded-xl placeholder:text-[#3E2A20]/40 focus:outline-none focus:border-[#B96F4A]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#E7D5BA] hover:bg-[#d8c19f] text-[#3E2A20] text-xs font-medium rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#3E2A20]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-medium">₹{cartSubtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#B96F4A]">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-[#667052] font-semibold">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E7D5BA] flex justify-between text-base font-bold text-[#3E2A20]">
                  <span className="font-serif">Estimated Total</span>
                  <span className="font-serif font-mono tabular-nums text-lg text-[#3E2A20]">
                    ₹{cartTotal}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigateTo('cart');
                  }}
                  className="py-3 border border-[#3E2A20] text-[#3E2A20] hover:bg-[#F3E8D5] rounded-xl text-xs font-semibold text-center transition-colors cursor-pointer"
                >
                  View Cart Page
                </button>
                <button
                  onClick={handleProceedCheckout}
                  className="py-3 bg-[#3E2A20] hover:bg-[#B96F4A] text-[#FFF9F0] rounded-xl text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
