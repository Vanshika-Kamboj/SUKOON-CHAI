import React from 'react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE, LIFESTYLE_PAUSE_IMAGE, MASALA_IMAGE } from '../data/products';
import { Heart, Sparkles, Coffee, ShieldCheck, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  const timelineSteps = [
    {
      year: '2023',
      title: 'The Idea',
      description: 'Born on a rainy balcony in Jaipur over an unhurried cutting chai. We noticed that in the modern race for convenience, tea had become a rushed stimulant rather than an anchor for the soul.',
    },
    {
      year: '2024',
      title: 'The First Cup',
      description: 'Over 140 experimental boils across earthen stoves, blending single-origin upper Assam CTC with smallholder green cardamom from the Idukki hills of Kerala.',
    },
    {
      year: '2025',
      title: 'The Blend',
      description: 'Formulating our signature ratio: whole spices cracked by hand, ensuring that volatile essential oils remain trapped until the hot water blooms.',
    },
    {
      year: '2025',
      title: 'The Brand',
      description: 'Launching Sukoon Chai with a humble pledge: to never compromise on real spices, to never use synthetic essences, and to design packaging worthy of a mindful pantry.',
    },
    {
      year: '2026',
      title: 'The Sukoon Community',
      description: 'Over 20,000 households across India starting their dawn with our brews. Creating quiet spaces in homes, dorms, and work studios.',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20">
      {/* Editorial Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
          Our Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#3E2A20] leading-tight">
          Tea was never just tea.
        </h1>
        <p className="font-handwriting text-3xl sm:text-4xl text-[#B96F4A]">
          “More Than a Tea. It’s a Feeling.”
        </p>
        <p className="text-base sm:text-lg text-[#3E2A20]/80 font-light leading-relaxed pt-2">
          In India, chai is not a morning beverage consumed to tick an energy box. It is the language of comfort, the bridge between strangers, and the gentle exhale when the day has been too heavy.
        </p>
      </div>

      {/* Two Column Visual Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-lg border-2 border-[#E7D5BA] bg-[#E7D5BA]">
            <img
              src={LIFESTYLE_PAUSE_IMAGE}
              alt="Person holding warm chai cup"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden sm:block p-4 rounded-2xl bg-[#FFF9F0] border border-[#E7D5BA] shadow-md max-w-xs">
            <span className="text-xs uppercase tracking-wider text-[#B96F4A] font-bold block mb-1">
              Handcrafted in India
            </span>
            <p className="text-xs text-[#3E2A20]/75 leading-relaxed">
              We package in small batches within 48 hours of blending to preserve pristine freshness.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
            The Intention
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2A20]">
            What Sukoon Means To Us
          </h2>
          <p className="text-sm sm:text-base text-[#3E2A20]/80 leading-relaxed font-light">
            Sukoon (सकून) is an Urdu word that translates roughly to peace, serenity, calm, or solace. But translation misses its emotional texture. Sukoon is the feeling when the train arrives at your hometown station. It is the sound of rain on your window when you have nowhere to go.
          </p>
          <p className="text-sm sm:text-base text-[#3E2A20]/80 leading-relaxed font-light">
            When you hold a cup of Sukoon Chai, we want that same quiet contentment to wash over your shoulders. To remind you that taking 15 minutes to yourself is not an indulgence—it is essential.
          </p>
        </div>
      </div>

      {/* Our Journey Timeline */}
      <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-12 shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
            Our Timeline
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2A20] mt-1 mb-2">
            The Path to the Cup
          </h2>
          <p className="text-xs sm:text-sm text-[#3E2A20]/75 font-light">
            How a tiny kitchen experiment blossomed into a beloved national tea lifestyle brand.
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-[#E7D5BA]">
          {timelineSteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.year + step.title}
                className={`relative flex items-center md:justify-between ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center marker */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#3E2A20] border-4 border-[#FFF9F0] text-white flex items-center justify-center text-xs font-bold z-10">
                  {idx + 1}
                </div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-[45%] p-6 bg-white rounded-2xl border border-[#E7D5BA] shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#B96F4A]">
                      {step.year}
                    </span>
                    <span className="text-[#3E2A20]/40">·</span>
                    <h4 className="font-serif text-lg font-bold text-[#3E2A20]">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3E2A20]/75 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Values / Ethos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white border border-[#E7D5BA] rounded-3xl space-y-3">
          <ShieldCheck className="w-8 h-8 text-[#7B8665]" />
          <h3 className="font-serif text-xl font-bold text-[#3E2A20]">
            Radical Authenticity
          </h3>
          <p className="text-xs sm:text-sm text-[#3E2A20]/75 leading-relaxed font-light">
            We never use spray-on flavourings or artificial scents. What you smell is genuine spices harvested from sustainable Indian soils.
          </p>
        </div>

        <div className="p-8 bg-white border border-[#E7D5BA] rounded-3xl space-y-3">
          <Sparkles className="w-8 h-8 text-[#B96F4A]" />
          <h3 className="font-serif text-xl font-bold text-[#3E2A20]">
            The Art of the Pause
          </h3>
          <p className="text-xs sm:text-sm text-[#3E2A20]/75 leading-relaxed font-light">
            We actively advocate for slowing down. In a fast-forward culture, brewing a slow cup of chai is a quiet declaration of peace.
          </p>
        </div>

        <div className="p-8 bg-white border border-[#E7D5BA] rounded-3xl space-y-3">
          <Heart className="w-8 h-8 text-[#C99791]" />
          <h3 className="font-serif text-xl font-bold text-[#3E2A20]">
            Generational Connection
          </h3>
          <p className="text-xs sm:text-sm text-[#3E2A20]/75 leading-relaxed font-light">
            Honoring mothers, grandparents, and street tapri chai-wallahs who have kept this timeless culinary tradition alive for centuries.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center py-6">
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-4 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-2xl transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
        >
          <span>Taste the Sukoon Philosophy</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
