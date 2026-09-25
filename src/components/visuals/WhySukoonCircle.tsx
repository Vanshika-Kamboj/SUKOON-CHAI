import React, { useState } from 'react';
import { SteamEffect } from './SteamEffect';
import { Sparkles, Heart, ShieldCheck, Flame, Coffee } from 'lucide-react';

interface Pillar {
  id: string;
  name: string;
  description: string;
  detail: string;
  icon: React.ElementType;
  angle: number; // in degrees
}

const PILLARS: Pillar[] = [
  {
    id: 'aromatic',
    name: 'Aromatic',
    description: 'Whole crushed spices that release raw fragrant essential oils.',
    detail: 'No dust, artificial essences, or sprayed perfumes. Just genuine Malabar cardamom, Ceylon cinnamon, and fragrant mountain ginger.',
    icon: Sparkles,
    angle: -90, // Top
  },
  {
    id: 'comforting',
    name: 'Comforting',
    description: 'The feeling of warmth wrapped gently between your palms.',
    detail: 'Blended with the golden ratio of Assam CTC to whole milk, delivering that rounded, deeply satisfying mouthfeel.',
    icon: Heart,
    angle: -18, // Top-right
  },
  {
    id: 'authentic',
    name: 'Authentic',
    description: 'Rooted directly in generational Indian chai culture.',
    detail: 'Honoring century-old chai traditions, roadside tapris, and family kitchen memories without shortcuts.',
    icon: ShieldCheck,
    angle: 54, // Bottom-right
  },
  {
    id: 'thoughtfully-crafted',
    name: 'Thoughtfully Crafted',
    description: 'Direct-from-estate harvests and eco-conscious kraft packs.',
    detail: 'Small-batch blended in humidity-controlled facilities, hermetically sealed for unmatched freshness.',
    icon: Flame,
    angle: 126, // Bottom-left
  },
  {
    id: 'everyday-ritual',
    name: 'Everyday Ritual',
    description: 'A dedicated 15-minute pause to reclaim your inner peace.',
    detail: 'Not an instant beverage, but a meditative practice of watching leaves swirl, milk rise, and steam drift.',
    icon: Coffee,
    angle: 198, // Top-left
  },
];

export const WhySukoonCircle: React.FC = () => {
  const [activePillar, setActivePillar] = useState<Pillar>(PILLARS[1]);

  return (
    <div className="relative max-w-4xl mx-auto py-8">
      {/* Outer subtle orbital ring */}
      <div className="relative flex flex-col items-center">
        {/* SVG Orbit and Nodes */}
        <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] flex items-center justify-center">
          {/* Subtle orbital dashed lines */}
          <div className="absolute inset-8 rounded-full border border-dashed border-[#B96F4A]/30 animate-[spin_120s_linear_infinite]" />
          <div className="absolute inset-16 rounded-full border border-[#E7D5BA]/50" />

          {/* Central Chai Cup Anchor */}
          <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#FFF9F0] border-2 border-[#E7D5BA] shadow-lg flex flex-col items-center justify-center p-3 text-center transition-all duration-300">
            {/* Steam above cup */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <SteamEffect size="sm" />
            </div>

            {/* Clay Kulhad Icon graphic */}
            <svg
              viewBox="0 0 40 40"
              className="w-7 h-7 text-[#B96F4A] mb-1 fill-[#B96F4A]/10 stroke-current stroke-[1.8]"
            >
              <path d="M 10 12 L 14 34 Q 14 36, 17 36 L 23 36 Q 26 36, 26 34 L 30 12 Z" />
              <ellipse cx="20" cy="12" rx="10" ry="2.5" />
              <path d="M 12 18 Q 20 20, 28 18" strokeDasharray="1 1" />
            </svg>

            <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-[#3E2A20]">
              SU KOON
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#B96F4A] font-medium">
              Chai
            </span>
          </div>

          {/* Orbiting Pillars */}
          {PILLARS.map((pillar) => {
            const rad = (pillar.angle * Math.PI) / 180;
            // Radius in percentage
            const rPx = 150; // on mobile: ~120, on tablet/desktop: 170
            const x = Math.cos(rad) * rPx;
            const y = Math.sin(rad) * rPx;
            const isSelected = activePillar.id === pillar.id;

            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar)}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`absolute z-20 transition-all duration-300 group flex items-center justify-center`}
              >
                <div
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all shadow-sm ${
                    isSelected
                      ? 'bg-[#3E2A20] text-[#FFF9F0] border-[#3E2A20] scale-110 shadow-md ring-4 ring-[#E7D5BA]/40'
                      : 'bg-[#FFFDF9] text-[#3E2A20] border-[#E7D5BA] hover:border-[#B96F4A] hover:bg-[#F3E8D5]/60'
                  }`}
                >
                  <pillar.icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E7D5BA]' : 'text-[#B96F4A]'}`} />
                  <span className="whitespace-nowrap">{pillar.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Card */}
        <div className="mt-8 max-w-md w-full bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl p-5 sm:p-6 text-center shadow-sm transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-2">
            <activePillar.icon className="w-5 h-5 text-[#B96F4A]" />
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#3E2A20]">
              {activePillar.name}
            </h4>
          </div>
          <p className="text-sm font-medium text-[#B96F4A] mb-2">
            {activePillar.description}
          </p>
          <p className="text-xs sm:text-sm text-[#3E2A20]/80 leading-relaxed">
            {activePillar.detail}
          </p>
        </div>
      </div>
    </div>
  );
};
