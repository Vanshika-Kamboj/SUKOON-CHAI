import React, { useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, MOODS, HERO_IMAGE, LIFESTYLE_PAUSE_IMAGE } from '../data/products';
import { TESTIMONIALS } from '../data/journal';
import { ProductCard } from '../components/ui/ProductCard';
import { SteamEffect } from '../components/visuals/SteamEffect';
import { WhySukoonCircle } from '../components/visuals/WhySukoonCircle';
import { BrewingTimeline } from '../components/visuals/BrewingTimeline';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Star,
  Sparkles,
  Heart,
  Sun,
  Leaf,
  Coffee,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const featuredFour = PRODUCTS.slice(0, 4);

  return (
    <div className="w-full bg-[#F7F1E7] overflow-hidden">
      {/* ----------------------------------------------------
          SECTION 1 — HERO
          ---------------------------------------------------- */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Subtle warm morning radial light */}
        <div className="absolute inset-0 bg-radial from-[#FFF9F0] via-[#F7F1E7] to-[#EFE4D2] pointer-events-none opacity-80" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Ambient Brand Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF9F0] border border-[#E7D5BA] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#B96F4A] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#3E2A20] font-medium">
                Artisanal Indian Tea Atelier
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#3E2A20] leading-[1.08] text-balance">
              Ek Cup,
              <br />
              <span className="font-handwriting text-5xl sm:text-7xl md:text-8xl text-[#B96F4A] font-normal block mt-1">
                Thoda Sukoon.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#3E2A20]/80 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
              More Than a Tea. It’s a Feeling. Handcrafted whole-spice Indian chai blends made for quiet mornings, warm conversations, and unhurried breaths.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => navigateTo('shop')}
                className="w-full sm:w-auto px-8 py-4 bg-[#3E2A20] hover:bg-[#B96F4A] text-[#FFF9F0] text-sm font-semibold rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>SHOP CHAI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('our-story')}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#E7D5BA]/40 text-[#3E2A20] border border-[#3E2A20]/40 text-sm font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>EXPLORE OUR STORY</span>
              </button>
            </div>

            {/* Micro proof indicators */}
            <div className="pt-6 border-t border-[#E7D5BA]/60 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#3E2A20]/75">
              <div className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-[#7B8665]" />
                <span>100% Single-Estate Leaves</span>
              </div>
              <span aria-hidden="true" className="text-[#E7D5BA]">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B96F4A]" />
                <span>Real Malabar Spices</span>
              </div>
            </div>
          </div>

          {/* Right Visual Block: Cinematic Tea Lifestyle with Steam */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-4/3 sm:aspect-1/1 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9] bg-[#E7D5BA]">
              <img
                src={HERO_IMAGE}
                alt="Sukoon Chai morning tea ceremony"
                className="w-full h-full object-cover"
                loading="eager"
              />

              {/* Gentle Steam Rising Element Positioned over Cup */}
              <div className="absolute top-12 left-1/3 -translate-x-1/2">
                <SteamEffect size="lg" />
              </div>

              {/* Editorial Badge Overlay */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#FFF9F0]/92 backdrop-blur-md border border-[#E7D5BA] shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B96F4A] font-bold block">
                    Daily Morning Ritual
                  </span>
                  <span className="font-serif text-base font-bold text-[#3E2A20]">
                    Brewing Calm Across India
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#3E2A20] font-semibold bg-[#E7D5BA]/50 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-[#B96F4A] text-[#B96F4A]" />
                  <span>4.9 / 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 2 — BRAND INTRO (Editorial Two-Column)
          ---------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-[#E7D5BA]/60 bg-[#FFF9F0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Lifestyle Photo */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-3/4 rounded-3xl overflow-hidden shadow-lg border-2 border-[#E7D5BA] bg-[#E7D5BA]">
                <img
                  src={LIFESTYLE_PAUSE_IMAGE}
                  alt="Holding warm cup of Sukoon Chai"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-4 rounded-2xl bg-[#3E2A20] text-[#FFF9F0] shadow-xl max-w-xs border border-[#52382c]">
                <p className="font-handwriting text-xl text-[#E7D5BA]">
                  “A little chai. A little peace.”
                </p>
                <span className="text-[11px] text-[#FFF9F0]/70 uppercase tracking-widest block mt-1">
                  — The Sukoon Philosophy
                </span>
              </div>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="lg:col-span-7 space-y-6 lg:pl-6">
              <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
                An Invitation To Pause
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3E2A20] leading-tight">
                Some moments don’t need a reason.
                <span className="block font-normal italic text-[#B96F4A]">
                  They just need a warm cup of chai.
                </span>
              </h2>

              <p className="text-base text-[#3E2A20]/80 leading-relaxed font-light">
                In a world that glorifies speed, relentless hustle, and empty urgency, Sukoon Chai was born out of a quiet rebellion. We believe the fifteen minutes it takes to brew a proper cup of chai isn’t wasted time—it is your most sacred sanctuary.
              </p>

              <p className="text-base text-[#3E2A20]/80 leading-relaxed font-light">
                We combine century-old Indian spice wisdom with single-origin teas sourced directly from regenerative family estates. No artificial essences. No powdered dust. Just the honest warmth of whole cardamom, fresh ginger, and tea leaves that honor your inner calm.
              </p>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => navigateTo('about')}
                  className="px-6 py-3 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Read About Sukoon
                </button>
                <button
                  onClick={() => navigateTo('tea-experience')}
                  className="text-xs font-medium text-[#3E2A20] hover:text-[#B96F4A] underline flex items-center gap-1"
                >
                  <span>Our Leaf to Cup Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 3 — SHOP BY MOOD (“Choose Your Sukoon”)
          ---------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
              Intentional Sips
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3E2A20] mt-1 mb-3">
              Choose Your Sukoon
            </h2>
            <p className="text-sm text-[#3E2A20]/75 font-light leading-relaxed">
              Every hour of the day carries a different rhythm. Discover blends crafted intentionally to mirror your state of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOODS.map((m) => {
              const Icon =
                m.icon === 'Leaf'
                  ? Leaf
                  : m.icon === 'Sun'
                  ? Sun
                  : m.icon === 'Heart'
                  ? Heart
                  : Sparkles;

              return (
                <div
                  key={m.id}
                  onClick={() => navigateTo('shop')}
                  className="group relative bg-[#FFFDF9] border border-[#E7D5BA] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: m.accentBg, color: m.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className="text-xs uppercase tracking-widest font-bold block mb-1"
                      style={{ color: m.color }}
                    >
                      {m.title}
                    </span>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3E2A20] mb-2">
                      {m.tagline}
                    </h3>

                    <p className="text-xs text-[#3E2A20]/75 leading-relaxed font-light mb-6">
                      {m.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E7D5BA]/60 flex items-center justify-between text-xs font-semibold text-[#3E2A20] group-hover:text-[#B96F4A]">
                    <span>Explore {m.title} Teas</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 4 — FEATURED TEAS (“Find Your Cup”)
          ---------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF9F0] border-y border-[#E7D5BA]/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
                Signature Harvests
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3E2A20] mt-1">
                Find Your Cup.
              </h2>
              <p className="text-sm text-[#3E2A20]/70 font-light mt-1">
                Our four most cherished Indian tea preparations.
              </p>
            </div>

            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3E2A20] hover:text-[#B96F4A] transition-colors"
            >
              <span>View All 8 Blends</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFour.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 5 — TEA COLLECTION (Horizontal Scroll Showcase)
          ---------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
                The Heritage Quartette
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2A20] mt-1">
                Four Flavours. One Feeling.
              </h2>
            </div>

            {/* Scroll Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="p-2.5 rounded-full border border-[#E7D5BA] bg-[#FFFDF9] text-[#3E2A20] hover:bg-[#E7D5BA] transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="p-2.5 rounded-full border border-[#E7D5BA] bg-[#FFFDF9] text-[#3E2A20] hover:bg-[#E7D5BA] transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontally scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PRODUCTS.map((prod) => (
              <ProductCard key={prod.id} product={prod} featuredHorizontal={true} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 6 — WHY SUKOON CHAI (Interactive Circle Diagram)
          ---------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF9F0] border-y border-[#E7D5BA]/60">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
            Our Pillars of Quality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3E2A20] mt-1 mb-3">
            Why Sukoon?
          </h2>
          <p className="text-sm text-[#3E2A20]/75 font-light max-w-xl mx-auto">
            Click any orbital attribute to discover how we craft genuine tea tranquility.
          </p>
        </div>

        <WhySukoonCircle />
      </section>

      {/* ----------------------------------------------------
          SECTION 7 — THE SUKOON RITUAL (4-Step Timeline & Timer)
          ---------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
            The Mindful Practice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3E2A20] mt-1 mb-3">
            The Sukoon Ritual
          </h2>
          <p className="text-sm text-[#3E2A20]/75 font-light max-w-lg mx-auto">
            Four simple steps to transform boiling water into a daily ceremony of presence.
          </p>
        </div>

        <BrewingTimeline />
      </section>

      {/* ----------------------------------------------------
          SECTION 8 — PRODUCT LIFESTYLE PARALLAX BANNER
          ---------------------------------------------------- */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#3E2A20] text-[#FFF9F0] overflow-hidden my-8">
        <div className="absolute inset-0 opacity-25">
          <img
            src={HERO_IMAGE}
            alt="Lifestyle background"
            className="w-full h-full object-cover scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#3E2A20] via-[#3E2A20]/90 to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10 text-center sm:text-left space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#E7D5BA] font-semibold">
            Balcony Wisdom
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-2xl">
            “Not every problem needs a solution.
            <span className="block font-handwriting text-4xl sm:text-6xl text-[#E7D5BA] mt-2 font-normal">
              Sometimes, it needs chai.”
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#E7D5BA]/80 max-w-lg font-light leading-relaxed">
            Take twenty minutes back for yourself. Let the kettle boil, breathe in the steam, and allow life to soften.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-4 bg-[#B96F4A] hover:bg-[#a05c3b] text-white text-xs font-semibold rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              SHOP SUKOON
            </button>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 9 — CUSTOMER EXPERIENCE (Testimonials)
          ---------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
              Quiet Words
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3E2A20] mt-1 mb-2">
              Stories from the Cup
            </h2>
            <p className="text-sm text-[#3E2A20]/75 font-light">
              How tea lovers across India find their daily pause with Sukoon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#FFFDF9] border border-[#E7D5BA] rounded-2xl p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#B96F4A] mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#3E2A20]/85 italic leading-relaxed mb-4">
                    “{t.comment}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7D5BA]/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#3E2A20] block">{t.author}</span>
                    <span className="text-[#3E2A20]/50 text-[11px]">{t.location}</span>
                  </div>
                  <span className="text-[10px] text-[#7B8665] bg-[#7B8665]/10 px-2 py-0.5 rounded-full font-medium">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 10 — INSTAGRAM COMMUNITY GRID
          ---------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF9F0] border-t border-[#E7D5BA]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
              The Visual Gallery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2A20] mt-1 mb-2">
              Follow the Sukoon.
            </h2>
            <a
              href="https://instagram.com/sukoon.chai_"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B96F4A] hover:underline"
            >
              <Instagram className="w-4 h-4" />
              <span>@sukoon.chai_</span>
            </a>
          </div>

          {/* 6 Visual Tiles in authentic Instagram grid style */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { img: HERO_IMAGE, label: 'Morning sunlight & clay kulhad' },
              { img: LIFESTYLE_PAUSE_IMAGE, label: 'Balcony pause with warm tea' },
              { img: PRODUCTS[0].image, label: 'Handcrafted Masala blend' },
              { img: PRODUCTS[1].image, label: 'Fresh Himalayan ginger roots' },
              { img: HERO_IMAGE, label: 'Teakwood table tea session' },
              { img: LIFESTYLE_PAUSE_IMAGE, label: 'The art of a slow evening' },
            ].map((item, idx) => (
              <a
                key={idx}
                href="https://instagram.com/sukoon.chai_"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-1/1 rounded-2xl overflow-hidden bg-[#E7D5BA] shadow-xs cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#3E2A20]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white p-3 text-center">
                  <Instagram className="w-6 h-6" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://instagram.com/sukoon.chai_"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFDF9] border border-[#E7D5BA] text-xs font-semibold text-[#3E2A20] hover:bg-[#E7D5BA]/50 transition-colors shadow-xs"
            >
              <Instagram className="w-4 h-4 text-[#B96F4A]" />
              <span>FOLLOW @SUKOON.CHAI_</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
