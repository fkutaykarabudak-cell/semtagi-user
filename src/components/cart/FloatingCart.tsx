'use client';

import { useCartStore } from '@/store/cartStore';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingCart() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());
  const pathname = usePathname();

  if (items.length === 0 || pathname === '/cart') return null;

  return (
    <div className="floating-cart-container">
      <Link href="/cart" className="floating-cart-btn">
        <div className="cart-badge">
          <ShoppingBag size={20} />
          <span className="count">{items.length}</span>
        </div>
        <div className="cart-info">
          <span>Sepete Git</span>
          <ArrowRight size={18} />
        </div>
        <div className="cart-total">
          ₺{total.toFixed(2)}
        </div>
      </Link>

      <style jsx>{`
        .floating-cart-container {
          position: fixed;
          bottom: calc(var(--bottom-nav-height) + 1rem);
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 2rem);
          max-width: 460px;
          z-index: 95;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        .floating-cart-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--primary);
          color: white;
          padding: 0.875rem 1.25rem;
          border-radius: var(--radius-lg);
          text-decoration: none;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
        }

        .cart-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          padding: 6px 10px;
          border-radius: 8px;
        }

        .count {
          font-weight: 800;
          font-size: 0.875rem;
        }

        .cart-info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-weight: 700;
        }

        .cart-total {
          font-weight: 800;
          font-size: 1.125rem;
        }
      `}</style>
    </div>
  );
}
