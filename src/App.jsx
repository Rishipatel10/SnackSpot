import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import SearchModal from './components/common/SearchModal';
import AuthModal from './components/common/AuthModal';
import Toast from './components/common/Toast';

// Home components
import Hero from './components/home/Hero';
import CategorySection from './components/home/CategorySection';
import FeaturedSnacks from './components/home/FeaturedSnacks';
import PromoBanner from './components/home/PromoBanner';
import TestimonialsSection from './components/home/TestimonialsSection';

// Shop & Product components
import ShopPage from './components/shop/ShopPage';
import ProductDetailsPage from './components/product/ProductDetailsPage';

// Mobile components
import MobileNav from './components/mobile/MobileNav';
import MobileBottomBar from './components/mobile/MobileBottomBar';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'shop' | 'product'
  const [pageParams, setPageParams] = useState({});
  const [selectedProductId, setSelectedProductId] = useState('snack-01');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Robust sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const raw = window.location.hash.replace(/^#\/?/, '').trim();

      if (raw.startsWith('product/')) {
        const id = raw.replace('product/', '').trim();
        setSelectedProductId(id);
        setCurrentPage('product');
      } else if (raw.startsWith('category/')) {
        const cat = raw.replace('category/', '').trim();
        setPageParams({ categoryId: cat });
        setCurrentPage('shop');
      } else if (raw === 'shop') {
        setCurrentPage('shop');
        setPageParams({});
      } else if (raw === 'wishlist') {
        setCurrentPage('shop');
        setPageParams({ wishlistOnly: true });
      } else if (raw === 'bestsellers') {
        setCurrentPage('shop');
        setPageParams({ filter: 'bestseller' });
      } else if (!raw || raw === '/') {
        setCurrentPage('home');
        setPageParams({});
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check on load
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'home') {
      if (window.location.hash && window.location.hash !== '#/' && window.location.hash !== '#') {
        window.location.hash = '/';
      }
    } else if (page === 'shop') {
      if (params.categoryId) {
        window.location.hash = `/category/${params.categoryId}`;
      } else if (params.wishlistOnly) {
        window.location.hash = '/wishlist';
      } else if (params.filter === 'bestseller') {
        window.location.hash = '/bestsellers';
      } else {
        window.location.hash = '/shop';
      }
    } else if (page === 'category') {
      setCurrentPage('shop');
      setPageParams({ categoryId: params.categoryId });
      window.location.hash = `/category/${params.categoryId}`;
    }
  };

  const selectProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.location.hash = `/product/${productId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1B18] font-sans selection:bg-orange-200 selection:text-orange-950 pb-16 lg:pb-0">
      
      {/* Universal Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            <Hero
              onNavigate={navigateTo}
              onSelectProduct={selectProduct}
            />

            <CategorySection
              onSelectCategory={(catId) => navigateTo('shop', { categoryId: catId })}
            />

            <FeaturedSnacks
              onSelectProduct={selectProduct}
              onNavigateToShop={() => navigateTo('shop')}
            />

            <PromoBanner
              onNavigateToShop={() => navigateTo('shop')}
            />

            <TestimonialsSection />
          </div>
        )}

        {currentPage === 'shop' && (
          <div className="animate-fade-in">
            <ShopPage
              key={`shop-${pageParams.categoryId || 'all'}-${!!pageParams.wishlistOnly}-${pageParams.filter || 'all'}`}
              initialCategory={pageParams.categoryId || 'all'}
              initialWishlistOnly={!!pageParams.wishlistOnly}
              initialFilter={pageParams.filter}
              onSelectProduct={selectProduct}
              onNavigateHome={() => navigateTo('home')}
            />
          </div>
        )}

        {currentPage === 'product' && (
          <div className="animate-fade-in">
            <ProductDetailsPage
              key={`product-${selectedProductId}`}
              productId={selectedProductId}
              onNavigateShop={() => navigateTo('shop')}
              onSelectProduct={selectProduct}
              onNavigateHome={() => navigateTo('home')}
            />
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer
        onNavigateToShop={() => navigateTo('shop')}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={selectProduct}
        onSelectCategory={(catId) => navigateTo('shop', { categoryId: catId })}
      />

      <AuthModal />

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
      />

      <MobileBottomBar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </DataProvider>
  );
}
