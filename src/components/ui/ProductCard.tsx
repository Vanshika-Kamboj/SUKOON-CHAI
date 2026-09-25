import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featuredHorizontal?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featuredHorizontal = false }) => {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView, navigateTo } = useShop();
  const [imageError, setImageError] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product-details', product.id);
  };

  return (
    <div
      className={`group relative flex flex-col bg-[#FFFDF9] border border-[#E7D5BA]/70 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#B96F4A]/50 transition-all duration-300 ${
        featuredHorizontal ? 'w-[280px] sm:w-[320px] shrink-0' : 'w-full'
      }`}
    >
      {/* Product Image Container */}
      <div
        onClick={handleCardClick}
        className="relative w-full aspect-4/3 bg-[#F3E8D5]/40 overflow-hidden cursor-pointer"
      >
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          /* High-fidelity styled fallback container */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F3E8D5] to-[#E7D5BA] text-center">
            <span className="font-serif text-2xl font-bold text-[#3E2A20] mb-1">
              {product.name}
            </span>
            <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-medium">
              {product.category}
            </span>
          </div>
        )}

        {/* Subtle Category & Mood Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
          <span className="text-[11px] font-medium text-[#3E2A20] bg-[#FFF9F0]/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#E7D5BA] shadow-xs">
            {product.category}
          </span>
          {product.bestSeller && (
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B96F4A] bg-[#FFFDF9]/95 px-2 py-0.5 rounded-full border border-[#B96F4A]/40">
              Popular
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-xs ${
            isWishlisted
              ? 'bg-[#B96F4A] text-white'
              : 'bg-[#FFF9F0]/90 text-[#3E2A20] hover:text-[#B96F4A] hover:bg-[#FFFDF9]'
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openQuickView(product);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 bg-[#3E2A20]/90 hover:bg-[#3E2A20] text-white text-xs font-medium py-1.5 px-3.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer backdrop-blur-xs whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & reviews */}
          <div className="flex items-center gap-1.5 text-xs text-[#3E2A20]/70 mb-1.5">
            <div className="flex items-center text-[#B96F4A]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-[#3E2A20]">{product.rating.toFixed(1)}</span>
            <span className="text-[#3E2A20]/40">·</span>
            <span className="text-[11px]">({product.reviewCount} reviews)</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={handleCardClick}
            className="font-serif text-lg sm:text-xl font-bold text-[#3E2A20] hover:text-[#B96F4A] transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {product.name}
          </h3>

          {/* Tagline / Tasting Notes */}
          <p className="text-xs text-[#3E2A20]/75 line-clamp-2 leading-relaxed mb-3 font-light">
            {product.tagline}
          </p>

          {/* Tasting notes list */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[11px] text-[#7B8665]">
            {product.tastingNotes.slice(0, 3).map((note, i) => (
              <span key={i} className="inline-flex items-center">
                {note}
                {i < Math.min(product.tastingNotes.length - 1, 2) && <span className="ml-1 text-[#3E2A20]/30">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-[#E7D5BA]/60 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg sm:text-xl font-bold text-[#3E2A20] font-mono tabular-nums">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#3E2A20]/45 line-through font-mono tabular-nums">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#3E2A20]/60">
              Net wt. {product.defaultWeight}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="px-3.5 py-2 bg-[#3E2A20] hover:bg-[#B96F4A] text-[#FFF9F0] text-xs font-medium rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
