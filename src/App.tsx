import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchOverlay } from './components/layout/SearchOverlay';
import { QuickViewModal } from './components/layout/QuickViewModal';
import { Toast } from './components/layout/Toast';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { TeaExperiencePage } from './pages/TeaExperiencePage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AccountPage } from './pages/AccountPage';

const AppContent: React.FC = () => {
  const { currentPage } = useShop();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'product-details':
        return <ProductDetailPage />;
      case 'about':
        return <AboutPage />;
      case 'our-story':
        return <OurStoryPage />;
      case 'tea-experience':
        return <TeaExperiencePage />;
      case 'journal':
        return <JournalPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'account':
        return <AccountPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1E7] text-[#3E2A20]">
      <Navbar />
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchOverlay />
      <QuickViewModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
