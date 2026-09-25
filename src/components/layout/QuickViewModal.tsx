import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { TeaProfileRadar } from '../visuals/TeaProfileRadar';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist, navigateTo } = useShop();
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const currentWeight = selectedWeight || quickViewProduct.defaultWeight;
  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentWeight, quantity);
    closeQuickView();
  };

  const handleFullDetails = () => {
    closeQuickView();
    navigateTo('product-details', quickViewProduct.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-[#3E2A20]/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#E7D5BA] overflow-hidden flex flex-col md:flex-row max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 bg-[#FFFDF9]/80 rounded-full text-[#3E2A20] hover:text-[#B96F4A] hover:bg-[#FFFDF9] shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 aspect-4/3 md:aspect-auto bg-[#F3E8D5]/50 relative">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 bg-[#FFF9F0]/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-medium border border-[#E7D5BA]">
            Mood: <strong className="text-[#B96F4A]">{quickViewProduct.mood}</strong>
          </div>
        </div>

        {/* Product Details & Purchase Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#B96F4A] font-semibold">
                {quickViewProduct.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-[#3E2A20]">
                <Star className="w-3.5 h-3.5 text-[#B96F4A] fill-current" />
                <span className="font-semibold">{quickViewProduct.rating}</span>
                <span className="text-[#3E2A20]/50">({quickViewProduct.reviewCount})</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2A20]">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-[#3E2A20] font-mono tabular-nums">
                ₹{quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-[#3E2A20]/45 line-through font-mono tabular-nums">
                  ₹{quickViewProduct.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#3E2A20]/80 leading-relaxed font-light">
              {quickViewProduct.description}
            </p>

            {/* Weight selector */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#3E2A20]/70 font-semibold block mb-2">
                Select Weight
              </label>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.weightOptions.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                      currentWeight === weight
                        ? 'bg-[#3E2A20] text-[#FFF9F0] border-[#3E2A20]'
                        : 'bg-white text-[#3E2A20] border-[#E7D5BA] hover:bg-[#F3E8D5]'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Tasting notes */}
            <div className="pt-2">
              <span className="text-xs text-[#3E2A20]/60 block mb-1">Tasting Notes:</span>
              <div className="flex flex-wrap gap-1 text-xs text-[#7B8665]">
                {quickViewProduct.tastingNotes.map((note, i) => (
                  <span key={i} className="bg-[#F3E8D5]/60 px-2 py-0.5 rounded-md border border-[#E7D5BA]/60">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#E7D5BA] mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-[#3E2A20] hover:bg-[#B96F4A] text-[#FFF9F0] text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag · ₹{quickViewProduct.price}</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 border rounded-xl transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#B96F4A] text-white border-[#B96F4A]'
                    : 'border-[#E7D5BA] text-[#3E2A20] hover:bg-[#F3E8D5]'
                }`}
                title="Wishlist"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>

            <button
              onClick={handleFullDetails}
              className="w-full text-center text-xs text-[#B96F4A] hover:underline flex items-center justify-center gap-1 font-medium"
            >
              <span>View full tasting profile & brewing ritual</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
