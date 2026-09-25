import React from 'react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE, MASALA_IMAGE, ADRAK_IMAGE, LIFESTYLE_PAUSE_IMAGE } from '../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  hindiTitle: string;
  description: string;
  notes: string;
  image: string;
  itemCount: number;
}

const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 'Masala Chai',
    name: 'Masala Chai',
    hindiTitle: 'मसाला चाय',
    description: 'Generations of warm spice wisdom. Assam CTC blended with Kerala green cardamom, Ceylon cinnamon, cloves, and Malabar pepper.',
    notes: 'Robust · Spicy · Nostalgic',
    image: MASALA_IMAGE,
    itemCount: 2,
  },
  {
    id: 'Adrak Chai',
    name: 'Adrak Chai',
    hindiTitle: 'अदरक चाय',
    description: 'Crushed sun-dried ginger from Himalayan foothills folded into bold black tea. Warming, invigorating, and soothing for chilly rains.',
    notes: 'Fiery · Crisp · Restorative',
    image: ADRAK_IMAGE,
    itemCount: 1,
  },
  {
    id: 'Green Tea',
    name: 'Green Tea',
    hindiTitle: 'तुलसी ग्रीन टी',
    description: 'High-grown Nilgiri whole leaves infused with sacred holy basil (Rama, Krishna & Vana Tulsi). Pure botanical clarity without astringency.',
    notes: 'Herbaceous · Clean · Mindful',
    image: HERO_IMAGE,
    itemCount: 1,
  },
  {
    id: 'Floral Tea',
    name: 'Rose Tea',
    hindiTitle: 'पुष्कर गुलाब',
    description: 'Hand-picked organic Damask rose petals from Pushkar paired with orthodox Darjeeling summer flush leaves. Delicate, fragrant, and romantic.',
    notes: 'Sweet Floral · Muscatel · Soft',
    image: LIFESTYLE_PAUSE_IMAGE,
    itemCount: 1,
  },
  {
    id: 'Herbal Tea',
    name: 'Herbal Infusions',
    hindiTitle: 'हर्बल काढ़ा',
    description: '100% caffeine-free evening elixirs made from Egyptian chamomile, Lucknowi fennel, and shankhpushpi leaves for serene sleep.',
    notes: 'Caffeine-free · Honeyed · Calming',
    image: LIFESTYLE_PAUSE_IMAGE,
    itemCount: 1,
  },
  {
    id: 'Gift Collections',
    name: 'Gift Collections',
    hindiTitle: 'उपहार संग्रह',
    description: 'Artisanal pine wood boxes, solid brass measuring scoops, and curated assortment tins. Designed to convey genuine warmth and care.',
    notes: 'Keepsake Box · Brass Spoon · Keepsake',
    image: HERO_IMAGE,
    itemCount: 2,
  },
];

export const CategoriesPage: React.FC = () => {
  const { navigateTo } = useShop();

  const handleExplore = (category: string) => {
    navigateTo('shop');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
          Curated Terroirs & Traditions
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#3E2A20]">
          Tea Categories
        </h1>
        <p className="text-base sm:text-lg text-[#3E2A20]/80 font-light">
          From fiery roadside ginger taps to the delicate floral rose petals of Rajasthan. Explore each family of Sukoon brews.
        </p>
      </div>

      {/* Grid of Category Showcases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleExplore(cat.id)}
            className="group relative bg-[#FFFDF9] border border-[#E7D5BA] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-16/10 overflow-hidden bg-[#F3E8D5]">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E2A20]/75 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] text-[#E7D5BA] font-light tracking-widest block uppercase">
                    {cat.hindiTitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold tracking-wide">
                    {cat.name}
                  </h3>
                </div>
                <span className="text-xs font-mono tabular-nums bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-white">
                  {cat.itemCount} {cat.itemCount === 1 ? 'blend' : 'blends'}
                </span>
              </div>
            </div>

            {/* Description & Button */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-[#B96F4A] uppercase tracking-wider block mb-1">
                  {cat.notes}
                </span>
                <p className="text-xs sm:text-sm text-[#3E2A20]/75 leading-relaxed font-light">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7D5BA]/60 flex items-center justify-between text-xs font-semibold text-[#3E2A20] group-hover:text-[#B96F4A]">
                <span>Explore {cat.name}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
