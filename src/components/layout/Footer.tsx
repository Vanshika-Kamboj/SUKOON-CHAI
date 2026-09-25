import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Instagram, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#3E2A20] text-[#FFF9F0] border-t border-[#3E2A20] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter / Brand Banner */}
        <div className="bg-[#322219] rounded-3xl p-8 sm:p-12 mb-16 border border-[#52382c] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
              The Sukoon Circle
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFF9F0] mt-1 mb-2">
              Stay for the Sukoon.
            </h3>
            <p className="text-sm text-[#E7D5BA]/80 leading-relaxed font-light">
              Get unhurried tea stories, quiet morning rituals, new seasonal garden harvests, and little moments of calm delivered gently to your inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px] max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 p-4 bg-[#7B8665]/20 border border-[#7B8665] rounded-xl text-xs text-[#E7D5BA]">
                <CheckCircle2 className="w-4 h-4 text-[#7B8665] shrink-0" />
                <span>Welcome to the Circle. May your upcoming mornings be slow and peaceful.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 text-xs bg-[#241710] border border-[#52382c] rounded-xl text-[#FFF9F0] placeholder:text-[#E7D5BA]/40 focus:outline-none focus:border-[#B96F4A]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#B96F4A] hover:bg-[#a05c3b] text-white text-xs font-medium rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#E7D5BA]/50 mt-2 text-center lg:text-left">
              No spam, ever. Only tea poetry and private invitations.
            </p>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#52382c]/80">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-3xl font-bold tracking-tight text-[#FFFDF9]">
              Sukoon Chai
            </span>
            <p className="font-handwriting text-2xl text-[#E7D5BA]">
              “Ek Cup, Thoda Sukoon.”
            </p>
            <p className="text-xs text-[#E7D5BA]/80 max-w-sm leading-relaxed font-light">
              Sukoon Chai is a modern Indian tea brand honoring the pause. More Than a Tea. It’s a Feeling. Artisanal single-estate CTC and whole spices crafted for mindful everyday living.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-[#E7D5BA]">
              <Instagram className="w-4 h-4 text-[#B96F4A]" />
              <a
                href="https://instagram.com/sukoon.chai_"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FFFDF9] transition-colors underline"
              >
                @sukoon.chai_
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
              Shop Tea
            </h4>
            <ul className="space-y-2 text-xs text-[#E7D5BA]/80">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#FFFDF9] transition-colors">
                  All Blends
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#FFFDF9] transition-colors">
                  Premium Masala Chai
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#FFFDF9] transition-colors">
                  Classic Adrak Chai
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#FFFDF9] transition-colors">
                  Tulsi Green Tea
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('categories')} className="hover:text-[#FFFDF9] transition-colors">
                  Gift Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
              Discover
            </h4>
            <ul className="space-y-2 text-xs text-[#E7D5BA]/80">
              <li>
                <button onClick={() => navigateTo('our-story')} className="hover:text-[#FFFDF9] transition-colors">
                  Our Story & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#FFFDF9] transition-colors">
                  About Sukoon
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tea-experience')} className="hover:text-[#FFFDF9] transition-colors">
                  Leaf to Cup Journey
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tea-experience')} className="hover:text-[#FFFDF9] transition-colors">
                  Brewing Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('journal')} className="hover:text-[#FFFDF9] transition-colors">
                  Chai Journal & Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Service */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
              Care & Help
            </h4>
            <ul className="space-y-2 text-xs text-[#E7D5BA]/80">
              <li>
                <button onClick={() => navigateTo('order-tracking')} className="hover:text-[#FFFDF9] transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#FFFDF9] transition-colors">
                  Contact Over Chai
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#FFFDF9] transition-colors">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-[#FFFDF9] transition-colors">
                  My Account
                </button>
              </li>
              <li className="pt-2 text-[11px] text-[#E7D5BA]/60 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B96F4A]" />
                Jaipur & New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E7D5BA]/60">
          <div>
            © 2026 Sukoon Chai. All rights reserved. Handcrafted with reverence for Indian tea culture.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('contact')} className="hover:underline">
              Privacy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigateTo('contact')} className="hover:underline">
              Terms
            </button>
            <span aria-hidden="true">·</span>
            <span className="text-[#B96F4A]">“Sip. Relax. Repeat.”</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
