import React, { useState } from 'react';
import { Leaf, Eye, Blend, Package, Flame, Coffee } from 'lucide-react';

interface Stage {
  id: string;
  step: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  icon: React.ElementType;
}

const STAGES: Stage[] = [
  {
    id: 'leaves',
    step: 'Stage 01',
    title: 'Tea Leaves',
    tagline: 'High-Altitude Harvest',
    description: 'Tender two leaves and a bud hand-plucked during peak flushes from single estates in the Brahmaputra Valley of Assam and misty heights of Nilgiri.',
    location: 'Assam & Nilgiri Hills (Elev. 1,800m)',
    icon: Leaf,
  },
  {
    id: 'selection',
    step: 'Stage 02',
    title: 'Selection',
    tagline: 'Artisanal Grading',
    description: 'Leaves are sorted using traditional hand sieves to separate brisk golden CTC pearls from orthodox whole leaves, discarding stems and dust.',
    location: 'Estate Sorting Facilities',
    icon: Eye,
  },
  {
    id: 'blending',
    step: 'Stage 03',
    title: 'Blending',
    tagline: 'Generational Alchemy',
    description: 'Whole green cardamom, dried ginger, and cinnamon bark are crushed and gently combined with black tea leaves in small 50kg micro-batches.',
    location: 'Sukoon Tea Atelier, Jaipur',
    icon: Blend,
  },
  {
    id: 'packaging',
    step: 'Stage 04',
    title: 'Packaging',
    tagline: 'Kraft & Barrier Seal',
    description: 'Packaged in multi-layer unbleached kraft paper pouches with airtight inner oxygen barriers, locking in volatile botanical oils and freshness.',
    location: 'Eco-conscious Pouching Unit',
    icon: Package,
  },
  {
    id: 'brewing',
    step: 'Stage 05',
    title: 'Brewing',
    tagline: 'The Home Alchemy',
    description: 'In your kitchen, water meets fire. The spices unlock their warmth and the liquor assumes its iconic deep amber hue as milk joins the simmer.',
    location: 'Your Kitchen Sanctuary',
    icon: Flame,
  },
  {
    id: 'your-cup',
    step: 'Stage 06',
    title: 'Your Cup',
    tagline: 'Ek Cup, Thoda Sukoon',
    description: 'Poured hot into your favorite cup. Warmth radiates into your fingers, the world pauses, and sukoon settles into your spirit.',
    location: 'Your Hands',
    icon: Coffee,
  },
];

export const TeaLeafJourney: React.FC = () => {
  const [activeStage, setActiveStage] = useState<Stage>(STAGES[0]);

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      {/* Visual Journey Bar */}
      <div className="relative mb-10 overflow-x-auto pb-4">
        <div className="min-w-[680px] flex items-center justify-between relative px-6">
          {/* Connecting SVG Path Line */}
          <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-[#E7D5BA] -translate-y-1/2 z-0" />

          {STAGES.map((stage, idx) => {
            const isSelected = activeStage.id === stage.id;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage)}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#3E2A20] text-[#FFF9F0] ring-4 ring-[#B96F4A]/30 scale-110 shadow-md'
                      : 'bg-[#FFFDF9] text-[#7B8665] border border-[#E7D5BA] group-hover:border-[#B96F4A] group-hover:bg-[#F3E8D5]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`mt-2 text-xs font-medium whitespace-nowrap transition-colors ${
                    isSelected ? 'text-[#3E2A20] font-semibold' : 'text-[#3E2A20]/60 group-hover:text-[#3E2A20]'
                  }`}
                >
                  {stage.title}
                </span>
                <span className="text-[10px] text-[#B96F4A]">{stage.step}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Card */}
      <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 rounded-2xl bg-[#F3E8D5] flex items-center justify-center shrink-0 border border-[#E7D5BA]">
          <activeStage.icon className="w-10 h-10 text-[#B96F4A]" />
        </div>

        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs uppercase tracking-wider text-[#B96F4A] font-semibold">
              {activeStage.step}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-[#7B8665] font-medium">
              {activeStage.location}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2A20]">
            {activeStage.title}: {activeStage.tagline}
          </h3>

          <p className="text-sm sm:text-base text-[#3E2A20]/80 leading-relaxed font-light">
            {activeStage.description}
          </p>
        </div>
      </div>
    </div>
  );
};
