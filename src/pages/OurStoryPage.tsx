import React from 'react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE, LIFESTYLE_PAUSE_IMAGE, MASALA_IMAGE, ADRAK_IMAGE } from '../data/products';
import { ArrowRight, Quote } from 'lucide-react';

export const OurStoryPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-20">
      {/* Editorial Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
          The Origin Chronicle
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#3E2A20] leading-[1.1]">
          Every cup has a story.
        </h1>
        <p className="font-handwriting text-3xl sm:text-4xl text-[#B96F4A]">
          “A journey across spice gardens, rain-slicked balconies, and unhurried mornings.”
        </p>
      </div>

      {/* Hero Editorial Visual */}
      <div className="relative aspect-16/9 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9] bg-[#E7D5BA]">
        <img
          src={HERO_IMAGE}
          alt="Artisanal chai table with steam and spices"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3E2A20]/80 via-transparent to-transparent opacity-90" />
        <div className="absolute bottom-6 left-6 right-6 text-white max-w-xl">
          <span className="text-xs uppercase tracking-wider text-[#E7D5BA] font-semibold block mb-1">
            Jaipur, Rajasthan · 2024
          </span>
          <p className="font-serif text-xl sm:text-2xl font-medium leading-snug">
            Where whole spices meet slow fire, memory transforms into something you can hold.
          </p>
        </div>
      </div>

      {/* Chapter 1: The Beginning & The Inspiration */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-serif text-4xl sm:text-5xl font-bold text-[#B96F4A]">
            01
          </span>
          <div className="h-6 w-px bg-[#E7D5BA]" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2A20]">
            The Beginning & The Inspiration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          <div className="md:col-span-7 space-y-4 text-base text-[#3E2A20]/85 leading-relaxed font-light">
            <p>
              Sukoon Chai did not begin in a corporate board room or with market analysis spreadsheets. It began with an ache for something that seemed to be slipping away: the quiet pause.
            </p>
            <p>
              As modern work lives accelerated into endless video calls, unread notifications, and instant coffee packets swallowed while typing, we noticed our own days felt breathless. The simple ritual that our parents and grandparents had anchored their entire lives around—boiling chai on the stove at 7 AM and 4 PM—had been reduced to a hurried convenience.
            </p>
            <p>
              We wanted to bring reverence back to the pot. To honor the ancient rhythm of waiting for water to boil, watching tea leaves dance, and taking that first unhurried sip while the world waits outside.
            </p>
          </div>

          <div className="md:col-span-5 aspect-4/3 rounded-2xl overflow-hidden border border-[#E7D5BA] bg-[#E7D5BA] shadow-md">
            <img
              src={LIFESTYLE_PAUSE_IMAGE}
              alt="Moment of tea pause"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <div className="p-8 sm:p-12 bg-[#FFF9F0] border-l-4 border-[#B96F4A] rounded-r-3xl border-y border-r border-[#E7D5BA] relative">
        <Quote className="w-10 h-10 text-[#E7D5BA] absolute top-6 right-6 pointer-events-none" />
        <p className="font-serif text-xl sm:text-2xl text-[#3E2A20] italic leading-relaxed mb-3">
          “You cannot rush chai. If you turn the fire too high, it boils over. If you take it off too early, the spices sleep. Chai teaches patience to those who listen.”
        </p>
        <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-bold block">
          — Notes from the Sukoon Tasting Kitchen
        </span>
      </div>

      {/* Chapter 2: The Indian Chai Culture */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-serif text-4xl sm:text-5xl font-bold text-[#B96F4A]">
            02
          </span>
          <div className="h-6 w-px bg-[#E7D5BA]" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2A20]">
            The Indian Chai Culture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          <div className="md:col-span-5 aspect-4/3 rounded-2xl overflow-hidden border border-[#E7D5BA] bg-[#E7D5BA] shadow-md order-2 md:order-1">
            <img
              src={MASALA_IMAGE}
              alt="Spices and tea blend"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="md:col-span-7 space-y-4 text-base text-[#3E2A20]/85 leading-relaxed font-light order-1 md:order-2">
            <p>
              In India, tea is inextricably woven into the social fabric. It is sold in clay kulhads at dusty railway junctions. It is offered to guests before a contract is signed. It is poured into glass cuttings outside college gates where dreams are debated.
            </p>
            <p>
              Yet many mass-market brands had turned to synthetic liquid essences, tea dust sweepings, and heavily packaged plastics. We set out to prove that authentic Indian tea could be celebrated with the same aesthetic dignity and artisanal purity as fine wine or ceremonial grade matcha.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 3: Why We Created Sukoon & Our Vision */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-serif text-4xl sm:text-5xl font-bold text-[#B96F4A]">
            03
          </span>
          <div className="h-6 w-px bg-[#E7D5BA]" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2A20]">
            Why We Created Sukoon & Our Vision
          </h2>
        </div>

        <div className="space-y-4 text-base text-[#3E2A20]/85 leading-relaxed font-light">
          <p>
            We created Sukoon Chai to give modern Indians an effortless doorway into presence. Our vision is to place a tin of Sukoon in every home that values slow living, authentic culinary roots, and holistic wellness.
          </p>
          <p>
            When you purchase Sukoon Chai, you directly support smallholder spice growers in Kerala, organic ginger cultivators in Uttarakhand, and heritage tea estates in Assam who preserve sustainable farming practices.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <div className="p-8 sm:p-12 bg-[#3E2A20] text-[#FFF9F0] rounded-3xl text-center space-y-4">
        <h3 className="font-serif text-3xl sm:text-4xl font-bold">
          Will You Join Us for a Cup?
        </h3>
        <p className="font-handwriting text-2xl text-[#E7D5BA]">
          “Ek Cup, Thoda Sukoon.”
        </p>
        <p className="text-xs sm:text-sm text-[#E7D5BA]/80 max-w-md mx-auto font-light leading-relaxed">
          Order a blend today and discover why thousands consider this the most peaceful ritual of their day.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 bg-[#B96F4A] hover:bg-[#a05c3b] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore All Blends</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
