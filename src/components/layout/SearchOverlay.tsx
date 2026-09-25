import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Search, X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { TeaMood } from '../../types';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, closeSearch, navigateTo, addToCart } = useShop();
  const [query, setQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<TeaMood | 'All'>('All');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesQuery =
        query.trim() === '' ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.ingredients.some((ing) => ing.toLowerCase().includes(query.toLowerCase())) ||
        product.tastingNotes.some((note) => note.toLowerCase().includes(query.toLowerCase()));

      const matchesMood = selectedMood === 'All' || product.mood === selectedMood;

      return matchesQuery && matchesMood;
    });
  }, [query, selectedMood]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className="fixed inset-0 bg-[#3E2A20]/50 backdrop-blur-sm transition-opacity"
      />

      {/* Search Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#E7D5BA] overflow-hidden flex flex-col max-h-[80vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E7D5BA] bg-[#FFF9F0] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#B96F4A] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by blend, spice (cardamom, ginger), mood, or tea..."
            className="flex-1 bg-transparent text-base sm:text-lg font-serif text-[#3E2A20] placeholder:text-[#3E2A20]/40 placeholder:font-sans focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#3E2A20]/40 hover:text-[#3E2A20]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1.5 rounded-full hover:bg-[#E7D5BA]/50 text-[#3E2A20]/60 hover:text-[#3E2A20]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mood filter pill tags */}
        <div className="px-6 py-3 bg-[#F3E8D5]/50 border-b border-[#E7D5BA]/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#3E2A20]/60 font-medium whitespace-nowrap">Filter Mood:</span>
          {(['All', 'Calm', 'Energy', 'Comfort', 'Refresh'] as const).map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedMood === mood
                  ? 'bg-[#3E2A20] text-[#FFF9F0]'
                  : 'bg-white text-[#3E2A20] border border-[#E7D5BA] hover:bg-[#E7D5BA]'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#3E2A20]/60">
              <p className="font-serif text-xl mb-1 text-[#3E2A20]">No tea found matching your search</p>
              <p className="text-xs">Try searching for &quot;Masala&quot;, &quot;Adrak&quot;, &quot;Cardamom&quot;, &quot;Rose&quot;, or &quot;Tulsi&quot;.</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  closeSearch();
                  navigateTo('product-details', p.id);
                }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#FFF9F0] border border-transparent hover:border-[#E7D5BA] transition-all cursor-pointer group"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-14 h-14 object-cover rounded-lg bg-[#F3E8D5] shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] text-[#B96F4A] font-semibold uppercase tracking-wider">
                      {p.category}
                    </span>
                    <span className="text-[#3E2A20]/30">·</span>
                    <span className="text-[10px] text-[#7B8665] font-medium">
                      Mood: {p.mood}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#3E2A20] group-hover:text-[#B96F4A] transition-colors truncate">
                    {p.name}
                  </h4>
                  <p className="text-xs text-[#3E2A20]/70 truncate font-light">
                    {p.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-serif text-base font-bold text-[#3E2A20] font-mono tabular-nums">
                    ₹{p.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="p-2 bg-[#3E2A20] hover:bg-[#B96F4A] text-[#FFF9F0] rounded-lg transition-colors cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#FFF9F0] border-t border-[#E7D5BA] text-center text-xs text-[#3E2A20]/60 flex items-center justify-between px-6">
          <span>{filteredProducts.length} tea blends found</span>
          <button
            onClick={() => {
              closeSearch();
              navigateTo('shop');
            }}
            className="text-[#B96F4A] font-medium hover:underline flex items-center gap-1"
          >
            Browse all blends <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
