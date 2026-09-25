import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { OrderAddress } from '../types';
import { ShieldCheck, ArrowRight, CheckCircle2, CreditCard, Smartphone, Banknote, Lock } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, cartTotal, discount, shipping, placeOrder, navigateTo } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address & Customer Info
  const [address, setAddress] = useState<OrderAddress>({
    fullName: 'Pooja Kulkarni',
    phone: '+91 98201 12345',
    email: 'pooja.k@gmail.com',
    addressLine1: 'Flat 301, Rosewood Manor, Indiranagar 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('pooja@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 px-4 max-w-xl mx-auto text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#3E2A20]">
          Your bag is empty
        </h2>
        <p className="text-xs sm:text-sm text-[#3E2A20]/70">
          Please add at least one tea blend before checking out.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 bg-[#3E2A20] text-white text-xs font-semibold rounded-xl"
        >
          Browse Chai
        </button>
      </div>
    );
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!address.fullName || !address.email || !address.phone) return;
      setStep(2);
    } else if (step === 2) {
      if (!address.addressLine1 || !address.city || !address.state || !address.pincode) return;
      setStep(3);
    } else if (step === 3) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        placeOrder(address, paymentMethod);
      }, 1200);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Checkout Steps Progress Indicator */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E7D5BA] -translate-y-1/2 z-0" />
          {[
            { num: 1, label: 'Customer Details' },
            { num: 2, label: 'Shipping Address' },
            { num: 3, label: 'Payment Method' },
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-serif transition-colors ${
                  step === s.num
                    ? 'bg-[#3E2A20] text-[#FFF9F0] ring-4 ring-[#E7D5BA]'
                    : step > s.num
                    ? 'bg-[#7B8665] text-white'
                    : 'bg-[#FFFDF9] text-[#3E2A20]/60 border border-[#E7D5BA]'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`text-[11px] font-medium mt-1.5 whitespace-nowrap ${
                  step === s.num ? 'text-[#3E2A20] font-bold' : 'text-[#3E2A20]/60'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Multi-step inputs */}
        <div className="lg:col-span-7 bg-[#FFFDF9] border border-[#E7D5BA] rounded-3xl p-6 sm:p-10 shadow-xs">
          <form onSubmit={handleNextStep} className="space-y-6">
            {/* STEP 1: CUSTOMER DETAILS */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="border-b border-[#E7D5BA]/60 pb-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#B96F4A] font-semibold">
                    Step 1 of 3
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#3E2A20]">
                    Customer Information
                  </h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#3E2A20] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#3E2A20] block mb-1">
                        Email (for order invoice & updates) *
                      </label>
                      <input
                        type="email"
                        required
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#3E2A20] block mb-1">
                        Mobile Phone (for delivery SMS) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Continue to Shipping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING ADDRESS */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="border-b border-[#E7D5BA]/60 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#B96F4A] font-semibold">
                      Step 2 of 3
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#3E2A20]">
                      Shipping Address
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#B96F4A] underline"
                  >
                    Edit Customer Info
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#3E2A20] block mb-1">
                      Street Address, Flat / Apartment / House No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={address.addressLine1}
                      onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#3E2A20] block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#3E2A20] block mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#3E2A20] block mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#3E2A20]/70 hover:underline"
                  >
                    Back to Details
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="border-b border-[#E7D5BA]/60 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#B96F4A] font-semibold">
                      Step 3 of 3
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#3E2A20]">
                      Payment Selection
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-[#B96F4A] underline"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Important Demo Disclaimer */}
                <div className="p-3.5 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20]/80 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#B96F4A] shrink-0" />
                  <span>
                    <strong>Demo Simulation:</strong> No real bank charges or credit cards are debited. You can safely test completing your order with any payment method.
                  </span>
                </div>

                <div className="space-y-3">
                  {/* UPI Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'bg-[#FFF9F0] border-[#B96F4A] ring-2 ring-[#B96F4A]/20'
                        : 'bg-white border-[#E7D5BA] hover:bg-[#FFF9F0]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="mt-1 text-[#B96F4A]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-[#B96F4A]" />
                        <span className="font-bold text-sm text-[#3E2A20]">UPI (Google Pay, PhonePe, Paytm)</span>
                      </div>
                      <p className="text-xs text-[#3E2A20]/70 mt-0.5">
                        Instant zero-fee transfer via any UPI app.
                      </p>
                      {paymentMethod === 'UPI' && (
                        <div className="mt-3">
                          <input
                            type="text"
                            placeholder="Enter UPI VPA (e.g. mobile@upi)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full px-3.5 py-2 text-xs bg-white border border-[#E7D5BA] rounded-xl focus:outline-none focus:border-[#B96F4A]"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Card Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'Card'
                        ? 'bg-[#FFF9F0] border-[#B96F4A] ring-2 ring-[#B96F4A]/20'
                        : 'bg-white border-[#E7D5BA] hover:bg-[#FFF9F0]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="mt-1 text-[#B96F4A]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#3E2A20]" />
                        <span className="font-bold text-sm text-[#3E2A20]">Credit / Debit Card</span>
                      </div>
                      <p className="text-xs text-[#3E2A20]/70 mt-0.5">
                        Visa, Mastercard, RuPay, and American Express.
                      </p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'bg-[#FFF9F0] border-[#B96F4A] ring-2 ring-[#B96F4A]/20'
                        : 'bg-white border-[#E7D5BA] hover:bg-[#FFF9F0]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="mt-1 text-[#B96F4A]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#7B8665]" />
                        <span className="font-bold text-sm text-[#3E2A20]">Cash on Delivery (COD)</span>
                      </div>
                      <p className="text-xs text-[#3E2A20]/70 mt-0.5">
                        Pay cash or UPI directly to the courier upon parcel arrival.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-[#3E2A20]/70 hover:underline"
                  >
                    Back to Address
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-4 bg-[#B96F4A] hover:bg-[#a05c3b] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Placing Your Order...</span>
                    ) : (
                      <>
                        <span>Complete Order (₹{cartTotal})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-[#3E2A20]">
              Order Items ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>

            <div className="divide-y divide-[#E7D5BA]/60 max-h-64 overflow-y-auto space-y-3">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedWeight}`}
                  className="pt-3 first:pt-0 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-white"
                    />
                    <div>
                      <span className="font-bold text-[#3E2A20] block line-clamp-1">{item.product.name}</span>
                      <span className="text-[#3E2A20]/60 text-[11px]">
                        {item.selectedWeight} × {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums font-bold text-[#3E2A20]">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E7D5BA] space-y-1.5 text-xs text-[#3E2A20]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums font-medium">₹{cartSubtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#B96F4A]">
                  <span>Applied Discount</span>
                  <span className="font-mono tabular-nums">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">
                  {shipping === 0 ? <span className="text-[#667052] font-bold">FREE</span> : `₹${shipping}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E7D5BA] flex justify-between text-base font-bold text-[#3E2A20]">
                <span className="font-serif">Total to Pay</span>
                <span className="font-serif text-lg font-mono tabular-nums text-[#3E2A20]">
                  ₹{cartTotal}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
