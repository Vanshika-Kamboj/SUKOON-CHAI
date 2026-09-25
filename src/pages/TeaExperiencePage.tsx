import React from 'react';
import { useShop } from '../context/ShopContext';
import { TeaLeafJourney } from '../components/visuals/TeaLeafJourney';
import { BrewingTimeline } from '../components/visuals/BrewingTimeline';
import { Droplet, Flame, Wind, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const TeaExperiencePage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
          The Craft of Mindfulness
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#3E2A20]">
          The Tea Experience
        </h1>
        <p className="font-handwriting text-3xl sm:text-4xl text-[#B96F4A]">
          “From ancient misty hills to your quiet morning hands.”
        </p>
        <p className="text-base sm:text-lg text-[#3E2A20]/80 font-light leading-relaxed pt-2">
          Discover the deliberate stages that transform fresh botanical harvests into an elixir of daily serenity.
        </p>
      </div>

      {/* Part 1: Interactive Leaf to Cup Journey */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
            Interactive Provenance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2A20] mt-1 mb-2">
            From Leaf to Cup
          </h2>
          <p className="text-xs sm:text-sm text-[#3E2A20]/70 font-light">
            Follow our 6-stage journey from high-altitude estates to your kitchen table.
          </p>
        </div>

        <TeaLeafJourney />
      </section>

      {/* Part 2: How to Brew the Perfect Cup */}
      <section className="space-y-6 pt-8 border-t border-[#E7D5BA]">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
            The Living Ceremony
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2A20] mt-1 mb-2">
            How to Brew the Perfect Cup
          </h2>
          <p className="text-xs sm:text-sm text-[#3E2A20]/70 font-light">
            Follow the 4 steps and use our built-in meditative timer to time your simmer.
          </p>
        </div>

        <BrewingTimeline />
      </section>

      {/* Part 3: The Four Golden Rules of Sukoon */}
      <section className="space-y-8 pt-8 border-t border-[#E7D5BA]">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
            Heirloom Secrets
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2A20] mt-1 mb-2">
            The 4 Golden Rules of Great Chai
          </h2>
          <p className="text-xs sm:text-sm text-[#3E2A20]/70 font-light">
            Simple techniques passed down through generations of Indian tea masters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl space-y-3">
            <Droplet className="w-6 h-6 text-[#B96F4A]" />
            <h4 className="font-serif text-lg font-bold text-[#3E2A20]">
              1. Spring Water First
            </h4>
            <p className="text-xs text-[#3E2A20]/75 leading-relaxed font-light">
              Always start with fresh, cold filtered or spring water. Water that has already been boiled repeatedly loses oxygen and dulls the tea leaves’ vibrancy.
            </p>
          </div>

          <div className="p-6 bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl space-y-3">
            <Flame className="w-6 h-6 text-[#B96F4A]" />
            <h4 className="font-serif text-lg font-bold text-[#3E2A20]">
              2. Let Spices Bloom
            </h4>
            <p className="text-xs text-[#3E2A20]/75 leading-relaxed font-light">
              Simmer the tea leaves and whole spices in boiling water for 90 seconds <em>before</em> adding cold milk. This extracts deep essential oils that milk would otherwise bind.
            </p>
          </div>

          <div className="p-6 bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl space-y-3">
            <Wind className="w-6 h-6 text-[#B96F4A]" />
            <h4 className="font-serif text-lg font-bold text-[#3E2A20]">
              3. The Double Rise
            </h4>
            <p className="text-xs text-[#3E2A20]/75 leading-relaxed font-light">
              Once milk is added, reduce heat. Allow the chai to rise up the sides of your pan twice before pulling off flame. This creates the signature velvety Indian texture.
            </p>
          </div>

          <div className="p-6 bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl space-y-3">
            <Clock className="w-6 h-6 text-[#B96F4A]" />
            <h4 className="font-serif text-lg font-bold text-[#3E2A20]">
              4. Aerate & Inhale
            </h4>
            <p className="text-xs text-[#3E2A20]/75 leading-relaxed font-light">
              Pour from height into a heavy ceramic cup or earthen clay kulhad. Aeration cools the surface while releasing trapped aromatics directly to your senses.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl text-center space-y-4">
        <h3 className="font-serif text-3xl font-bold text-[#3E2A20]">
          Ready to Begin Your Sukoon Ritual?
        </h3>
        <p className="text-sm text-[#3E2A20]/80 max-w-md mx-auto font-light">
          Order our freshest harvests, ground and packaged to order in Jaipur.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-4 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <span>Choose Your Blend</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
