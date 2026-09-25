import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, ArrowRight, Package, Truck, Calendar, MapPin } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { currentOrder, orders, navigateTo } = useShop();

  const order = currentOrder || orders[0];

  if (!order) {
    return (
      <div className="py-20 px-4 max-w-lg mx-auto text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#3E2A20]">No recent orders found</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 bg-[#3E2A20] text-white text-xs font-semibold rounded-xl"
        >
          Explore Chai
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Celebration Header */}
      <div className="text-center space-y-4">
        <div className="w-18 h-18 rounded-full bg-[#7B8665]/20 text-[#7B8665] flex items-center justify-center mx-auto ring-8 ring-[#7B8665]/10 animate-in zoom-in duration-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-bold">
          Order Placed Successfully
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3E2A20]">
          Your Sukoon is on its way.
        </h1>

        <p className="font-handwriting text-2xl sm:text-3xl text-[#B96F4A]">
          “Ek Cup, Thoda Sukoon.”
        </p>

        <p className="text-xs sm:text-sm text-[#3E2A20]/80 max-w-md mx-auto font-light leading-relaxed">
          We have received your order and our Jaipur blending atelier is carefully packing your tea in fresh aroma-seal pouches.
        </p>
      </div>

      {/* Order Highlights Box */}
      <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#E7D5BA]/60 text-xs">
          <div>
            <span className="text-[#3E2A20]/60 block mb-0.5">Order Number</span>
            <span className="font-mono font-bold text-sm text-[#3E2A20]">{order.id}</span>
          </div>
          <div>
            <span className="text-[#3E2A20]/60 block mb-0.5">Estimated Delivery</span>
            <span className="font-semibold text-sm text-[#3E2A20]">{order.estimatedDelivery}</span>
          </div>
          <div>
            <span className="text-[#3E2A20]/60 block mb-0.5">Payment Method</span>
            <span className="font-semibold text-sm text-[#3E2A20]">{order.paymentMethod}</span>
          </div>
          <div>
            <span className="text-[#3E2A20]/60 block mb-0.5">Total Paid</span>
            <span className="font-serif font-bold text-base text-[#3E2A20] font-mono tabular-nums">
              ₹{order.total}
            </span>
          </div>
        </div>

        {/* Shipping details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#3E2A20]/80">
          <div className="space-y-1">
            <span className="font-bold text-[#3E2A20] uppercase tracking-wider block mb-1">
              Shipping Address:
            </span>
            <p className="font-medium text-[#3E2A20]">{order.address.fullName}</p>
            <p>{order.address.addressLine1}</p>
            <p>
              {order.address.city}, {order.address.state} - {order.address.pincode}
            </p>
            <p>Phone: {order.address.phone}</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-[#3E2A20] uppercase tracking-wider block mb-1">
              Express Courier Details:
            </span>
            <p>Carrier: Bluedart Express Air</p>
            <p className="font-mono text-[#B96F4A] font-semibold">
              AWB: {order.trackingNumber}
            </p>
            <p className="text-[11px] text-[#3E2A20]/60">
              SMS updates will be sent to {order.address.phone} at each transit checkpoint.
            </p>
          </div>
        </div>

        {/* Items List */}
        <div className="pt-4 border-t border-[#E7D5BA]/60 space-y-3">
          <span className="font-bold text-xs text-[#3E2A20] uppercase tracking-wider block">
            Items in This Order:
          </span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-10 h-10 rounded-lg object-cover bg-white"
                />
                <div>
                  <span className="font-medium text-[#3E2A20] block">{item.product.name}</span>
                  <span className="text-[#3E2A20]/60 text-[11px]">
                    {item.selectedWeight} × {item.quantity}
                  </span>
                </div>
              </div>
              <span className="font-mono tabular-nums font-semibold">
                ₹{item.unitPrice * item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => navigateTo('order-tracking')}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4" />
          <span>TRACK THIS ORDER</span>
        </button>

        <button
          onClick={() => navigateTo('shop')}
          className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#3E2A20]/40 text-[#3E2A20] hover:bg-[#E7D5BA]/30 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};
