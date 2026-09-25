import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { User, Package, Heart, MapPin, ShoppingBag, ArrowRight, Check } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, addToCart, toggleWishlist, navigateTo } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile' | 'addresses'>('orders');

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#3E2A20] text-[#FFF9F0] flex items-center justify-center font-serif text-2xl font-bold">
            P
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2A20]">
              Pooja Kulkarni
            </h1>
            <p className="text-xs text-[#3E2A20]/60">
              pooja.k@gmail.com · Sukoon Member since 2024
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('shop')}
          className="px-5 py-2.5 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Explore New Teas
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E7D5BA] overflow-x-auto">
        {[
          { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
          { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
          { id: 'profile', label: 'Profile Details', icon: User },
          { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-6 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors relative cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#B96F4A] border-b-2 border-[#B96F4A]'
                  : 'text-[#3E2A20]/60 hover:text-[#3E2A20]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl">
              <p className="font-serif text-xl font-bold text-[#3E2A20] mb-2">No orders placed yet</p>
              <p className="text-xs text-[#3E2A20]/70 mb-4">Discover our handcrafted Indian chai blends.</p>
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-2.5 bg-[#3E2A20] text-white text-xs font-semibold rounded-xl"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-[#FFFDF9] border border-[#E7D5BA] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E7D5BA]/60 text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#3E2A20] text-sm mr-2">{ord.id}</span>
                    <span className="text-[#3E2A20]/60">Ordered on {ord.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-[#7B8665] bg-[#7B8665]/10 px-2.5 py-0.5 rounded-full">
                      {ord.status}
                    </span>
                    <span className="font-serif font-bold text-sm text-[#3E2A20] font-mono tabular-nums">
                      ₹{ord.total}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {ord.items.map((it, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={it.product.image}
                          alt={it.product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-[#F3E8D5]"
                        />
                        <div>
                          <span className="font-bold text-[#3E2A20] block">{it.product.name}</span>
                          <span className="text-[#3E2A20]/60 text-[11px]">
                            {it.selectedWeight} · Qty: {it.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono tabular-nums font-semibold">
                        ₹{it.unitPrice * it.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E7D5BA]/60 flex items-center justify-between text-xs">
                  <span className="text-[#3E2A20]/60 font-mono">
                    AWB: {ord.trackingNumber}
                  </span>
                  <button
                    onClick={() => navigateTo('order-tracking')}
                    className="px-4 py-2 bg-[#3E2A20] hover:bg-[#B96F4A] text-white rounded-xl transition-colors font-semibold"
                  >
                    Track Shipment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistedProducts.length === 0 ? (
            <div className="p-12 text-center bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl">
              <Heart className="w-10 h-10 text-[#B96F4A] mx-auto mb-2" />
              <p className="font-serif text-xl font-bold text-[#3E2A20] mb-1">Your wishlist is empty</p>
              <p className="text-xs text-[#3E2A20]/70 mb-4">Click the heart icon on any tea to save it for later.</p>
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-2.5 bg-[#3E2A20] text-white text-xs font-semibold rounded-xl"
              >
                Explore Blends
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#FFFDF9] border border-[#E7D5BA] rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F3E8D5]">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#B96F4A]">
                      {p.category}
                    </span>
                    <h4
                      onClick={() => navigateTo('product-details', p.id)}
                      className="font-serif text-lg font-bold text-[#3E2A20] hover:text-[#B96F4A] cursor-pointer"
                    >
                      {p.name}
                    </h4>
                    <span className="font-mono text-sm font-bold text-[#3E2A20] block mt-1">
                      ₹{p.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(p)}
                      className="flex-1 py-2.5 bg-[#3E2A20] hover:bg-[#B96F4A] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2.5 border border-[#E7D5BA] hover:bg-[#F3E8D5] rounded-xl text-xs text-[#3E2A20]"
                      title="Remove"
                    >
                      <Heart className="w-4 h-4 fill-[#B96F4A] text-[#B96F4A]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Profile Details */}
      {activeTab === 'profile' && (
        <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-10 max-w-xl mx-auto space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#3E2A20]">Profile Settings</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[#3E2A20]/60 block mb-1 font-semibold">Name</label>
              <input
                type="text"
                defaultValue="Pooja Kulkarni"
                className="w-full p-3 bg-white border border-[#E7D5BA] rounded-xl text-[#3E2A20]"
              />
            </div>
            <div>
              <label className="text-[#3E2A20]/60 block mb-1 font-semibold">Email</label>
              <input
                type="email"
                defaultValue="pooja.k@gmail.com"
                className="w-full p-3 bg-white border border-[#E7D5BA] rounded-xl text-[#3E2A20]"
              />
            </div>
            <div>
              <label className="text-[#3E2A20]/60 block mb-1 font-semibold">Phone</label>
              <input
                type="tel"
                defaultValue="+91 98201 12345"
                className="w-full p-3 bg-white border border-[#E7D5BA] rounded-xl text-[#3E2A20]"
              />
            </div>
          </div>
          <button className="px-6 py-2.5 bg-[#3E2A20] text-white text-xs font-semibold rounded-xl mt-2">
            Save Profile
          </button>
        </div>
      )}

      {/* Tab 4: Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#FFF9F0] border border-[#B96F4A] rounded-3xl space-y-2 relative">
            <span className="absolute top-4 right-4 text-[10px] uppercase font-bold text-[#B96F4A] bg-[#B96F4A]/10 px-2 py-0.5 rounded-full">
              Default
            </span>
            <h4 className="font-serif font-bold text-base text-[#3E2A20]">Home Sanctuary</h4>
            <p className="text-xs text-[#3E2A20]/80 leading-relaxed font-light">
              Flat 301, Rosewood Manor, Indiranagar 100ft Road, Bengaluru, Karnataka - 560038
            </p>
            <span className="text-[11px] text-[#3E2A20]/60 block pt-1">Phone: +91 98201 12345</span>
          </div>

          <div className="p-6 bg-white border border-dashed border-[#E7D5BA] rounded-3xl flex flex-col items-center justify-center text-center p-8 space-y-2 cursor-pointer hover:bg-[#FFF9F0]">
            <MapPin className="w-6 h-6 text-[#B96F4A]" />
            <span className="font-serif font-bold text-sm text-[#3E2A20]">+ Add New Delivery Address</span>
            <span className="text-[11px] text-[#3E2A20]/50">For office, studio, or vacation deliveries</span>
          </div>
        </div>
      )}
    </div>
  );
};
