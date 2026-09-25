import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { TeaProfileRadar } from '../components/visuals/TeaProfileRadar';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Flame,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, addToCart, toggleWishlist, isInWishlist, navigateTo } = useShop();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedWeight, setSelectedWeight] = useState<string>(product.defaultWeight);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'profile' | 'brewing' | 'ingredients' | 'reviews'>('profile');

  // New review form state
  const [userReview, setUserReview] = useState({ name: '', comment: '', rating: 5 });
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      name: 'Sunita Rao',
      rating: 5,
      date: '4 days ago',
      comment: 'The scent of green cardamom that filled my kitchen when the kettle started boiling was incredible. This has completely replaced my regular grocery store chai.',
      verified: true,
    },
    {
      id: 'rev-2',
      name: 'Harsh Vardhan',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Super fast delivery to Mumbai and the kraft packaging kept every leaf crisp and fragrant. Truly delivers on the name "Sukoon".',
      verified: true,
    }
  ]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    navigateTo('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReview.name || !userReview.comment) return;
    setReviewsList([
      {
        id: `rev-${Date.now()}`,
        name: userReview.name,
        rating: userReview.rating,
        date: 'Just now',
        comment: userReview.comment,
        verified: true,
      },
      ...reviewsList,
    ]);
    setReviewSubmitted(true);
    setUserReview({ name: '', comment: '', rating: 5 });
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#3E2A20]/60 mb-8 overflow-x-auto whitespace-nowrap">
        <button onClick={() => navigateTo('home')} className="hover:text-[#3E2A20]">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-[#E7D5BA]" />
        <button onClick={() => navigateTo('shop')} className="hover:text-[#3E2A20]">
          Shop
        </button>
        <ChevronRight className="w-3 h-3 text-[#E7D5BA]" />
        <button onClick={() => navigateTo('categories')} className="hover:text-[#3E2A20]">
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3 text-[#E7D5BA]" />
        <span className="text-[#3E2A20] font-medium">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
        {/* Left Gallery (Sticky on desktop) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 sm:aspect-1/1 rounded-3xl overflow-hidden bg-[#F3E8D5] border-2 border-[#E7D5BA] shadow-md">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
              loading="eager"
            />
            <div className="absolute top-4 left-4 bg-[#FFF9F0]/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-[#3E2A20] border border-[#E7D5BA]">
              {product.category}
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-xs shadow-xs transition-colors ${
                isWishlisted
                  ? 'bg-[#B96F4A] text-white'
                  : 'bg-[#FFF9F0]/90 text-[#3E2A20] hover:text-[#B96F4A]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {[product.image, product.secondaryImage || product.image].map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === img
                    ? 'border-[#B96F4A] shadow-md ring-2 ring-[#B96F4A]/30'
                    : 'border-[#E7D5BA] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Quality seals */}
          <div className="pt-4 grid grid-cols-3 gap-3 text-center border-t border-[#E7D5BA]/60 text-xs text-[#3E2A20]/80">
            <div className="p-3 bg-[#FFF9F0] rounded-xl border border-[#E7D5BA]">
              <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#7B8665]" />
              <span className="font-semibold block">100% Pure</span>
              <span className="text-[10px] text-[#3E2A20]/60">Zero Artificial Flavour</span>
            </div>
            <div className="p-3 bg-[#FFF9F0] rounded-xl border border-[#E7D5BA]">
              <Truck className="w-4 h-4 mx-auto mb-1 text-[#B96F4A]" />
              <span className="font-semibold block">Free Shipping</span>
              <span className="text-[10px] text-[#3E2A20]/60">Orders over ₹499</span>
            </div>
            <div className="p-3 bg-[#FFF9F0] rounded-xl border border-[#E7D5BA]">
              <RotateCcw className="w-4 h-4 mx-auto mb-1 text-[#3E2A20]" />
              <span className="font-semibold block">Freshness Seal</span>
              <span className="text-[10px] text-[#3E2A20]/60">Multi-layer Barrier</span>
            </div>
          </div>
        </div>

        {/* Right Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
                Mood: {product.mood}
              </span>
              <span className="text-[#E7D5BA]">·</span>
              <div className="flex items-center text-xs text-[#3E2A20]">
                <Star className="w-3.5 h-3.5 fill-[#B96F4A] text-[#B96F4A] mr-1" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#3E2A20]/50 ml-1">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3E2A20] leading-tight">
              {product.name}
            </h1>

            <p className="font-handwriting text-2xl text-[#B96F4A] mt-1">
              “{product.tagline}”
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2A20] font-mono tabular-nums">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-[#3E2A20]/45 line-through font-mono tabular-nums">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-xs text-[#7B8665] font-semibold bg-[#7B8665]/10 px-2.5 py-0.5 rounded-full">
              Inclusive of all taxes
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#3E2A20]/80 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Weight Selection */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-[#3E2A20] uppercase tracking-wider">
                Select Packaging Size
              </span>
              <span className="text-[#3E2A20]/60">Airtight Zip Pouch</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {product.weightOptions.map((weight) => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={`py-3 px-2 rounded-2xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    selectedWeight === weight
                      ? 'bg-[#3E2A20] text-[#FFF9F0] border-[#3E2A20] shadow-sm ring-2 ring-[#B96F4A]/30'
                      : 'bg-white text-[#3E2A20] border-[#E7D5BA] hover:bg-[#F3E8D5]'
                  }`}
                >
                  <span className="block text-sm mb-0.5">{weight}</span>
                  <span className={`text-[10px] font-normal block ${selectedWeight === weight ? 'text-[#E7D5BA]' : 'text-[#3E2A20]/60'}`}>
                    {weight === '50g' ? '~20 cups' : weight === '100g' ? '~40 cups' : weight === '250g' ? '~100 cups' : '~200 cups'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & CTAs */}
          <div className="space-y-3 pt-4 border-t border-[#E7D5BA]/60">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#E7D5BA] rounded-2xl bg-white p-1.5 shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F3E8D5] text-[#3E2A20] font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold font-mono text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F3E8D5] text-[#3E2A20] font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-sm font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag · ₹{product.price * quantity}</span>
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-[#B96F4A] hover:bg-[#a05c3b] text-white text-sm font-semibold rounded-2xl transition-colors cursor-pointer shadow-sm text-center"
            >
              Buy Now with Express Checkout
            </button>
          </div>

          {/* Key tasting notes bullets */}
          <div className="pt-2">
            <span className="text-xs uppercase tracking-wider text-[#3E2A20]/60 font-semibold block mb-2">
              Tasting Notes Profile
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {product.tastingNotes.map((note, i) => (
                <span
                  key={i}
                  className="bg-[#FFFDF9] border border-[#E7D5BA] px-3 py-1 rounded-full text-[#3E2A20] font-medium"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          TABBED SPECIFICATIONS & VISUALIZATIONS SECTION
          ---------------------------------------------------- */}
      <div className="border-t border-[#E7D5BA] pt-12">
        {/* Tab switcher */}
        <div className="flex border-b border-[#E7D5BA] mb-8 overflow-x-auto">
          {[
            { id: 'profile', label: 'Sensory Profile Radar' },
            { id: 'brewing', label: 'Brewing Ritual' },
            { id: 'ingredients', label: 'Ingredients & Terroir' },
            { id: 'reviews', label: `Reviews (${reviewsList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-6 text-sm font-serif font-bold transition-colors relative cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#B96F4A] border-b-2 border-[#B96F4A]'
                  : 'text-[#3E2A20]/60 hover:text-[#3E2A20]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Tea Profile Radar & Linear Meters */}
        {activeTab === 'profile' && (
          <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
                Hexagonal Tasting Matrix
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2A20] mt-1 mb-2">
                The Anatomy of {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#3E2A20]/75 leading-relaxed font-light">
                Mapped across six core sensory axes: Strength, Aroma, Spice, Comfort, Floral, and Freshness. Blended to achieve peak equilibrium without synthetic flavor enhancers.
              </p>
            </div>

            <TeaProfileRadar metrics={product.teaProfile} />
          </div>
        )}

        {/* Tab 2: Brewing Ritual */}
        {activeTab === 'brewing' && (
          <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-[#E7D5BA]">
                <Flame className="w-5 h-5 text-[#B96F4A] mb-1" />
                <span className="text-xs text-[#3E2A20]/60 block">Water Temp</span>
                <span className="font-serif font-bold text-sm text-[#3E2A20]">
                  {product.brewingInstructions.waterTemp}
                </span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#E7D5BA]">
                <Clock className="w-5 h-5 text-[#B96F4A] mb-1" />
                <span className="text-xs text-[#3E2A20]/60 block">Steep Time</span>
                <span className="font-serif font-bold text-sm text-[#3E2A20]">
                  {product.brewingInstructions.steepTime}
                </span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#E7D5BA]">
                <Sparkles className="w-5 h-5 text-[#B96F4A] mb-1" />
                <span className="text-xs text-[#3E2A20]/60 block">Milk Ratio</span>
                <span className="font-serif font-bold text-sm text-[#3E2A20]">
                  {product.brewingInstructions.milkRatio}
                </span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#E7D5BA]">
                <Star className="w-5 h-5 text-[#B96F4A] mb-1" />
                <span className="text-xs text-[#3E2A20]/60 block">Servings</span>
                <span className="font-serif font-bold text-sm text-[#3E2A20]">
                  {product.brewingInstructions.servings}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-xl font-bold text-[#3E2A20]">
                Step-by-Step Brewing Guide
              </h4>
              <ol className="space-y-3">
                {product.brewingInstructions.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#3E2A20]/80">
                    <span className="w-6 h-6 rounded-full bg-[#E7D5BA] text-[#3E2A20] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Tab 3: Ingredients */}
        {activeTab === 'ingredients' && (
          <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-10 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#3E2A20]">
              Transparent Botanicals & Whole Spices
            </h3>
            <p className="text-sm text-[#3E2A20]/80 font-light leading-relaxed">
              We never grind ingredients into generic powder. In every pouch of Sukoon Chai, you can visibly inspect each whole cracked cardamom pod, cinnamon quill, and CTC grain.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {product.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#E7D5BA] text-xs font-medium text-[#3E2A20]">
                  <Check className="w-4 h-4 text-[#7B8665] shrink-0" />
                  <span>{ing}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E7D5BA]">
              <h4 className="font-serif text-lg font-bold text-[#3E2A20] mb-2">
                Health & Wellness Characteristics
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3E2A20]/80">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B96F4A]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-bold text-[#3E2A20] mb-6">
                Customer Reviews
              </h3>

              <div className="space-y-4 mb-8">
                {reviewsList.map((r) => (
                  <div key={r.id} className="p-4 bg-white rounded-2xl border border-[#E7D5BA]/70">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#3E2A20]">{r.name}</span>
                        {r.verified && (
                          <span className="text-[10px] text-[#7B8665] bg-[#7B8665]/10 px-2 py-0.5 rounded-full font-medium">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#3E2A20]/50">{r.date}</span>
                    </div>

                    <div className="flex text-[#B96F4A] mb-2">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-[#3E2A20]/80 leading-relaxed">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>

              {/* Review submit form */}
              <div className="pt-6 border-t border-[#E7D5BA]">
                <h4 className="font-serif text-lg font-bold text-[#3E2A20] mb-3">
                  Share Your Sukoon Moment
                </h4>

                {reviewSubmitted ? (
                  <div className="p-4 bg-[#7B8665]/15 border border-[#7B8665] rounded-xl text-xs text-[#3E2A20]">
                    Thank you for sharing your review! It has been posted to this blend.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={userReview.name}
                        onChange={(e) => setUserReview({ ...userReview, name: e.target.value })}
                        required
                        className="p-3 text-xs bg-white border border-[#E7D5BA] rounded-xl focus:outline-none focus:border-[#B96F4A]"
                      />
                      <select
                        value={userReview.rating}
                        onChange={(e) => setUserReview({ ...userReview, rating: Number(e.target.value) })}
                        className="p-3 text-xs bg-white border border-[#E7D5BA] rounded-xl focus:outline-none focus:border-[#B96F4A]"
                      >
                        <option value="5">5 Stars — Sublime Sukoon</option>
                        <option value="4">4 Stars — Very Good</option>
                        <option value="3">3 Stars — Average</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="Describe your tasting experience, aroma, and how it felt..."
                      value={userReview.comment}
                      onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                      required
                      rows={3}
                      className="w-full p-3 text-xs bg-white border border-[#E7D5BA] rounded-xl focus:outline-none focus:border-[#B96F4A]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Post Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Buy Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#FFFDF9] border-t border-[#E7D5BA] shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="font-serif text-lg font-bold text-[#3E2A20] font-mono tabular-nums">
            ₹{product.price * quantity}
          </span>
          <span className="text-[10px] text-[#3E2A20]/60 block">{selectedWeight}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 bg-[#3E2A20] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
