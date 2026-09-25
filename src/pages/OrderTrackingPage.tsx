import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, CheckCircle2, Clock, Truck, Package, Home, ChevronRight } from 'lucide-react';
import { Order } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders, currentOrder, lookupOrder } = useShop();

  const initialOrder = currentOrder || orders[0];
  const [searchInput, setSearchInput] = useState(initialOrder ? initialOrder.id : 'SKN-90284');
  const [activeOrder, setActiveOrder] = useState<Order | undefined>(initialOrder);
  const [simulatedStatus, setSimulatedStatus] = useState<
    'Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered'
  >(initialOrder ? initialOrder.status : 'Shipped');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = lookupOrder(searchInput);
    if (found) {
      setActiveOrder(found);
      setSimulatedStatus(found.status);
    } else {
      // Create fallback view for lookup test
      alert(`No order found matching "${searchInput}". Showing demo order SKN-90284.`);
      if (orders[0]) {
        setActiveOrder(orders[0]);
        setSimulatedStatus(orders[0].status);
      }
    }
  };

  const TRACKING_STEPS = [
    {
      id: 'Placed',
      title: 'Order Placed',
      description: 'Order confirmed & sent to Jaipur tea atelier.',
      time: 'Yesterday, 5:30 PM',
      icon: Clock,
    },
    {
      id: 'Packed',
      title: 'Artisanally Packed',
      description: 'Single-estate tea sealed in airtight aroma pouch.',
      time: 'Today, 9:15 AM',
      icon: Package,
    },
    {
      id: 'Shipped',
      title: 'In Express Transit',
      description: 'Dispatched via Bluedart Express Air cargo.',
      time: 'Today, 2:40 PM',
      icon: Truck,
    },
    {
      id: 'Out for Delivery',
      title: 'Out for Delivery',
      description: 'Courier agent is on route to your doorstep.',
      time: 'Expected Tomorrow, 11:00 AM',
      icon: Truck,
    },
    {
      id: 'Delivered',
      title: 'Delivered',
      description: 'Safely handed over. Time for sukoon!',
      time: 'Estimated Tomorrow, 2:00 PM',
      icon: Home,
    },
  ];

  const currentStepIndex = TRACKING_STEPS.findIndex((s) => s.id === simulatedStatus);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
          Live Shipment Status
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#3E2A20]">
          Track Your Sukoon
        </h1>
        <p className="text-xs sm:text-sm text-[#3E2A20]/75 font-light">
          Enter your Order ID or Courier Tracking number to view live journey updates.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#B96F4A] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. SKN-90284"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#FFFDF9] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A] font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Track
          </button>
        </form>

        <div className="mt-2 text-center text-[11px] text-[#3E2A20]/60">
          Try clicking demo ID:{' '}
          <button
            type="button"
            onClick={() => {
              setSearchInput('SKN-90284');
              if (orders[0]) setActiveOrder(orders[0]);
            }}
            className="text-[#B96F4A] font-mono font-semibold underline"
          >
            SKN-90284
          </button>
        </div>
      </div>

      {activeOrder && (
        <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-10 shadow-xs space-y-10">
          {/* Order Snapshot Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7D5BA]/60">
            <div>
              <span className="text-xs text-[#3E2A20]/60 block mb-0.5">Order Tracking</span>
              <h2 className="font-serif text-2xl font-bold text-[#3E2A20] flex items-center gap-2">
                <span>{activeOrder.id}</span>
                <span className="text-xs font-sans font-normal text-[#7B8665] bg-[#7B8665]/10 px-2.5 py-0.5 rounded-full">
                  Status: {simulatedStatus}
                </span>
              </h2>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-[#3E2A20]/60 block mb-0.5">Airway Bill (AWB)</span>
              <span className="font-mono text-xs font-bold text-[#B96F4A]">
                {activeOrder.trackingNumber}
              </span>
            </div>
          </div>

          {/* Interactive Status Simulation Switcher */}
          <div className="p-4 bg-white/70 rounded-2xl border border-[#E7D5BA] space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-[#3E2A20]/70 font-semibold block">
              Demo Interactive Simulation (Test All Tracking States):
            </span>
            <div className="flex flex-wrap gap-2">
              {(['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'] as const).map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => setSimulatedStatus(st)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      simulatedStatus === st
                        ? 'bg-[#3E2A20] text-[#FFF9F0] shadow-xs'
                        : 'bg-white text-[#3E2A20] border border-[#E7D5BA] hover:bg-[#F3E8D5]'
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Visual Step Timeline */}
          <div className="relative py-4">
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:h-full before:w-0.5 before:bg-[#E7D5BA]">
              {TRACKING_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="relative flex items-start gap-5">
                    {/* Step Icon Badge */}
                    <div
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isCurrent
                          ? 'bg-[#B96F4A] text-white ring-4 ring-[#B96F4A]/20 scale-110 shadow-md'
                          : isPassed
                          ? 'bg-[#7B8665] text-white'
                          : 'bg-[#FFFDF9] text-[#3E2A20]/40 border border-[#E7D5BA]'
                      }`}
                    >
                      {isPassed && !isCurrent ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 bg-white p-4 rounded-2xl border border-[#E7D5BA]/80 shadow-2xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4
                          className={`font-serif text-base font-bold ${
                            isCurrent ? 'text-[#B96F4A]' : 'text-[#3E2A20]'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[11px] text-[#3E2A20]/50 font-mono">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#3E2A20]/75 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Address & Contents Summary */}
          <div className="pt-6 border-t border-[#E7D5BA]/60 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#3E2A20]/80">
            <div>
              <span className="font-bold uppercase tracking-wider text-[#3E2A20] block mb-1">
                Destination Address:
              </span>
              <p className="font-semibold text-[#3E2A20]">{activeOrder.address.fullName}</p>
              <p>{activeOrder.address.addressLine1}</p>
              <p>
                {activeOrder.address.city}, {activeOrder.address.state} - {activeOrder.address.pincode}
              </p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-[#3E2A20] block mb-1">
                Parcel Contents:
              </span>
              <ul className="space-y-1">
                {activeOrder.items.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {item.product.name} ({item.selectedWeight}) × {item.quantity}
                    </span>
                    <span className="font-mono">₹{item.unitPrice * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
