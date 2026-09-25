import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartTotal,
    discount,
    shipping,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
    addToCart,
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg(res.message);
    if (res.success) setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 px-4 max-w-4xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#F3E8D5] text-[#B96F4A] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3E2A20]">
          Your Sukoon cup is waiting.
        </h1>
        <p className="text-sm sm:text-base text-[#3E2A20]/75 max-w-md mx-auto font-light leading-relaxed">
          Your shopping bag is currently empty. Start by discovering our artisanal single-estate tea blends.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2 shadow-md"
        >
          <span>EXPLORE CHAI</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2A20]">
          Your Shopping Bag
        </h1>
        <p className="text-xs sm:text-sm text-[#3E2A20]/70 mt-1">
          Review your chosen blends before proceeding to secure checkout.
        </p>
      </div>

      {/* Free Shipping Meter */}
      <div className="p-4 sm:p-5 bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl mb-8">
        {amountNeeded > 0 ? (
          <p className="text-xs sm:text-sm text-[#3E2A20] font-medium mb-2">
            Add <strong className="text-[#B96F4A] font-mono">₹{amountNeeded}</strong> more to qualify for <strong>Complimentary Express Delivery</strong> across India.
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-[#667052] font-semibold mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#7B8665]" /> You have unlocked Free Express Shipping!
          </p>
        )}
        <div className="w-full bg-[#E7D5BA] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#B96F4A] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#FFFDF9] border border-[#E7D5BA] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="divide-y divide-[#E7D5BA]/60">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedWeight}`}
                  className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl bg-[#F3E8D5] shrink-0"
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B96F4A] font-semibold">
                        {item.product.category}
                      </span>
                      <h3
                        onClick={() => navigateTo('product-details', item.product.id)}
                        className="font-serif text-lg font-bold text-[#3E2A20] hover:text-[#B96F4A] cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-[#3E2A20]/60">
                        Packaging Size: {item.selectedWeight}
                      </p>
                      <span className="text-xs font-mono tabular-nums text-[#3E2A20]/80 block mt-1">
                        ₹{item.unitPrice} per unit
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#E7D5BA] rounded-xl bg-white p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)
                        }
                        className="p-1 hover:bg-[#F3E8D5] text-[#3E2A20] transition-colors rounded-lg"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)
                        }
                        className="p-1 hover:bg-[#F3E8D5] text-[#3E2A20] transition-colors rounded-lg"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total */}
                    <span className="font-serif text-lg font-bold text-[#3E2A20] font-mono tabular-nums">
                      ₹{item.unitPrice * item.quantity}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                      className="text-[#3E2A20]/40 hover:text-red-600 transition-colors p-2"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E7D5BA] flex items-center justify-between">
              <button
                onClick={clearCart}
                className="text-xs text-[#3E2A20]/60 hover:text-red-600 underline"
              >
                Clear Entire Bag
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs text-[#B96F4A] hover:underline font-semibold"
              >
                + Add More Blends
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-[#3E2A20]">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-[#7B8665]/15 border border-[#7B8665]/40 rounded-xl text-xs text-[#3E2A20]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5 text-[#7B8665]" />
                    <span>Coupon <strong>{appliedCoupon}</strong> active</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 bg-white border border-[#E7D5BA] rounded-xl text-xs focus:outline-none focus:border-[#B96F4A]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#3E2A20] text-white text-xs font-semibold rounded-xl hover:bg-[#B96F4A] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <span className="text-[10px] text-[#3E2A20]/50 block">Try SUKOON10 or EKCUP</span>
                </form>
              )}
              {couponMsg && (
                <p className="text-[11px] text-[#B96F4A] mt-1 font-medium">{couponMsg}</p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-[#3E2A20]/80 pt-2 border-t border-[#E7D5BA]/60">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span className="font-mono tabular-nums font-semibold">₹{cartSubtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#B96F4A] font-semibold">
                  <span>Coupon Savings</span>
                  <span className="font-mono tabular-nums">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Bluedart Shipping</span>
                <span className="font-mono tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-[#667052] font-semibold">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-[#E7D5BA] flex justify-between text-lg font-bold text-[#3E2A20]">
                <span className="font-serif">Estimated Total</span>
                <span className="font-serif text-xl font-mono tabular-nums text-[#3E2A20]">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-4 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-[#3E2A20]/60 text-center">
              🔒 Guaranteed safe and encrypted Indian checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
