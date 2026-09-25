import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cartCount, wishlist, openCartDrawer, openSearch, currentPage, navigateTo } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'Categories', id: 'categories' },
    { label: 'Our Story', id: 'our-story' },
    { label: 'Experience', id: 'tea-experience' },
    { label: 'Journal', id: 'journal' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Editorial Announcement Bar */}
      <div className="bg-[#3E2A20] text-[#FFF9F0] text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wide font-light flex items-center justify-center gap-2">
        <span>Ek Cup, Thoda Sukoon · Free express shipping on orders over ₹499</span>
        <span className="hidden md:inline text-[#E7D5BA]">· Use code: <strong className="font-semibold text-[#FFFDF9]">SUKOON10</strong> for 10% off</span>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F1E7]/92 backdrop-blur-md shadow-xs border-b border-[#E7D5BA]'
            : 'bg-[#F7F1E7] border-b border-[#E7D5BA]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Mobile menu toggle button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#3E2A20] hover:text-[#B96F4A] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Zone 1: Single Brand Wordmark in Cormorant Garamond */}
          <div className="flex items-center">
            <button
              onClick={() => navigateTo('home')}
              className="group flex flex-col items-start cursor-pointer text-left"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#3E2A20] group-hover:text-[#B96F4A] transition-colors">
                Sukoon Chai
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#B96F4A] font-medium -mt-1 hidden sm:block">
                Ek Cup, Thoda Sukoon
              </span>
            </button>
          </div>

          {/* Zone 2: Clean 4-6 Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`text-sm font-medium transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#B96F4A] font-semibold'
                      : 'text-[#3E2A20]/80 hover:text-[#3E2A20]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B96F4A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={openSearch}
              className="p-2 text-[#3E2A20]/80 hover:text-[#3E2A20] hover:bg-[#E7D5BA]/30 rounded-full transition-colors cursor-pointer"
              aria-label="Search teas"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('account')}
              className="p-2 text-[#3E2A20]/80 hover:text-[#3E2A20] hover:bg-[#E7D5BA]/30 rounded-full transition-colors cursor-pointer relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B96F4A]" />
              )}
            </button>

            {/* Account Button */}
            <button
              onClick={() => navigateTo('account')}
              className="hidden sm:flex p-2 text-[#3E2A20]/80 hover:text-[#3E2A20] hover:bg-[#E7D5BA]/30 rounded-full transition-colors cursor-pointer"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={openCartDrawer}
              className="flex items-center gap-2 py-2 px-3 sm:px-3.5 bg-[#3E2A20] hover:bg-[#B96F4A] text-[#FFF9F0] rounded-xl transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold font-mono tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E7D5BA] bg-[#FFF9F0] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-serif py-1.5 flex items-center justify-between ${
                    currentPage === link.id
                      ? 'text-[#B96F4A] font-bold'
                      : 'text-[#3E2A20]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#E7D5BA]" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E7D5BA] flex items-center justify-between text-xs text-[#3E2A20]/70">
              <button
                onClick={() => {
                  navigateTo('order-tracking');
                  setMobileMenuOpen(false);
                }}
                className="hover:text-[#B96F4A] underline"
              >
                Track Your Order
              </button>
              <button
                onClick={() => {
                  navigateTo('account');
                  setMobileMenuOpen(false);
                }}
                className="hover:text-[#B96F4A] underline"
              >
                My Account
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
