import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { TeaMood } from '../types';

export const ShopPage: React.FC = () => {
  const { } = useShop();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeMood, setActiveMood] = useState<TeaMood | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    'All',
    'Masala Chai',
    'Adrak Chai',
    'Green Tea',
    'Floral Tea',
    'Herbal Tea',
    'Gift Collections',
    'Best Sellers',
  ];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory === 'Best Sellers') {
      list = list.filter((p) => p.bestSeller);
    } else if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (activeMood !== 'All') {
      list = list.filter((p) => p.mood === activeMood);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCategory, activeMood, sortBy]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
          Small-Batch Indian Teas
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#3E2A20]">
          Shop Chai
        </h1>
        <p className="text-base sm:text-lg text-[#3E2A20]/80 font-light">
          Find the flavour that feels like you. Freshly sourced from heritage tea gardens and delivered in aroma-seal kraft packaging.
        </p>
      </div>

      {/* Filter and Sorting Controls */}
      <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl p-4 sm:p-6 mb-10 space-y-4 shadow-xs">
        {/* Category tabs */}
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#3E2A20]/60 font-semibold block mb-2">
            Categories
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#3E2A20] text-[#FFF9F0] shadow-xs'
                    : 'bg-white text-[#3E2A20] border border-[#E7D5BA] hover:bg-[#F3E8D5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mood filter & Sorting row */}
        <div className="pt-3 border-t border-[#E7D5BA]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Mood filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#3E2A20]/60 font-semibold whitespace-nowrap">
              Mood:
            </span>
            {(['All', 'Calm', 'Energy', 'Comfort', 'Refresh'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMood(m)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeMood === m
                    ? 'bg-[#B96F4A] text-white'
                    : 'bg-[#FFFDF9] text-[#3E2A20] border border-[#E7D5BA] hover:bg-[#E7D5BA]/40'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#3E2A20]/60" />
            <span className="text-xs text-[#3E2A20]/60 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#E7D5BA] rounded-xl px-3 py-1.5 text-xs text-[#3E2A20] font-medium focus:outline-none focus:border-[#B96F4A] cursor-pointer"
            >
              <option value="featured">Featured Blends</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl p-12 text-center my-8">
          <p className="font-serif text-2xl font-bold text-[#3E2A20] mb-2">
            No blends match the selected filters.
          </p>
          <p className="text-xs text-[#3E2A20]/70 mb-6">
            Try resetting your category or mood filters to browse our full collection.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setActiveMood('All');
            }}
            className="px-6 py-2.5 bg-[#3E2A20] text-white text-xs font-semibold rounded-xl hover:bg-[#B96F4A] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Bottom Assurance Note */}
      <div className="mt-16 p-8 rounded-3xl bg-[#FFF9F0] border border-[#E7D5BA] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h4 className="font-serif text-xl font-bold text-[#3E2A20] mb-1">
            Need guidance choosing your everyday blend?
          </h4>
          <p className="text-xs text-[#3E2A20]/70 font-light">
            Take our 60-second tea ritual profile to discover your tailored pairing.
          </p>
        </div>
        <button
          onClick={() => setActiveCategory('All')}
          className="px-6 py-3 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
        >
          Explore Signature Box of Four
        </button>
      </div>
    </div>
  );
};
