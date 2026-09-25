import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { JournalArticle } from '../types';
import { Clock, ArrowRight, X, User, Calendar, BookOpen } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Reflections', 'Chai Culture', 'Rituals', 'Origins', 'Wellbeing', 'Community'];

  const filteredArticles = activeCategory === 'All'
    ? JOURNAL_ARTICLES
    : JOURNAL_ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
          Editorial Chronicles
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#3E2A20]">
          The Sukoon Journal
        </h1>
        <p className="text-base sm:text-lg text-[#3E2A20]/80 font-light">
          Stories, sensory vignettes, and quiet musings on tea, memory, and the art of slowing down.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-[#3E2A20] text-[#FFF9F0]'
                : 'bg-white text-[#3E2A20] border border-[#E7D5BA] hover:bg-[#F3E8D5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Lead Article */}
      {filteredArticles.length > 0 && activeCategory === 'All' && (
        <div
          onClick={() => setSelectedArticle(filteredArticles[0])}
          className="group relative bg-[#FFFDF9] border border-[#E7D5BA] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 aspect-16/10 overflow-hidden bg-[#F3E8D5]">
            <img
              src={filteredArticles[0].image}
              alt={filteredArticles[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
          </div>

          <div className="lg:col-span-5 p-6 lg:p-10 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#3E2A20]/60">
              <span className="text-[#B96F4A] font-semibold uppercase tracking-wider">
                {filteredArticles[0].category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {filteredArticles[0].readTime}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3E2A20] group-hover:text-[#B96F4A] transition-colors leading-tight">
              {filteredArticles[0].title}
            </h2>

            <p className="text-xs sm:text-sm text-[#3E2A20]/75 leading-relaxed font-light">
              {filteredArticles[0].excerpt}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs text-[#3E2A20]/60 border-t border-[#E7D5BA]/60">
              <span>By {filteredArticles[0].author}</span>
              <span className="text-[#B96F4A] font-semibold flex items-center gap-1 group-hover:underline">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(activeCategory === 'All' ? filteredArticles.slice(1) : filteredArticles).map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group relative bg-[#FFFDF9] border border-[#E7D5BA] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="aspect-16/10 overflow-hidden bg-[#F3E8D5] relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-[#FFF9F0]/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-[#3E2A20] border border-[#E7D5BA]">
                {article.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#3E2A20]/50 mb-2">
                  <span>{article.publishDate}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#3E2A20] group-hover:text-[#B96F4A] transition-colors leading-snug mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-[#3E2A20]/75 line-clamp-3 leading-relaxed font-light">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7D5BA]/60 flex items-center justify-between text-xs">
                <span className="text-[#3E2A20]/60">By {article.author}</span>
                <span className="text-[#B96F4A] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 bg-[#3E2A20]/60 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#E7D5BA] overflow-hidden max-h-[85vh] flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#E7D5BA] bg-[#FFF9F0] flex items-center justify-between sticky top-0 z-20">
              <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-full hover:bg-[#E7D5BA]/50 text-[#3E2A20] transition-colors"
                aria-label="Close reader"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              <div className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3E2A20] leading-tight">
                  {selectedArticle.title}
                </h1>
                <p className="font-handwriting text-2xl text-[#B96F4A]">
                  “{selectedArticle.subtitle}”
                </p>

                <div className="flex items-center gap-3 text-xs text-[#3E2A20]/60 pt-2 border-b border-[#E7D5BA]/60 pb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {selectedArticle.author}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {selectedArticle.publishDate}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
                  </span>
                </div>
              </div>

              <div className="aspect-16/9 rounded-2xl overflow-hidden bg-[#F3E8D5]">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#3E2A20]/85 leading-relaxed font-light">
                {selectedArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="p-6 bg-[#FFF9F0] border border-[#E7D5BA] rounded-2xl text-center space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
                  Sip While Reading
                </span>
                <p className="font-serif text-lg font-bold text-[#3E2A20]">
                  Pair this story with Sukoon Premium Masala Chai.
                </p>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    window.location.hash = '#/shop';
                  }}
                  className="px-5 py-2 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Explore Blends
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
