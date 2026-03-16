'use client';

import MobileHeader from './mobile/MobileHeader';
import BottomNav from './mobile/BottomNav';
import FloatingCart from './cart/FloatingCart';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-container">
      <MobileHeader />
      <main className="page-content">
        {children}
      </main>
      <FloatingCart />
      <BottomNav />

      <style jsx>{`
        .page-content {
          padding: 1rem;
          min-height: calc(100vh - var(--bottom-nav-height) - 70px);
        }
      `}</style>
    </div>
  );
}
